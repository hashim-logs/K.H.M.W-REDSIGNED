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
      `SELECT storage_key, original_filename
       FROM documents
       WHERE id = $1 AND publication_status = 'published'
         AND information_status IN ('current', 'historical')
         AND publication_permission_status = 'approved'`,
      [id],
    );
    const document = result.rows[0];
    if (!document || !/^[0-9a-f-]{36}\.pdf$/i.test(document.storage_key)) {
      return new NextResponse("Not found", { status: 404 });
    }
    const file = await readFile(path.join(getUploadDirectory(), document.storage_key));
    const filename = String(document.original_filename).replace(/[\r\n"]/g, "_");
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(file.byteLength),
        "Content-Disposition": `inline; filename="${filename}"`,
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "sandbox",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Published document retrieval failed:", error);
    return new NextResponse("Document is temporarily unavailable", { status: 503 });
  }
}
