import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminRole, verifySameOrigin } from "@/lib/auth";
import { extractPdfText, getUploadDirectory, UploadValidationError, validateAndStoreUpload } from "@/lib/document-ingestion";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const publicationStatuses = new Set(["draft", "published", "archived"]);
const informationStatuses = new Set(["current", "historical", "unverified"]);
const permissionStatuses = new Set(["pending", "approved", "withheld"]);
const categories = new Set(["academic", "examinations", "notices", "institutional", "student", "other"]);

class MissingReplacementError extends Error {}

function textValue(form: FormData, key: string, maximum: number): string | null {
  const value = form.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maximum ? trimmed : null;
}

function validSourceUrl(value: string | null): string | null | undefined {
  if (value === null) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

async function removeStoredFile(storageKey: string): Promise<void> {
  await unlink(path.join(getUploadDirectory(), storageKey));
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session || !isAdminRole(session.role)) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }
    const [documents, media] = await Promise.all([
      getDatabasePool().query(
        `SELECT id, title, original_filename AS "originalFilename", category,
                source_title AS "sourceTitle", source_url AS "sourceUrl",
                information_status AS "informationStatus",
                publication_permission_status AS "publicationPermissionStatus",
                publication_status AS "publicationStatus",
                extraction_status AS "extractionStatus", extraction_error AS "extractionError",
                document_period AS "documentPeriod", created_at AS "createdAt"
         FROM documents ORDER BY updated_at DESC LIMIT 500`,
      ),
      getDatabasePool().query(
        `SELECT id, original_filename AS "originalFilename", mime_type AS "mimeType",
                alt_text AS "altText", caption, publication_status AS "publicationStatus",
                publication_permission_status AS "publicationPermissionStatus",
                created_at AS "createdAt"
         FROM media_assets ORDER BY updated_at DESC LIMIT 500`,
      ),
    ]);
    return NextResponse.json({ documents: documents.rows, media: media.rows });
  } catch (error) {
    console.error("Admin asset list failed:", error);
    return NextResponse.json({ error: "Assets could not be loaded." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  let session;
  try {
    session = await getAdminSession();
  } catch (error) {
    console.error("Admin session lookup failed during upload:", error);
    return NextResponse.json({ error: "Authentication is temporarily unavailable." }, { status: 503 });
  }
  if (!session || !isAdminRole(session.role)) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "A valid multipart upload is required." }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  }

  const title = textValue(form, "title", 200);
  const category = textValue(form, "category", 40);
  const publicationStatus = textValue(form, "publicationStatus", 20) ?? "draft";
  const informationStatus = textValue(form, "informationStatus", 20) ?? "unverified";
  const permissionStatus = textValue(form, "publicationPermissionStatus", 20) ?? "pending";
  const sourceTitle = textValue(form, "sourceTitle", 200);
  const sourceUrlText = textValue(form, "sourceUrl", 2048);
  const sourceUrl = validSourceUrl(sourceUrlText);
  const period = textValue(form, "documentPeriod", 80);
  const altText = textValue(form, "altText", 500);
  const caption = textValue(form, "caption", 500);
  const replacesDocumentId = textValue(form, "replacesDocumentId", 36);

  if (
    !title || !category || !categories.has(category)
    || !publicationStatuses.has(publicationStatus)
    || !informationStatuses.has(informationStatus)
    || !permissionStatuses.has(permissionStatus)
    || (publicationStatus === "published" && (informationStatus === "unverified" || permissionStatus !== "approved"))
    || sourceUrl === undefined
    || (publicationStatus === "published" && file.type.startsWith("image/") && !altText)
    || (replacesDocumentId && file.type !== "application/pdf")
    || (replacesDocumentId && !/^[0-9a-f-]{36}$/i.test(replacesDocumentId))
  ) {
    return NextResponse.json({ error: "Upload metadata is invalid or incomplete." }, { status: 400 });
  }
  if (
    session.role === "editor"
    && (publicationStatus !== "draft" || informationStatus !== "unverified" || permissionStatus !== "pending" || Boolean(replacesDocumentId))
  ) {
    return NextResponse.json({ error: "Editors can upload drafts only; an administrator must review and publish them." }, { status: 403 });
  }

  let asset;
  try {
    asset = await validateAndStoreUpload(file);
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Uploaded file could not be stored:", error);
    return NextResponse.json({ error: "The uploaded file could not be stored." }, { status: 503 });
  }

  try {
    const pool = getDatabasePool();
    if (asset.mimeType === "application/pdf") {
      let extractedText: string | null = null;
      let pageCount: number | null = null;
      let extractionStatus: "completed" | "failed" = "completed";
      let extractionError: string | null = null;
      try {
        const extracted = await extractPdfText(asset.bytes);
        extractedText = extracted.text;
        pageCount = extracted.pageCount;
        if (!extractedText) {
          extractionStatus = "failed";
          extractionError = "No selectable text was found; OCR is not configured.";
        }
      } catch (error) {
        extractionStatus = "failed";
        extractionError = error instanceof Error ? error.message.slice(0, 500) : "PDF text extraction failed.";
      }

      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        if (replacesDocumentId) {
          const replacedDocument = await client.query(
            "SELECT id FROM documents WHERE id = $1 AND publication_status <> 'archived' FOR UPDATE",
            [replacesDocumentId],
          );
          if (!replacedDocument.rowCount) throw new MissingReplacementError();
        }
        const result = await client.query(
          `INSERT INTO documents
            (title, original_filename, storage_key, byte_size, sha256, category, source_title,
             source_url, document_period, information_status, publication_permission_status,
             publication_status, extracted_text,
             extraction_status, extraction_error, extracted_at, replaces_document_id,
             created_by, updated_by, metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
                   CASE WHEN $14 = 'completed' THEN now() END, $16, $17, $17, $18::jsonb)
           RETURNING id, title, original_filename AS "originalFilename",
                     information_status AS "informationStatus",
                     publication_permission_status AS "publicationPermissionStatus",
                     publication_status AS "publicationStatus",
                     extraction_status AS "extractionStatus", extraction_error AS "extractionError"`,
          [
            title, asset.originalFilename, asset.storageKey, asset.bytes.length, asset.sha256, category,
            sourceTitle, sourceUrl, period, informationStatus, permissionStatus, publicationStatus, extractedText,
            extractionStatus, extractionError, replacesDocumentId, session.id,
            JSON.stringify({ sha256: asset.sha256, sourceTitle, sourceUrl, period, pageCount }),
          ],
        );
        if (replacesDocumentId) {
          await client.query(
            `UPDATE documents SET publication_status = 'archived', archived_at = now(),
               updated_at = now(), updated_by = $2
             WHERE id = $1`,
            [replacesDocumentId, session.id],
          );
        }
        await client.query("COMMIT");
        return NextResponse.json({ document: result.rows[0] }, { status: 201 });
      } catch (error) {
        await client.query("ROLLBACK").catch((rollbackError: unknown) => {
          console.error("Document replacement transaction rollback failed:", rollbackError);
        });
        throw error;
      } finally {
        client.release();
      }
    }

    const result = await pool.query(
      `INSERT INTO media_assets
        (original_filename, storage_key, mime_type, byte_size, sha256, alt_text, caption,
         publication_permission_status, publication_status, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
       RETURNING id, original_filename AS "originalFilename", mime_type AS "mimeType",
                 alt_text AS "altText", caption, publication_status AS "publicationStatus",
                 publication_permission_status AS "publicationPermissionStatus"`,
      [
        asset.originalFilename, asset.storageKey, asset.mimeType, asset.bytes.length,
        asset.sha256, altText ?? "", caption, permissionStatus, publicationStatus, session.id,
      ],
    );
    return NextResponse.json({ media: result.rows[0] }, { status: 201 });
  } catch (error) {
    await removeStoredFile(asset.storageKey).catch((cleanupError) => {
      console.error("Unable to remove upload after database failure:", cleanupError);
    });
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "An identical file has already been uploaded." }, { status: 409 });
    }
    if (error instanceof MissingReplacementError) {
      return NextResponse.json({ error: "The active replacement document was not found." }, { status: 404 });
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23503") {
      return NextResponse.json({ error: "The referenced replacement document does not exist." }, { status: 400 });
    }
    console.error("Uploaded asset metadata could not be saved:", error);
    return NextResponse.json({ error: "Upload metadata could not be saved." }, { status: 503 });
  }
}
