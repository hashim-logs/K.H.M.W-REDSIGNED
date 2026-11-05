import { NextResponse } from "next/server";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const publicTypes = new Set(["notice", "event", "faculty", "programme", "institutional"]);

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");
  if (type && !publicTypes.has(type)) {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 400 });
  }
  try {
    const result = await getDatabasePool().query(
      `SELECT id, content_type AS type, slug, title, payload,
              source_reference AS "sourceReference", published_at AS "publishedAt"
       FROM content_items
       WHERE publication_status = 'published'
         AND verification_status IN ('verified', 'historical')
         AND publication_permission_status = 'approved'
         AND ($1::text IS NULL OR content_type = $1)
       ORDER BY published_at DESC NULLS LAST, title ASC
       LIMIT 500`,
      [type],
    );
    return NextResponse.json({ items: result.rows }, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Published content query failed:", error);
    return NextResponse.json({ error: "Published content is temporarily unavailable." }, { status: 503 });
  }
}
