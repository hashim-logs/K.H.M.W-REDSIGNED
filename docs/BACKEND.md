# Backend operations and API

## Status and boundaries

The backend is implemented as Next.js Route Handlers backed by PostgreSQL and a private persistent upload directory. It is an initial CMS foundation, not a fully operational production service: a live PostgreSQL integration, deployed storage, restore drill, scheduled cleanup, and operational monitoring have not been verified. No mail provider, OCR, embeddings, vector database, or external AI service is configured.

The college must approve public content, publication permission, contact retention, hosting, and operational ownership. The NAAC header image is disabled by default; faculty identities and photo mappings remain pending confirmation.

## PostgreSQL and first-time setup

The migration uses PostgreSQL features available in PostgreSQL 14+: `uuid`/`gen_random_uuid()`, `jsonb`, advisory locks, and standard transactions. PostgreSQL 14 or newer is required; PostgreSQL 16 is the expected Mint 22.3 package version on its Ubuntu 24.04 base. Runtime configuration is a local PostgreSQL server on port 5432, UTF-8 database, SCRAM/password-authenticated app role that owns the application database, and no superuser privileges for the web app. Verify the installed version with `sudo -u postgres psql -c 'SELECT version();'`.

PostgreSQL is not installed or running in the inspected environment, and no system packages were installed. After approval to install it, the Linux Mint commands are:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl enable --now postgresql
pg_lsclusters
sudo -u postgres psql -c 'SELECT version();'
sudo -u postgres createuser --pwprompt khmw_app
sudo -u postgres createdb --owner=khmw_app khmw_college
```

`createuser --pwprompt` asks for the database-role password without putting it in the command line. In `.env.local` (never commit it), set:

```text
DATABASE_URL=postgresql://khmw_app:<URL-encoded-role-password>@localhost:5432/khmw_college
SESSION_SECRET=<at-least-32-random-bytes>
UPLOAD_DIR=/absolute/path/to/persistent/uploads
CONTACT_DATA_RETENTION_DAYS=
```

Generate a session secret with `openssl rand -hex 32`; store it only in `.env.local` or the deployment secret manager. Keep contact retention blank until the college approves a retention period; contact submissions remain disabled then.

First-time application setup:

```bash
npm ci
npm run db:migrate
npm run db:create-admin
npm run dev
```

`db:create-admin` securely prompts for an email and password in a TTY, hashes the password with scrypt before storage, explicitly assigns the `admin` role, and uses a PostgreSQL advisory lock plus a transaction. It refuses to create any administrator if one already exists and rejects duplicate emails; it cannot reset or overwrite an account. There is no public registration/bootstrap endpoint. Sign in at `http://localhost:3000/admin/login`; the protected dashboard is `/admin`.

After bootstrap, rotate the initial credential using `npm run db:change-password`. It prompts without echoing the password, changes only the existing active account's hash, and revokes that account's sessions. To create an editor after the first admin, run `npm run db:create-editor`; it requires an active admin and will not overwrite an existing account. Schedule `npm run db:cleanup` using the host scheduler. It deletes expired enquiries, expired/revoked sessions, and stale rate-limit rows; the application does not configure a scheduler.

The session cookie is HTTP-only, SameSite Strict, Secure in production, and expires after eight hours. Passwords use Node.js scrypt; session tokens are random and only their SHA-256 hashes are stored. Login attempts are limited per normalized email over a 15-minute window. Administrators control verification, publication permission, publication state, replacement, deletion, and enquiry review. Editors can create and edit unverified drafts but cannot publish, approve, archive, replace, or delete content or uploaded assets.

## Data model

`db/migrations/0001_initial.sql` defines:

- `users` — unique email, scrypt password hash, `admin`/`editor` role, active flag.
- `sessions` — hashed session token, user foreign key, expiry and revocation timestamps.
- `login_attempts` — per-email HMAC key and temporary lockout state.
- `content_items` — typed JSON content (`notice`, `event`, `faculty`, `programme`, `institutional`), source reference, verification/permission/publication states, and creator/updater user references.
- `documents` — private PDF storage key, source/title/category/period metadata, SHA-256 duplicate key, current/historical/unverified state, publication permission/status, extraction result/error, replacement-document relationship, and extensible metadata JSON.
- `document_chunks` — document-linked text chunks and optional page range metadata reserved for future retrieval; chunking and embedding are not implemented.
- `media_assets` — private normalized images with hash, alt text, caption, permission and publication state.
- `content_document_links` and `content_media_links` — many-to-many content relationships with display order.
- `contact_submissions` — consent timestamp, enquiry fields, expiry and review fields.
- `contact_rate_limits` — database-backed submission throttling.

Migrations are ordered SQL files applied transactionally by `scripts/migrate.mjs`. The migration runner uses a PostgreSQL advisory lock and `schema_migrations` table. Do not edit an already-applied migration in a deployed database; add a subsequent migration instead.

## API routes

All writes require same-origin validation. Administrative routes also require a valid session; publication is gated by verification/currentness and permission fields.

| Route | Methods | Access and purpose |
|---|---|---|
| `/api/auth/login` | `POST` | Authenticate and create session |
| `/api/auth/session` | `GET` | Return current staff session |
| `/api/auth/logout` | `POST` | Revoke session |
| `/api/admin/content` | `GET`, `POST` | List or create content items |
| `/api/admin/content/[id]` | `PUT`, `DELETE` | Update or delete a content item |
| `/api/admin/uploads` | `GET`, `POST` | List and upload PDFs/images |
| `/api/admin/documents/[id]` | `PATCH`, `DELETE` | Edit document metadata/status or remove document (admin delete only) |
| `/api/admin/media/[id]` | `PATCH`, `DELETE` | Edit image metadata/status or remove image (admin delete only) |
| `/api/admin/enquiries` | `GET`, `PATCH` | Admin-only enquiry review |
| `/api/contact` | `POST` | Submit a consent-backed enquiry when retention is configured |
| `/api/public/contact-policy` | `GET` | Expose whether contact collection is enabled |
| `/api/public/content` | `GET` | Return approved, publishable content; supports a content type filter |
| `/api/public/documents/[id]` | `GET` | Stream a document only when published, approved, and current or historical |
| `/api/public/media/[id]` | `GET` | Stream an image only when published and approved |

Uploaded files are stored outside `public/`; a database record alone does not make an asset accessible. PDF uploads are size/signature/extension checked, hashed, deduplicated and text-extracted. Image uploads are decoded, orientation-corrected and normalized to WebP, removing source metadata. A PDF with no extractable text or a parser failure is recorded as a failed extraction; OCR and retry queues are not implemented. Replacing a document inserts the new record and archives the active prior record in one database transaction.

## Document-ingestion and future retrieval boundary

The current upload path records document title, source title/URL, category, period, upload/update timestamps, publication and archival state, SHA-256, extracted text, extraction status/error, and page count. This supports a later asynchronous parser, normalization/chunking service, embeddings, vector index, metadata filters, and citations without coupling those components to the public pages.

Current extraction runs synchronously during upload and stores the extracted text. There is no OCR, language-specific normalization, chunk generation, embedding, semantic search, answer generation, or citation API. `document_chunks` is only a schema boundary. A future retrieval service must filter by document status/category and return source-document references; it must not treat unverified or historical material as current.

## Backups, retention, and production readiness

- Back up PostgreSQL and `UPLOAD_DIR` together, retain encrypted off-host copies under college policy, and regularly test a restore. The database references upload files by key; a database-only backup is incomplete.
- Use durable, access-controlled storage with restrictive permissions for uploads. Do not expose the upload directory through a static web server.
- Keep secrets in the deployment secret manager. `SESSION_SECRET` currently keys rate-limit identifiers; changing it resets those buckets but does not invalidate sessions. Password changes revoke the affected user's sessions; an operator can revoke all sessions directly in the database during a planned incident response.
- Configure and monitor a scheduler for `npm run db:cleanup`; choose contact retention only after the college approves a privacy notice and retention period.
- Configure TLS, database backups, rate-limit monitoring, error monitoring, upload disk limits, and database connection limits with the chosen host.
- No SMTP/email delivery is configured, so the enquiry form confirms database receipt only and does not claim that a message was emailed.
- Before public deployment, perform live PostgreSQL migration/API/auth/upload/contact tests, backup/restore rehearsal, accessibility review, and dependency/security review in the deployment environment.
