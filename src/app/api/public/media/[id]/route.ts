import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getUploadDirectory } from "@/lib/document-ingestion";
import { getDatabasePool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new NextResponse("Not found", { status: 404 });
  try {
    const result = await getDatabasePool().query(
      `SELECT storage_key, mime_type
       FROM media_assets
       WHERE id = $1 AND publication_status = 'published'
         AND publication_permission_status = 'approved'`,
      [id],
    );
    const media = result.rows[0];
    if (!media || !/^[0-9a-f-]{36}\.(jpg|png|webp)$/i.test(media.storage_key)) {
      return new NextResponse("Not found", { status: 404 });
    }
    const file = await readFile(path.join(getUploadDirectory(), media.storage_key));
    return new NextResponse(file, {
      headers: {
        "Content-Type": media.mime_type,
        "Content-Length": String(file.byteLength),
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Published media retrieval failed:", error);
    return new NextResponse("Media is temporarily unavailable", { status: 503 });
  }
}
