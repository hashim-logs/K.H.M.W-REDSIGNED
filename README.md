# K.H.M.W. College website

Public website and PostgreSQL-backed content-management foundation for K.H.M.W. College.

## Requirements

- Node.js 20.9 or newer (supported Node LTS recommended)
- npm
- PostgreSQL 14 or newer (Linux Mint 22.3's Ubuntu 24.04 base provides PostgreSQL 16)

## Local setup

1. Prepare PostgreSQL and a least-privilege app role/database; Mint setup commands are in [backend operations](docs/BACKEND.md).
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `SESSION_SECRET` (at least 32 random bytes), and a persistent writable `UPLOAD_DIR`.
3. Set `CONTACT_DATA_RETENTION_DAYS` only after the college approves a retention period. Contact form submission remains disabled while it is blank.
4. Install locked dependencies with `npm ci`.
5. Apply migrations with `npm run db:migrate`.
6. Bootstrap the sole initial administrator with `npm run db:create-admin`. It prompts for email and password without echoing the password, and refuses to run once any administrator exists.
7. Start the website with `npm run dev`, then sign in at `/admin/login`.

Use a unique password of at least 12 characters. After bootstrap, change it through `npm run db:change-password`; this revokes the account's existing sessions. Editors can be provisioned with `npm run db:create-editor`; accounts are never silently overwritten.

## Commands

- `npm run dev` — local development server
- `npm run build -- --webpack` — production build using Webpack
- `npm start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run db:migrate` — apply unapplied SQL migrations
- `npm run db:create-admin` / `npm run db:create-editor` — provision a staff account
- `npm run db:change-password` — interactively rotate an existing account's password and revoke its sessions
- `npm run db:cleanup` — remove expired enquiries, sessions, and rate-limit records
- `npm run db:verify` — run an interactive local backend verification using temporary test records; prompts for administrator credentials without echoing the password and cleans up created records/files
- `npm run assets:manifest` — regenerate the archive provenance manifest (archive is read-only)

See [backend operations and API](docs/BACKEND.md), [content status](docs/CONTENT_STATUS.md), [institutional source register](docs/INSTITUTIONAL_SOURCE_REGISTER.csv), and [asset manifest](docs/ASSET_MIGRATION_MANIFEST.csv).

## Operations and publication boundaries

The web process requires PostgreSQL and persistent upload storage. Back up the database and upload directory together, test restore procedures, and schedule `npm run db:cleanup` according to the approved enquiry-retention policy. No email delivery, external AI service, OCR, embeddings, vector database, or automated deployment is configured.

Content and assets remain subject to the source register, permission status, privacy review, and institutional confirmation. The recovered migration archive is read-only. Faculty mappings and accreditation-mark publication are pending confirmation; the NAAC header mark is disabled by default.
