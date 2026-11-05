import { createHash, randomBytes, scrypt as scryptCallback } from "node:crypto";
import { access, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import pg from "pg";
import sharp from "sharp";

const { Pool } = pg;
const scrypt = promisify(scryptCallback);
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");
if (process.env.CONTACT_DATA_RETENTION_DAYS) {
  throw new Error("Contact retention must remain blank during this verification.");
}

const expectedDatabase = new URL(databaseUrl);
if (
  expectedDatabase.protocol !== "postgresql:"
  || expectedDatabase.hostname !== "localhost"
  || expectedDatabase.port !== "5432"
  || expectedDatabase.pathname !== "/khmw_college"
  || expectedDatabase.username !== "khmw_app"
) {
  throw new Error("Refusing to test against an unexpected database target.");
}

const rl = readline.createInterface({ input: stdin, output: stdout });
const email = (await rl.question("Administrator email: ")).trim().toLowerCase();
rl.close();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
  throw new Error("Enter a valid administrator email.");
}

function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) return reject(new Error("Run this command in an interactive terminal."));
    stdout.write(prompt);
    let value = "";
    stdin.setRawMode(true);
    stdin.resume();
    const onData = (chunk) => {
      const character = chunk.toString("utf8");
      if (character === "\u0003") {
        stdin.off("data", onData);
        stdin.setRawMode(false);
        stdout.write("\n");
        reject(new Error("Verification cancelled."));
      } else if (character === "\r" || character === "\n") {
        stdin.off("data", onData);
        stdin.setRawMode(false);
        stdout.write("\n");
        resolve(value);
      } else if (character === "\u007f") {
        value = value.slice(0, -1);
      } else {
        value += character;
      }
    };
    stdin.on("data", onData);
  });
}

const password = await readHidden("Administrator password: ");
if (!password || Buffer.byteLength(password) > 1024) throw new Error("Password input is invalid.");

const pool = new Pool({ connectionString: databaseUrl, max: 3, connectionTimeoutMillis: 5000 });
const results = [];
const created = { contentIds: [], documentIds: [], mediaIds: [], storageKeys: [], editorId: null, sessionHashes: [] };
let adminCookie = null;
let editorCookie = null;

function check(name, passed, evidence) {
  results.push({ name, status: passed ? "PASS" : "FAIL", evidence });
  console.log(`${passed ? "PASS" : "FAIL"} ${name}: ${evidence}`);
  if (!passed) throw new Error(`Verification failed: ${name}`);
}

function cookieFrom(response) {
  const value = response.headers.get("set-cookie");
  return value?.split(";", 1)[0] ?? null;
}

function cookieToken(cookie) {
  return cookie?.split("=", 2)[1] ?? "";
}

async function request(pathname, { method = "GET", body, cookie, form } = {}) {
  const headers = { Origin: new URL(baseUrl).origin };
  if (cookie) headers.Cookie = cookie;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const response = await fetch(new URL(pathname, baseUrl), {
    method,
    headers,
    body: form ?? (body === undefined ? undefined : JSON.stringify(body)),
    redirect: "manual",
  });
  const bodyBytes = Buffer.from(await response.arrayBuffer());
  const text = bodyBytes.toString("utf8");
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // HTML page responses are inspected as text by the caller.
  }
  return { response, text, json, bodyBytes };
}

async function login(loginEmail, loginPassword) {
  const { response, json } = await request("/api/auth/login", {
    method: "POST",
    body: { email: loginEmail, password: loginPassword },
  });
  return { status: response.status, cookie: cookieFrom(response), json };
}

async function adminRequest(pathname, options = {}) {
  return request(pathname, { ...options, cookie: adminCookie });
}

async function editorRequest(pathname, options = {}) {
  return request(pathname, { ...options, cookie: editorCookie });
}

async function uploadPdf(filename, bytes, extra = {}) {
  const form = new FormData();
  form.append("file", new File([bytes], filename, { type: "application/pdf" }));
  form.append("title", extra.title ?? "Temporary verification document");
  form.append("category", extra.category ?? "institutional");
  form.append("sourceTitle", "Automated local verification fixture");
  form.append("sourceUrl", "https://example.invalid/verification-fixture");
  form.append("documentPeriod", "test-only");
  form.append("publicationStatus", extra.publicationStatus ?? "draft");
  form.append("informationStatus", extra.informationStatus ?? "unverified");
  form.append("publicationPermissionStatus", extra.permissionStatus ?? "pending");
  return adminRequest("/api/admin/uploads", { method: "POST", form });
}

async function cleanup() {
  const activeAdminCookie = adminCookie;
  if (adminCookie) {
    await request("/api/auth/logout", { method: "POST", cookie: adminCookie }).catch(() => {});
  }
  if (editorCookie) {
    await request("/api/auth/logout", { method: "POST", cookie: editorCookie }).catch(() => {});
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    if (created.contentIds.length) {
      await client.query("DELETE FROM content_items WHERE id = ANY($1::uuid[])", [created.contentIds]);
    }
    if (created.documentIds.length) {
      const removed = await client.query(
        "DELETE FROM documents WHERE id = ANY($1::uuid[]) RETURNING storage_key",
        [created.documentIds],
      );
      created.storageKeys.push(...removed.rows.map((row) => row.storage_key));
    }
    if (created.mediaIds.length) {
      const removed = await client.query(
        "DELETE FROM media_assets WHERE id = ANY($1::uuid[]) RETURNING storage_key",
        [created.mediaIds],
      );
      created.storageKeys.push(...removed.rows.map((row) => row.storage_key));
    }
    if (created.sessionHashes.length) {
      await client.query("DELETE FROM sessions WHERE token_hash = ANY($1::text[])", [created.sessionHashes]);
    }
    if (created.editorId) await client.query("DELETE FROM users WHERE id = $1", [created.editorId]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  const uploadDirectory = path.resolve(process.env.UPLOAD_DIR ?? path.join(process.cwd(), "var", "uploads"));
  for (const key of new Set(created.storageKeys)) {
    if (!/^[0-9a-f-]{36}\.(pdf|webp)$/i.test(key)) throw new Error("Refusing to remove an unexpected test storage key.");
    await unlink(path.join(uploadDirectory, key)).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
    await access(path.join(uploadDirectory, key)).then(
      () => { throw new Error("Temporary upload still exists after cleanup."); },
      (error) => {
        if (error.code !== "ENOENT") throw error;
      },
    );
  }
  const remaining = await pool.query(
    `SELECT
       (SELECT count(*) FROM users WHERE id = $1) AS editor,
       (SELECT count(*) FROM content_items WHERE id = ANY($2::uuid[])) AS content,
       (SELECT count(*) FROM documents WHERE id = ANY($3::uuid[])) AS documents,
       (SELECT count(*) FROM media_assets WHERE id = ANY($4::uuid[])) AS media`,
    [created.editorId, created.contentIds, created.documentIds, created.mediaIds],
  );
  const counts = remaining.rows[0];
  if ([counts.editor, counts.content, counts.documents, counts.media].some((count) => Number(count) !== 0)) {
    throw new Error("Temporary database rows remain after cleanup.");
  }
  if (activeAdminCookie) {
    const finalSession = await request("/api/auth/session", { cookie: activeAdminCookie });
    if (finalSession.json?.authenticated !== false) throw new Error("Administrator verification session remains active after logout.");
  }
}

try {
  const database = await pool.query("SELECT current_database() AS database, current_user AS role");
  const migrations = await pool.query("SELECT version FROM schema_migrations ORDER BY version");
  const tableNames = await pool.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'");
  const requiredTables = [
    "users", "sessions", "login_attempts", "content_items", "documents", "document_chunks",
    "media_assets", "content_document_links", "content_media_links", "contact_submissions",
    "contact_rate_limits",
  ];
  check(
    "PostgreSQL target, migration, and schema",
    database.rows[0].database === "khmw_college"
      && database.rows[0].role === "khmw_app"
      && migrations.rows.some((row) => row.version === "0001_initial.sql")
      && requiredTables.every((table) => tableNames.rows.some((row) => row.tablename === table)),
    "connected to khmw_college as khmw_app; 0001 migration and all 11 application tables present",
  );
  const adminCount = await pool.query("SELECT count(*)::int AS count FROM users WHERE role = 'admin' AND is_active");
  check("Initial administrator exists", adminCount.rows[0].count >= 1, "one or more active admin accounts; identity and hash withheld");
  const passwordStorage = await pool.query(
    "SELECT password_hash FROM users WHERE email = $1 AND is_active = true",
    [email],
  );
  check(
    "Administrator password is hashed",
    passwordStorage.rows.length === 1
      && passwordStorage.rows[0].password_hash.startsWith("scrypt$")
      && passwordStorage.rows[0].password_hash !== password,
    "stored credential uses scrypt format; hash value withheld",
  );

  const invalid = await login(email, `${password}-incorrect`);
  check("Invalid credentials rejected", invalid.status === 401 && invalid.cookie === null, `HTTP ${invalid.status}; no session cookie`);

  const authenticated = await login(email, password);
  adminCookie = authenticated.cookie;
  check("Administrator login", authenticated.status === 200 && authenticated.json?.authenticated === true && Boolean(adminCookie), `HTTP ${authenticated.status}; authenticated session cookie issued`);
  if (!adminCookie) throw new Error("No admin session cookie; cannot continue.");
  const tokenHash = createHash("sha256").update(cookieToken(adminCookie)).digest("hex");
  created.sessionHashes.push(tokenHash);

  const session = await adminRequest("/api/auth/session");
  check("Session persists across requests", session.response.status === 200 && session.json?.authenticated === true, "session endpoint accepted the cookie");
  const dashboard = await adminRequest("/admin");
  check("Administrator dashboard access", dashboard.response.status === 200 && dashboard.text.includes("Content dashboard"), `HTTP ${dashboard.response.status}; dashboard rendered`);

  const expired = await pool.query(
    "UPDATE sessions SET expires_at = now() - interval '1 minute' WHERE token_hash = $1",
    [tokenHash],
  );
  const expiredSession = await adminRequest("/api/auth/session");
  const protectedExpired = await adminRequest("/admin");
  check(
    "Expired session is denied",
    expired.rowCount === 1 && expiredSession.json?.authenticated === false && protectedExpired.response.status === 307,
    `session authenticated=${expiredSession.json?.authenticated}; dashboard redirect HTTP ${protectedExpired.response.status}`,
  );

  const refreshed = await login(email, password);
  adminCookie = refreshed.cookie;
  check("Administrator can sign in after expiry", refreshed.status === 200 && Boolean(adminCookie), `HTTP ${refreshed.status}`);
  if (adminCookie) created.sessionHashes.push(createHash("sha256").update(cookieToken(adminCookie)).digest("hex"));

  const anonymousContent = await request("/api/admin/content");
  const anonymousUploads = await request("/api/admin/uploads");
  const anonymousEnquiries = await request("/api/admin/enquiries");
  check("Unauthenticated admin API access denied", [anonymousContent.response.status, anonymousUploads.response.status, anonymousEnquiries.response.status].every((status) => status === 401 || status === 403), `HTTP ${anonymousContent.response.status}/${anonymousUploads.response.status}/${anonymousEnquiries.response.status}`);

  const slug = `verification-notice-${randomBytes(6).toString("hex")}`;
  const noticeInput = {
    type: "notice",
    slug,
    title: "Temporary backend verification notice",
    payload: { message: "Test-only CMS record; not institutional content." },
    publicationStatus: "draft",
    sourceReference: null,
    verificationStatus: "unverified",
    publicationPermissionStatus: "pending",
  };
  const createdNotice = await adminRequest("/api/admin/content", { method: "POST", body: noticeInput });
  check("Create temporary draft notice", createdNotice.response.status === 201 && Boolean(createdNotice.json?.item?.id), `HTTP ${createdNotice.response.status}`);
  const noticeId = createdNotice.json?.item?.id;
  if (noticeId) created.contentIds.push(noticeId);

  const editedNotice = await adminRequest(`/api/admin/content/${noticeId}`, {
    method: "PUT",
    body: { ...noticeInput, title: "Edited temporary verification notice", payload: { message: "Edited test-only content." } },
  });
  check("Edit draft notice", editedNotice.response.status === 200 && editedNotice.json?.item?.title === "Edited temporary verification notice", `HTTP ${editedNotice.response.status}; edited title persisted`);

  const publicationInput = {
    ...noticeInput,
    title: "Edited temporary verification notice",
    payload: { message: "Edited test-only content." },
    publicationStatus: "published",
    sourceReference: "local verification fixture",
    verificationStatus: "verified",
    publicationPermissionStatus: "approved",
  };
  const publishedNotice = await adminRequest(`/api/admin/content/${noticeId}`, { method: "PUT", body: publicationInput });
  const publicNotices = await request("/api/public/content?type=notice");
  const appearsPublicly = publicNotices.json?.items?.some((item) => item.id === noticeId);
  check("Publish notice appears publicly", publishedNotice.response.status === 200 && appearsPublicly, `publish HTTP ${publishedNotice.response.status}; public API contains record=${Boolean(appearsPublicly)}`);

  const unpublishedNotice = await adminRequest(`/api/admin/content/${noticeId}`, { method: "PUT", body: noticeInput });
  const hiddenNotices = await request("/api/public/content?type=notice");
  check("Unpublish notice hides it", unpublishedNotice.response.status === 200 && !hiddenNotices.json?.items?.some((item) => item.id === noticeId), `unpublish HTTP ${unpublishedNotice.response.status}; public API excludes record`);

  const eventInput = { ...noticeInput, type: "event", slug: `${slug}-event`, title: "Temporary verification event" };
  const createdEvent = await adminRequest("/api/admin/content", { method: "POST", body: eventInput });
  const eventId = createdEvent.json?.item?.id;
  if (eventId) created.contentIds.push(eventId);
  const publishedEvent = await adminRequest(`/api/admin/content/${eventId}`, {
    method: "PUT",
    body: {
      ...eventInput,
      publicationStatus: "published",
      sourceReference: "local verification fixture",
      verificationStatus: "verified",
      publicationPermissionStatus: "approved",
    },
  });
  const publicEvents = await request("/api/public/content?type=event");
  check("Event publication and public listing", createdEvent.response.status === 201 && publishedEvent.response.status === 200 && publicEvents.json?.items?.some((item) => item.id === eventId), `create/publish HTTP ${createdEvent.response.status}/${publishedEvent.response.status}; public listing verified`);

  const pdfStream = "BT /F1 18 Tf 20 80 Td (K.H.M.W. temporary PDF extraction check) Tj ET";
  const pdfObjects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 144] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(pdfStream)} >>\nstream\n${pdfStream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let index = 0; index < pdfObjects.length; index += 1) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${pdfObjects[index]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${pdfObjects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${pdfObjects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const pdfBytes = Buffer.from(pdf);

  const pdfUpload = await uploadPdf("temporary-verification.pdf", pdfBytes, {
    title: "Temporary PDF extraction test",
  });
  const documentId = pdfUpload.json?.document?.id;
  if (documentId) created.documentIds.push(documentId);
  const documentRow = documentId
    ? await pool.query("SELECT storage_key, extracted_text, extraction_status, extraction_error, category, source_title, source_url, document_period FROM documents WHERE id = $1", [documentId])
    : { rows: [] };
  if (documentRow.rows[0]?.storage_key) created.storageKeys.push(documentRow.rows[0].storage_key);
  const privatePath = documentRow.rows[0]?.storage_key
    ? path.join(path.resolve(process.env.UPLOAD_DIR), documentRow.rows[0].storage_key)
    : "";
  const privateFile = privatePath ? await stat(privatePath).catch(() => null) : null;
  check(
    "PDF upload, storage, metadata, and text extraction",
    pdfUpload.response.status === 201
      && documentRow.rows[0]?.extraction_status === "completed"
      && documentRow.rows[0]?.extracted_text?.includes("temporary PDF extraction check")
      && documentRow.rows[0]?.source_title === "Automated local verification fixture"
      && documentRow.rows[0]?.source_url === "https://example.invalid/verification-fixture"
      && documentRow.rows[0]?.document_period === "test-only"
      && privateFile !== null
      && (privateFile.mode & 0o777) === 0o600,
    `HTTP ${pdfUpload.response.status}; extraction=${documentRow.rows[0]?.extraction_status}; error=${documentRow.rows[0]?.extraction_error ?? "none"}; private file mode=${privateFile ? (privateFile.mode & 0o777).toString(8) : "missing"}`,
  );

  const privateDocument = await request(`/api/public/documents/${documentId}`);
  check("Draft PDF is private", privateDocument.response.status === 404, `public endpoint HTTP ${privateDocument.response.status}`);
  const publishedDocument = await adminRequest(`/api/admin/documents/${documentId}`, {
    method: "PATCH",
    body: { publicationStatus: "published", informationStatus: "current", publicationPermissionStatus: "approved" },
  });
  const publicDocument = await request(`/api/public/documents/${documentId}`);
  const retrievedPdf = publicDocument.bodyBytes;
  check("Approved PDF retrieval and unpublish privacy", publishedDocument.response.status === 200
    && publicDocument.response.status === 200
    && retrievedPdf.equals(pdfBytes),
  `publish HTTP ${publishedDocument.response.status}; retrieve HTTP ${publicDocument.response.status}; exact fixture bytes retrieved`);
  const unpublishedDocument = await adminRequest(`/api/admin/documents/${documentId}`, {
    method: "PATCH",
    body: { publicationStatus: "draft", informationStatus: "unverified", publicationPermissionStatus: "pending" },
  });
  const hiddenPdf = await request(`/api/public/documents/${documentId}`);
  check("Unpublished PDF becomes private", unpublishedDocument.response.status === 200 && hiddenPdf.response.status === 404, `unpublish HTTP ${unpublishedDocument.response.status}; public endpoint HTTP ${hiddenPdf.response.status}`);

  const duplicateUpload = await uploadPdf("temporary-duplicate.pdf", pdfBytes);
  check("Duplicate PDF rejected", duplicateUpload.response.status === 409, `HTTP ${duplicateUpload.response.status}`);

  const badExtension = await uploadPdf("temporary-invalid.txt", pdfBytes);
  check("Invalid upload extension rejected", badExtension.response.status === 400, `HTTP ${badExtension.response.status}`);

  const oversizedForm = new FormData();
  oversizedForm.append("file", new File([new Uint8Array(25 * 1024 * 1024 + 1)], "too-large.pdf", { type: "application/pdf" }));
  oversizedForm.append("title", "Temporary oversized file test");
  oversizedForm.append("category", "institutional");
  const oversized = await adminRequest("/api/admin/uploads", { method: "POST", form: oversizedForm });
  check("Oversized upload rejected", [400, 413].includes(oversized.response.status), `HTTP ${oversized.response.status}`);

  const invalidPdf = Buffer.from("%PDF-1.4\nnot a valid PDF body\n%%EOF\n");
  const failedExtraction = await uploadPdf("temporary-broken.pdf", invalidPdf, {
    title: "Temporary extraction failure test",
  });
  const failedDocumentId = failedExtraction.json?.document?.id;
  if (failedDocumentId) created.documentIds.push(failedDocumentId);
  const failedRow = failedDocumentId
    ? await pool.query("SELECT storage_key, extraction_status, extraction_error FROM documents WHERE id = $1", [failedDocumentId])
    : { rows: [] };
  if (failedRow.rows[0]?.storage_key) created.storageKeys.push(failedRow.rows[0].storage_key);
  check("PDF extraction failure is recorded", failedExtraction.response.status === 201 && failedRow.rows[0]?.extraction_status === "failed" && Boolean(failedRow.rows[0]?.extraction_error), `HTTP ${failedExtraction.response.status}; extraction=${failedRow.rows[0]?.extraction_status}`);

  const png = await sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="navy"/></svg>')).png().toBuffer();
  const imageForm = new FormData();
  imageForm.append("file", new File([png], "temporary-verification.png", { type: "image/png" }));
  imageForm.append("title", "Temporary image verification");
  imageForm.append("category", "institutional");
  imageForm.append("altText", "Temporary test image");
  imageForm.append("caption", "Automated verification fixture");
  imageForm.append("publicationStatus", "draft");
  imageForm.append("informationStatus", "unverified");
  imageForm.append("publicationPermissionStatus", "pending");
  const imageUpload = await adminRequest("/api/admin/uploads", { method: "POST", form: imageForm });
  const mediaId = imageUpload.json?.media?.id;
  if (mediaId) created.mediaIds.push(mediaId);
  const mediaRow = mediaId
    ? await pool.query("SELECT storage_key, mime_type, alt_text, caption FROM media_assets WHERE id = $1", [mediaId])
    : { rows: [] };
  if (mediaRow.rows[0]?.storage_key) created.storageKeys.push(mediaRow.rows[0].storage_key);
  const mediaFile = mediaRow.rows[0]?.storage_key
    ? await stat(path.join(path.resolve(process.env.UPLOAD_DIR), mediaRow.rows[0].storage_key)).catch(() => null)
    : null;
  check(
    "Image upload, normalization, metadata, and private storage",
    imageUpload.response.status === 201
      && mediaRow.rows[0]?.mime_type === "image/webp"
      && mediaRow.rows[0]?.alt_text === "Temporary test image"
      && mediaRow.rows[0]?.caption === "Automated verification fixture"
      && mediaFile !== null
      && (mediaFile.mode & 0o777) === 0o600,
    `HTTP ${imageUpload.response.status}; MIME=${mediaRow.rows[0]?.mime_type}; private file mode=${mediaFile ? (mediaFile.mode & 0o777).toString(8) : "missing"}`,
  );
  const privateImage = await request(`/api/public/media/${mediaId}`);
  check("Draft image is private", privateImage.response.status === 404, `public endpoint HTTP ${privateImage.response.status}`);
  const publishedImage = await adminRequest(`/api/admin/media/${mediaId}`, {
    method: "PATCH",
    body: { publicationStatus: "published", publicationPermissionStatus: "approved", altText: "Temporary test image", caption: "Automated verification fixture" },
  });
  const publicImage = await request(`/api/public/media/${mediaId}`);
  const retrievedImage = publicImage.bodyBytes;
  check(
    "Approved image retrieval",
    publishedImage.response.status === 200 && publicImage.response.status === 200
      && retrievedImage.length > 0
      && publicImage.response.headers.get("content-type") === "image/webp",
    `publish/retrieve HTTP ${publishedImage.response.status}/${publicImage.response.status}; served normalized WebP`,
  );

  const retention = await pool.query("SELECT count(*)::int AS count FROM contact_submissions");
  const enquiry = await request("/api/contact", {
    method: "POST",
    body: { name: "Temporary Verification", email: "verify@example.invalid", subject: "Temporary test enquiry", message: "This enquiry is a test-only verification message.", consent: true },
  });
  check("Contact policy remains disabled without approved retention", enquiry.response.status === 503 && retention.rows[0].count === 0, `HTTP ${enquiry.response.status}; stored enquiries=${retention.rows[0].count}`);

  const editorEmail = `verify-editor-${randomBytes(8).toString("hex")}@example.invalid`;
  const editorPassword = randomBytes(32).toString("base64url");
  const salt = randomBytes(16);
  const derived = await scrypt(editorPassword, salt, 64, { N: 32_768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  const passwordHash = `scrypt$${salt.toString("base64url")}$${Buffer.from(derived).toString("base64url")}`;
  const editorInsert = await pool.query(
    "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'editor') RETURNING id",
    [editorEmail, passwordHash],
  );
  created.editorId = editorInsert.rows[0].id;
  const editorLogin = await login(editorEmail, editorPassword);
  editorCookie = editorLogin.cookie;
  check("Temporary editor authentication", editorLogin.status === 200 && editorLogin.json?.authenticated === true && Boolean(editorCookie), `HTTP ${editorLogin.status}`);
  if (editorCookie) created.sessionHashes.push(createHash("sha256").update(cookieToken(editorCookie)).digest("hex"));
  const editorEnquiries = await editorRequest("/api/admin/enquiries");
  const editorPublish = await editorRequest(`/api/admin/content/${noticeId}`, {
    method: "PUT",
    body: publicationInput,
  });
  const editorDeleteContent = await editorRequest(`/api/admin/content/${noticeId}`, { method: "DELETE", body: {} });
  const editorDeleteDocument = await editorRequest(`/api/admin/documents/${documentId}`, { method: "DELETE", body: {} });
  const editorDeleteMedia = await editorRequest(`/api/admin/media/${mediaId}`, { method: "DELETE", body: {} });
  check(
    "Editor blocked from admin-only actions",
    editorEnquiries.response.status === 403
      && editorPublish.response.status === 403
      && editorDeleteContent.response.status === 403
      && editorDeleteDocument.response.status === 403
      && editorDeleteMedia.response.status === 403,
    `enquiries/publish/delete content/document/media HTTP ${editorEnquiries.response.status}/${editorPublish.response.status}/${editorDeleteContent.response.status}/${editorDeleteDocument.response.status}/${editorDeleteMedia.response.status}`,
  );
  const editorDraft = await editorRequest("/api/admin/content", {
    method: "POST",
    body: { ...noticeInput, slug: `${slug}-editor`, title: "Temporary editor draft" },
  });
  if (editorDraft.json?.item?.id) created.contentIds.push(editorDraft.json.item.id);
  check("Editor may create draft only", editorDraft.response.status === 201 && editorDraft.json?.item?.publicationStatus === "draft", `HTTP ${editorDraft.response.status}; status=${editorDraft.json?.item?.publicationStatus}`);

  const deletedNotice = await adminRequest(`/api/admin/content/${noticeId}`, { method: "DELETE", body: {} });
  const deletedEvent = await adminRequest(`/api/admin/content/${eventId}`, { method: "DELETE", body: {} });
  const remaining = await pool.query(
    "SELECT count(*)::int AS count FROM content_items WHERE id = ANY($1::uuid[])",
    [[noticeId, eventId]],
  );
  check("Delete test notice and event", deletedNotice.response.status === 200 && deletedEvent.response.status === 200 && remaining.rows[0].count === 0, `delete HTTP ${deletedNotice.response.status}/${deletedEvent.response.status}; remaining test content=${remaining.rows[0].count}`);
  created.contentIds = created.contentIds.filter((id) => id !== noticeId && id !== eventId);

  const loggedOut = await adminRequest("/api/auth/logout", { method: "POST" });
  adminCookie = null;
  const afterLogout = await request("/api/auth/session", { cookie: refreshed.cookie });
  check("Logout invalidates session", loggedOut.response.status === 200 && afterLogout.json?.authenticated === false, `logout HTTP ${loggedOut.response.status}; old session authenticated=${afterLogout.json?.authenticated}`);

  check("Verification coverage summary", results.length >= 15, `${results.length} individual backend checks executed`);
} catch (error) {
  console.error(`FAIL verification run: ${error instanceof Error ? error.message : "unknown error"}`);
  process.exitCode = 1;
} finally {
  try {
    await cleanup();
    console.log("PASS Temporary verification records, editor account, sessions, and files removed.");
    await pool.end();
  } catch (error) {
    console.error(`FAIL verification cleanup: ${error instanceof Error ? error.message : "unknown error"}`);
    process.exitCode = 1;
    await pool.end().catch(() => {});
  }
  console.log(`Verification checks completed: ${results.length}; failures: ${results.filter((result) => result.status === "FAIL").length}.`);
}
