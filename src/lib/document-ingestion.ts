import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import "pdfjs-dist/legacy/build/pdf.worker.mjs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

const MAX_PDF_BYTES = 25 * 1024 * 1024;
const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_PDF_PAGES = 500;

export class UploadValidationError extends Error {}

export type UploadedAsset = {
  bytes: Buffer;
  mimeType: "application/pdf" | "image/jpeg" | "image/png" | "image/webp";
  sha256: string;
  storageKey: string;
  originalFilename: string;
};

export function getUploadDirectory(): string {
  return path.resolve(process.env.UPLOAD_DIR ?? path.join(process.cwd(), "var", "uploads"));
}

export async function validateAndStoreUpload(file: File): Promise<UploadedAsset> {
  const originalFilename = path.basename(file.name).replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 180);
  if (!originalFilename || originalFilename === "." || originalFilename === "..") {
    throw new UploadValidationError("A valid filename is required.");
  }
  if (file.size < 1) throw new UploadValidationError("The uploaded file is empty.");
  if (file.size > MAX_PDF_BYTES) throw new UploadValidationError("Files must be 25 MB or smaller.");

  let bytes = Buffer.from(await file.arrayBuffer());
  const detectedMimeType = detectMimeType(bytes);
  const actualExtension = path.extname(originalFilename).toLowerCase();
  const allowedExtensions = detectedMimeType === "application/pdf" ? [".pdf"]
    : detectedMimeType === "image/jpeg" ? [".jpg", ".jpeg"]
      : detectedMimeType === "image/png" ? [".png"]
        : detectedMimeType === "image/webp" ? [".webp"] : [];
  if (!detectedMimeType || file.type !== detectedMimeType || !allowedExtensions.includes(actualExtension)) {
    throw new UploadValidationError("Only valid PDF, JPEG, PNG, and WebP files with matching extensions are accepted.");
  }
  let mimeType: UploadedAsset["mimeType"] = detectedMimeType;
  if (mimeType.startsWith("image/") && bytes.length > MAX_IMAGE_BYTES) {
    throw new UploadValidationError("Images must be 12 MB or smaller.");
  }
  if (mimeType.startsWith("image/")) {
    try {
      bytes = await sharp(bytes, { limitInputPixels: 80_000_000, failOn: "warning" })
        .rotate()
        .webp({ quality: 82 })
        .toBuffer();
      mimeType = "image/webp";
    } catch (error) {
      throw new UploadValidationError(error instanceof Error ? "The image could not be decoded." : "The image could not be decoded.");
    }
  }
  const extension = mimeType === "application/pdf" ? ".pdf" : mimeType === "image/webp" ? ".webp" : null;
  if (!extension) throw new Error("Unsupported normalized image format.");
  const storageKey = `${randomUUID()}${extension}`;
  const directory = getUploadDirectory();
  await mkdir(directory, { recursive: true, mode: 0o750 });
  await writeFile(path.join(directory, storageKey), bytes, { flag: "wx", mode: 0o600 });

  return {
    bytes,
    mimeType,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    storageKey,
    originalFilename,
  };
}

function detectMimeType(bytes: Buffer): UploadedAsset["mimeType"] | null {
  if (bytes.subarray(0, 5).toString("ascii") === "%PDF-") return "application/pdf";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "image/png";
  if (
    bytes.subarray(0, 4).toString("ascii") === "RIFF"
    && bytes.subarray(8, 12).toString("ascii") === "WEBP"
  ) return "image/webp";
  return null;
}

export async function extractPdfText(bytes: Buffer): Promise<{ text: string; pageCount: number }> {
  const loadingTask = getDocument({
    data: new Uint8Array(bytes),
    useSystemFonts: true,
    stopAtErrors: true,
  });
  const document = await loadingTask.promise;
  try {
    if (document.numPages > MAX_PDF_PAGES) {
      throw new Error(`PDFs with more than ${MAX_PDF_PAGES} pages are not supported.`);
    }
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.flatMap((item) => "str" in item ? [item.str] : []).join(" "));
    }
    return {
      text: pages.join("\n\n").normalize("NFKC").replace(/[ \t]+/g, " ").trim(),
      pageCount: document.numPages,
    };
  } finally {
    await loadingTask.destroy();
  }
}
