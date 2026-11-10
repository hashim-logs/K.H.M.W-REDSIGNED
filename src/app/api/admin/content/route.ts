import { NextResponse } from "next/server";
import { getAdminSession, isAdminRole, verifySameOrigin } from "@/lib/auth";
import { getPublicationEligibilityErrors, parseContentInput } from "@/lib/content-validation";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contentTypes = new Set(["notice", "event", "faculty", "programme", "institutional"]);

async function editorSession() {
  const session = await getAdminSession();
  return session && isAdminRole(session.role) ? session : null;
}

export async function GET(request: Request) {
  try {
    if (!(await editorSession())) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }
    const type = new URL(request.url).searchParams.get("type");
    if (type && !contentTypes.has(type)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 400 });
    }
    const result = await getDatabasePool().query(
      `SELECT id, content_type AS type, slug, title, payload, source_reference AS "sourceReference",
              verification_status AS "verificationStatus",
              publication_permission_status AS "publicationPermissionStatus",
              publication_status AS "publicationStatus", created_at AS "createdAt",
              updated_at AS "updatedAt"
       FROM content_items
       WHERE ($1::text IS NULL OR content_type = $1)
       ORDER BY updated_at DESC
       LIMIT 500`,
      [type],
    );
    return NextResponse.json({ items: result.rows });
  } catch (error) {
    console.error("Admin content read failed:", error);
    return NextResponse.json({ error: "Content could not be loaded." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!verifySameOrigin(request)) {
    return NextResponse.json({ error: "Request origin was not accepted." }, { status: 403 });
  }
  try {
    const session = await editorSession();
    if (!session) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    const body = await request.json().catch(() => null);
    const input = parseContentInput(body);
    if (!input) return NextResponse.json({ error: "Content fields are invalid." }, { status: 400 });
    const publicationErrors = getPublicationEligibilityErrors(input);
    if (Object.keys(publicationErrors).length) {
      return NextResponse.json({
        error: "Publication requirements are not met.",
        fieldErrors: publicationErrors,
      }, { status: 400 });
    }
    if (
      session.role === "editor"
      && (input.publicationStatus !== "draft"
        || input.verificationStatus !== "unverified"
        || input.publicationPermissionStatus !== "pending")
    ) {
      return NextResponse.json({ error: "Editors can create draft content only; an administrator must review and publish it." }, { status: 403 });
    }
    const result = await getDatabasePool().query(
      `INSERT INTO content_items
        (content_type, slug, title, payload, source_reference, verification_status,
         publication_permission_status, publication_status, published_at, created_by, updated_by)
       VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7, $8,
               CASE WHEN $8 = 'published' THEN now() END, $9, $9)
       RETURNING id, content_type AS type, slug, title, payload,
                 source_reference AS "sourceReference", verification_status AS "verificationStatus",
                 publication_permission_status AS "publicationPermissionStatus",
                 publication_status AS "publicationStatus", published_at AS "publishedAt"`,
      [
        input.type, input.slug, input.title, JSON.stringify(input.payload), input.sourceReference,
        input.verificationStatus, input.publicationPermissionStatus, input.publicationStatus, session.id,
      ],
    );
    return NextResponse.json({ item: result.rows[0] }, { status: 201 });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json({ error: "An item with this type and slug already exists." }, { status: 409 });
    }
    console.error("Admin content create failed:", error);
    return NextResponse.json({ error: "Content could not be saved." }, { status: 503 });
  }
}

function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error
    && (error as { code?: string }).code === "23505";
}
