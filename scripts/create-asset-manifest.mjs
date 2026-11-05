import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd());
const archive = path.resolve(process.env.KHMW_ARCHIVE_DIR ?? path.join(root, "..", "..", "KHMW-Website-Migration"));
const output = path.join(root, "docs", "ASSET_MIGRATION_MANIFEST.csv");
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".bmp", ".tif", ".tiff", ".pdf"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) files.push(absolute);
  }
  return files;
}

function hash(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function csv(value) {
  const text = value ?? "";
  return `"${String(text).replaceAll('"', '""')}"`;
}

function sourceCategory(relative) {
  const value = relative.toLowerCase();
  if (value.includes("adobe express")) return "enhanced-faculty-portrait";
  if (value.includes("degree-college")) return "original-faculty-portrait";
  if (value.includes("/results/")) return "student-results";
  if (value.includes("/exam-timetable/")) return "examinations";
  if (value.includes("/naac/")) return "accreditation-document";
  if (value.includes("b++naac")) return "accreditation-mark";
  if (value.includes("chairmen-") || value.includes("principal-")) return "leadership-portrait";
  if (value.includes("images/events/") && value.includes("cultur-club")) return "cultural-activity-image";
  if (value.includes("images/events/")) return "event-image";
  if (value.includes("infrastructure")) return "facility-image";
  if (value.endsWith("/images/k-h-m-w-logo.png")) return "college-logo";
  if (value.includes("images/slider/")) return "homepage-slider-image";
  if (value.includes("placement-partner")) return "placement-partner-mark";
  return "institutional-or-campus-image";
}

function disposition(record, destination) {
  if (destination) {
    if (destination.startsWith("public/images/events/")) return ["migrated-integrated", "Displayed in its source-labelled events or cultural-activity gallery."];
    if (destination.startsWith("public/images/facilities/")) return ["migrated-integrated", "Displayed in the facilities section with source-qualified alt text."];
    if (destination.includes("leadership/")) return ["migrated-integrated", "Shown in the homepage leadership introduction; specifically authorized by the project owner."];
    if (destination.endsWith("k-h-m-w-logo.png")) return ["migrated-integrated", "Used in the site header and footer."];
    if (destination.endsWith("khmw-college.jpg")) return ["migrated-integrated", "Shown as a supporting campus image on the homepage."];
    if (destination.startsWith("public/documents/")) return ["migrated-integrated", "Linked from the Student Corner examination and timetable pages; applicability is not asserted."];
  }
  if (record.relative.toLowerCase().includes("syma-bot.png")) return ["excluded-not-faculty", "The source register identifies this file as not a faculty portrait."];
  if (record.category === "student-results") return ["withheld-privacy-review", "Eight result PDFs are byte-identical; none is copied or linked pending privacy and publication review."];
  if (record.category === "enhanced-faculty-portrait" || record.category === "original-faculty-portrait") {
    return ["pending-confirmation", "Do not publish without a current roster, verified photo-to-person mapping, and image publication permission."];
  }
  if (record.category === "accreditation-document") {
    return ["pending-confirmation", "Do not copy or serve until document scope, privacy, currency, and redistribution permission are reviewed."];
  }
  if (record.category === "accreditation-mark") {
    return ["pending-permission", "Certificate evidence is documented; mark-use permission is unconfirmed. Header display is disabled."];
  }
  return ["not-integrated", "No page context and publication approval sufficient for integration were established."];
}

function canonicalRank(relative) {
  if (relative.startsWith("originals/images/")) return 0;
  if (relative.startsWith("originals/documents/")) return 1;
  return 2;
}

const archiveFiles = (await walk(archive)).sort();
const records = [];
for (const absolute of archiveFiles) {
  const bytes = await readFile(absolute);
  const relative = path.relative(archive, absolute).split(path.sep).join("/");
  records.push({
    relative,
    filename: path.basename(absolute),
    sha256: hash(bytes),
    size: bytes.length,
    category: sourceCategory(relative),
  });
}

const publicFiles = (await walk(path.join(root, "public"))).sort();
const publicByHash = new Map();
for (const absolute of publicFiles) {
  const bytes = await readFile(absolute);
  const digest = hash(bytes);
  if (!publicByHash.has(digest)) publicByHash.set(digest, `public/${path.relative(path.join(root, "public"), absolute).split(path.sep).join("/")}`);
}

const sameContent = new Map();
for (const record of records) {
  const group = sameContent.get(record.sha256) ?? [];
  group.push(record);
  sameContent.set(record.sha256, group);
}

const header = [
  "archive_relative_path",
  "destination_path",
  "original_filename",
  "category",
  "page_or_usage",
  "sha256",
  "bytes",
  "exact_duplicate_of",
  "migration_status",
  "notes",
];
const rows = records.map((record) => {
  const destination = publicByHash.get(record.sha256) ?? "";
  const [status, notes] = disposition(record, destination);
  const duplicates = sameContent.get(record.sha256) ?? [];
  const canonical = [...duplicates].sort((a, b) => canonicalRank(a.relative) - canonicalRank(b.relative) || a.relative.localeCompare(b.relative))[0];
  const duplicateOf = canonical.relative === record.relative ? "" : canonical.relative;
  const usage = destination ? disposition(record, destination)[1] : status === "not-integrated" ? "No current page integration." : notes;
  return [
    record.relative,
    destination,
    record.filename,
    record.category,
    usage,
    record.sha256,
    record.size,
    duplicateOf,
    status,
    notes,
  ].map(csv).join(",");
});

await writeFile(output, `${header.join(",")}\n${rows.join("\n")}\n`, "utf8");
const duplicateGroups = [...sameContent.values()].filter((group) => group.length > 1);
console.info(
  `Wrote ${records.length} manifest rows to ${path.relative(root, output)}. `
  + `${sameContent.size} unique hashes; ${duplicateGroups.length} duplicate groups; `
  + `${records.length - sameContent.size} redundant archive copies.`,
);
