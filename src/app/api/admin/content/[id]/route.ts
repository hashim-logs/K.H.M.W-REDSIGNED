import { NextResponse } from "next/server";
import { getAdminSession, isAdminRole, verifySameOrigin } from "@/lib/auth";
import { getDatabasePool } from "@/lib/db";
import { parseContentInput } from "@/lib/content-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    const session = await getAdminSession();
    if (!session || !isAdminRole(session.role)) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }
    const { id } = await context.params;
    const input = parseContentInput(await request.json().catch(() => null));
    if (!input) return NextResponse.json({ error: "Content fields are invalid." }, { status: 400 });
    if (session.role === "editor") {
      const current = await getDatabasePool().query(
        `SELECT publication_status AS "publicationStatus",
                verification_status AS "verificationStatus",
                publication_permission_status AS "publicationPermissionStatus"
         FROM content_items WHERE id = $1`,
        [id],
      );
      if (!current.rowCount) return NextResponse.json({ error: "Content item not found." }, { status: 404 });
      const item = current.rows[0];
      if (
        item.publicationStatus !== "draft"
        || item.verificationStatus !== "unverified"
        || item.publicationPermissionStatus !== "pending"
        || input.publicationStatus !== "draft"
        || input.verificationStatus !== "unverified"
        || input.publicationPermissionStatus !== "pending"
      ) {
        return NextResponse.json({ error: "Editors can edit draft content only; an administrator must review and publish it." }, { status: 403 });
      }
    }
    const result = await getDatabasePool().query(
      `UPDATE content_items SET
         content_type = $2, slug = $3, title = $4, payload = $5::jsonb,
         source_reference = $6, verification_status = $7, publication_permission_status = $8,
         publication_status = $9,
         published_at = CASE
           WHEN $9 = 'published' AND published_at IS NULL THEN now()
           WHEN $9 <> 'published' THEN NULL
           ELSE published_at
         END,
         updated_at = now(), updated_by = $10
       WHERE id = $1
       RETURNING id, content_type AS type, slug, title, payload,
                 source_reference AS "sourceReference", verification_status AS "verificationStatus",
                 publication_permission_status AS "publicationPermissionStatus",
                 publication_status AS "publicationStatus", published_at AS "publishedAt"`,
      [
        id, input.type, input.slug, input.title, JSON.stringify(input.payload), input.sourceReference,
        input.verificationStatus, input.publicationPermissionStatus, input.publicationStatus, session.id,
      ],
    );
    if (!result.rowCount) return NextResponse.json({ error: "Content item not found." }, { status: 404 });
    return NextResponse.json({ item: result.rows[0] });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "An item with this type and slug already exists." }, { status: 409 });
    }
    console.error("Admin content update failed:", error);
    return NextResponse.json({ error: "Content could not be updated." }, { status: 503 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    if (session.role !== "admin") return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
    const { id } = await context.params;
    const result = await getDatabasePool().query("DELETE FROM content_items WHERE id = $1 RETURNING id", [id]);
    if (!result.rowCount) return NextResponse.json({ error: "Content item not found." }, { status: 404 });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Admin content delete failed:", error);
    return NextResponse.json({ error: "Content could not be deleted." }, { status: 503 });
  }
}
