import { unlink } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getAdminSession, isAdminRole, verifySameOrigin } from "@/lib/auth";
import { getUploadDirectory } from "@/lib/document-ingestion";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

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
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Media metadata is invalid." }, { status: 400 });
    }
    const { publicationStatus, altText, caption, publicationPermissionStatus } = body;
    if (
      !["draft", "published", "archived"].includes(publicationStatus)
      || !["pending", "approved", "withheld"].includes(publicationPermissionStatus)
      || typeof altText !== "string" || altText.length > 500
      || (caption !== null && caption !== undefined && (typeof caption !== "string" || caption.length > 500))
      || (publicationStatus === "published" && (!altText.trim() || publicationPermissionStatus !== "approved"))
    ) {
      return NextResponse.json({ error: "Media metadata is invalid." }, { status: 400 });
    }
    if (session.role === "editor") {
      const current = await getDatabasePool().query(
        `SELECT publication_status AS "publicationStatus",
                publication_permission_status AS "publicationPermissionStatus"
         FROM media_assets WHERE id = $1`,
        [id],
      );
      if (!current.rowCount) return NextResponse.json({ error: "Media item not found." }, { status: 404 });
      const asset = current.rows[0];
      if (
        asset.publicationStatus !== "draft"
        || asset.publicationPermissionStatus !== "pending"
        || publicationStatus !== "draft"
        || publicationPermissionStatus !== "pending"
      ) {
        return NextResponse.json({ error: "Editors can manage draft images only; an administrator must review and publish them." }, { status: 403 });
      }
    }
    const result = await getDatabasePool().query(
      `UPDATE media_assets SET publication_status = $2, alt_text = $3, caption = $4,
         publication_permission_status = $5, updated_at = now(), updated_by = $6
       WHERE id = $1
       RETURNING id, publication_status AS "publicationStatus", alt_text AS "altText", caption,
         publication_permission_status AS "publicationPermissionStatus"`,
      [id, publicationStatus, altText.trim(), caption?.trim() || null, publicationPermissionStatus, session.id],
    );
    if (!result.rowCount) return NextResponse.json({ error: "Media item not found." }, { status: 404 });
    return NextResponse.json({ media: result.rows[0] });
  } catch (error) {
    console.error("Admin media update failed:", error);
    return NextResponse.json({ error: "Media could not be updated." }, { status: 503 });
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
      "DELETE FROM media_assets WHERE id = $1 RETURNING storage_key AS key",
      [id],
    );
    if (!result.rowCount) return NextResponse.json({ error: "Media item not found." }, { status: 404 });
    try {
      await unlink(path.join(getUploadDirectory(), result.rows[0].key));
    } catch (error) {
      if (!isMissingFile(error)) {
        console.error("Deleted media file cleanup failed:", error);
        return NextResponse.json({ error: "The media record was deleted but its file could not be removed." }, { status: 503 });
      }
    }
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Admin media delete failed:", error);
    return NextResponse.json({ error: "Media could not be deleted." }, { status: 503 });
  }
}

function isMissingFile(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
