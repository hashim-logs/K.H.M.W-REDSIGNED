import { NextResponse } from "next/server";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { getAdminSession, isAdminRole, verifySameOrigin } from "@/lib/auth";
import { getUploadDirectory } from "@/lib/document-ingestion";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };
const categories = new Set(["academic", "examinations", "notices", "institutional", "student", "other"]);

function isValidSourceUrl(value: unknown): value is string | null | undefined {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    const session = await getAdminSession();
    if (!session || !isAdminRole(session.role)) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const publicationStatus = body && typeof body === "object" ? body.publicationStatus : null;
    const title = body && typeof body === "object" ? body.title : undefined;
    const informationStatus = body && typeof body === "object" ? body.informationStatus : undefined;
    const permissionStatus = body && typeof body === "object" ? body.publicationPermissionStatus : undefined;
    const category = body && typeof body === "object" ? body.category : undefined;
    const sourceTitle = body && typeof body === "object" ? body.sourceTitle : undefined;
    const sourceUrl = body && typeof body === "object" ? body.sourceUrl : undefined;
    const documentPeriod = body && typeof body === "object" ? body.documentPeriod : undefined;
    if (
      !["draft", "published", "archived"].includes(publicationStatus)
      || (title !== undefined && (typeof title !== "string" || !title.trim() || title.length > 200))
      || (informationStatus !== undefined && !["current", "historical", "unverified"].includes(informationStatus))
      || (permissionStatus !== undefined && !["pending", "approved", "withheld"].includes(permissionStatus))
      || (category !== undefined && (typeof category !== "string" || !categories.has(category)))
      || (sourceTitle !== undefined && sourceTitle !== null && (typeof sourceTitle !== "string" || sourceTitle.length > 200))
      || !isValidSourceUrl(sourceUrl)
      || (documentPeriod !== undefined && documentPeriod !== null && (typeof documentPeriod !== "string" || documentPeriod.length > 80))
      || (publicationStatus === "published"
        && (informationStatus === "unverified" || permissionStatus === "pending" || permissionStatus === "withheld"))
    ) {
      return NextResponse.json({ error: "Document status, evidence, and permission fields are invalid." }, { status: 400 });
    }
    if (session.role === "editor") {
      const current = await getDatabasePool().query(
        `SELECT publication_status AS "publicationStatus",
                information_status AS "informationStatus",
                publication_permission_status AS "publicationPermissionStatus"
         FROM documents WHERE id = $1`,
        [id],
      );
      if (!current.rowCount) return NextResponse.json({ error: "Document not found." }, { status: 404 });
      const document = current.rows[0];
      if (
        document.publicationStatus !== "draft"
        || document.informationStatus !== "unverified"
        || document.publicationPermissionStatus !== "pending"
        || publicationStatus !== "draft"
        || (informationStatus ?? document.informationStatus) !== "unverified"
        || (permissionStatus ?? document.publicationPermissionStatus) !== "pending"
      ) {
        return NextResponse.json({ error: "Editors can manage draft documents only; an administrator must review and publish them." }, { status: 403 });
      }
    }
    const result = await getDatabasePool().query(
      `UPDATE documents SET publication_status = $2, title = COALESCE($3, title),
         information_status = COALESCE($4, information_status),
         publication_permission_status = COALESCE($5, publication_permission_status),
         category = COALESCE($7, category),
         source_title = CASE WHEN $8 THEN $9 ELSE source_title END,
         source_url = CASE WHEN $10 THEN $11 ELSE source_url END,
         document_period = CASE WHEN $12 THEN $13 ELSE document_period END,
         updated_at = now(), updated_by = $6,
         archived_at = CASE WHEN $2 = 'archived' THEN now() ELSE NULL END
       WHERE id = $1 RETURNING id, title, information_status AS "informationStatus",
         publication_permission_status AS "publicationPermissionStatus",
         publication_status AS "publicationStatus"`,
      [
        id, publicationStatus, typeof title === "string" ? title.trim() : null,
        informationStatus ?? null, permissionStatus ?? null, session.id,
        category ?? null, sourceTitle !== undefined, sourceTitle === "" ? null : sourceTitle ?? null,
        sourceUrl !== undefined, sourceUrl || null,
        documentPeriod !== undefined, documentPeriod === "" ? null : documentPeriod ?? null,
      ],
    );
    if (!result.rowCount) return NextResponse.json({ error: "Document not found." }, { status: 404 });
    return NextResponse.json({ document: result.rows[0] });
  } catch (error) {
    console.error("Admin document update failed:", error);
    return NextResponse.json({ error: "Document could not be updated." }, { status: 503 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    const session = await getAdminSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
    }
    const { id } = await context.params;
    const result = await getDatabasePool().query(
      "DELETE FROM documents WHERE id = $1 RETURNING storage_key AS key",
      [id],
    );
    if (!result.rowCount) return NextResponse.json({ error: "Document not found." }, { status: 404 });
    try {
      await unlink(path.join(getUploadDirectory(), result.rows[0].key));
    } catch (error) {
      if (!isMissingFile(error)) {
        console.error("Deleted document file cleanup failed:", error);
        return NextResponse.json({ error: "The document record was deleted but its file could not be removed." }, { status: 503 });
      }
    }
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Admin document delete failed:", error);
    return NextResponse.json({ error: "Document could not be deleted." }, { status: 503 });
  }

  function isMissingFile(error: unknown): boolean {
    return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
  }
}
