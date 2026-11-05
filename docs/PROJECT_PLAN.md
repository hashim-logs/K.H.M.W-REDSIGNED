# Development plan

**Status:** Proposed sequence under approved project direction  
**Recorded:** 2 November 2026

The seven milestones below cover the public website implementation. Phase 1 findings were reviewed, and the application scaffold and baseline commit were separately approved before Phase 2 began. Work must use public, college-approved content and preserve the read-only migration archive.

## Current status (5 November 2026)

- **Public site:** Responsive navigation, homepage, shared layout/footer, About, Academics, Admissions, Faculty, Student Corner, examination/timetable pages, campus facilities, and event galleries are implemented. Current institutional information, faculty mappings, photo publication, and some resource status still require college confirmation.
- **Assets:** The generated manifest inventories 444 archive image/PDF files with source paths, hashes, destinations, usage and disposition. 98 images and 17 unique PDFs are currently in the public asset tree. Byte-identical files are deduplicated; result PDFs and unapproved faculty/NAAC assets remain withheld. The archive is read-only.
- **Leadership/accreditation:** The chairman portrait is integrated on the homepage. The archived certificate states B++ (CGPA 2.84), dated 7 June 2024, valid through 6 June 2029, for K.H.M.W. Night College of Commerce. Its scope match and publication authorization are unconfirmed; the NAAC mark is not copied and its header integration is disabled.
- **Backend:** A PostgreSQL migration, staff login/session handling, admin/editor roles, content/document/media/enquiry APIs, dashboard, private uploads, PDF text extraction and source/status metadata are implemented. No live database is available in this environment, so migrations, authentication, CRUD, uploads, contact storage and role checks have not been integration-tested.
- **RAG preparation:** Document source metadata, hashes, extraction status, extracted text, page-count metadata and a future chunk table are present. Chunking, OCR, embeddings, vector retrieval, generated answers and citations are not implemented.
- **Validation still required:** Rerun lint, typecheck, Webpack production build and `git diff --check`. Run live database and browser checks when PostgreSQL and a browser test environment are available. No commit, push or deployment is authorized.

The item-level institutional register and content-status table retain source boundaries and publication caveats. They are the authority for content decisions; this status summary does not independently verify institutional facts.

### Institutional content verification workflow

Use the source register before adding or revising public institutional claims:

- Keep one record per claim or independently reviewable source item; create an individual record for each student PDF with its exact source URL. Retain conflicting claims separately and document the conflict.
- Record `source_observed_date` only when supported and `claim_verified_date` only after the claim itself is confirmed. A link response is not proof of document contents, accuracy, currentness, or permission.
- Identify the responsible college authority only from evidence; otherwise leave the structured owner field blank and explain the gap in the notes.
- Move an item to `verified` only after appropriate source and college confirmation of the claim. Track publication permission independently; verification does not itself authorize publication. Use `historical`, `unavailable`, `rejected`, `unverified`, or `pending-college-confirmation` with explanatory notes where appropriate.
- Use `rejected` only when a claim is explicitly disproved or formally declined after review. Missing approval or a publication restriction is not a rejection; verification and publication permission are separate.
- Leave unknown owner, date, and permission fields blank; document what is unknown and why in the notes. Do not treat absence of permission evidence as formal rejection.
- Do not update public page claims or content modules solely because a register item exists. Publish only items whose currentness, intended scope, and permission are established.
- Keep detailed crawl findings and asset provenance in `WEBSITE_AUDIT.md` and `ASSET_INVENTORY.csv`; update the register with references instead of copying those inventories.

## Milestone 1 — Application foundation

Set up Next.js App Router, TypeScript, Tailwind CSS, npm scripts, linting, environment-variable conventions, and shared layout structure. This milestone is complete. Do not add CMS, database, pgvector, or AI services as part of the foundation.

**Acceptance criteria**

- Reproducible npm install using a lockfile and documented supported Node version.
- TypeScript and lint commands are available and pass on the scaffold.
- No secrets are committed; any future `.env.example` contains names/placeholders only.
- App has a semantic root layout, metadata defaults, and a not-found route.
- No legacy website source or archive asset is copied without an approved mapping.

**Implementation record:** Node.js v24.22.2/npm 11.19.1; Next.js 16.4.3, React 19.3.0, Tailwind CSS 4.3.3 through PostCSS, TypeScript 5.9.3, and ESLint 9.39.5. Commands `npm ci`, `npm run build`, `npm run lint`, and `npm run typecheck` succeeded for the foundation. The initial Turbopack-specific Tailwind loader failed during CSS processing with a worker port-binding error; the scaffold now uses the standard PostCSS Tailwind integration. npm audit reported 16 moderate affected-package entries tracing to one `minimatch` advisory. ESLint 9.39.5 is end-of-life, while the installed `eslint-config-next@16.4.3` peer range accepts ESLint `>=9.0.0`; neither the advisory nor ESLint was automatically upgraded. No tests were added or run.

## Milestone 2 — Design system and site shell

Build responsive header/navigation, footer, typography scale, spacing, color tokens, content-width rules, buttons, links, cards, and accessible focus states.

**Acceptance criteria**

- Approved palette is encoded as reusable design tokens; gold remains a restrained accent.
- Navigation works by keyboard and touch at desktop, tablet, and mobile widths.
- Layouts use semantic landmarks, visible focus, sufficient contrast, and reduced-motion-aware interaction.
- No copied NMIMS branding/layout and no generic stock campus images.

## Milestone 3 — Home and About

Create a typography-led, content-led homepage and About pages using only reviewed public facts. Use actual college photographs only where they add context.

**Acceptance criteria**

- Hero leads with approved institutional content, not a full-bleed campus photograph.
- College identity, history, vision/mission, leadership messages, and location claims are included only after resolving status in `CONTENT_STATUS.md`.
- Images retain source/provenance records and have meaningful alternative text or are marked decorative.
- Page titles, descriptions, heading order, and canonical URLs are present.

## Milestone 4 — Academics and Admissions

Create program and academic-calendar pages, and a clear admissions journey. Resolve discrepancies between the listed programs and the existing enquiry form before publication.

**Acceptance criteria**

- Each published program name and curriculum is confirmed against a public college source and marked verified.
- Academic calendar and syllabus downloads are labeled by program, semester, and year where those details are available.
- Admission instructions, prospectus, and application/form destinations are current and working.
- No course, eligibility, fee, deadline, or admission claim is inferred or invented.
- Enquiry CTA is shown only when its destination is functional.

## Milestone 5 — Student Corner

Organize student-facing timetables, results, notices, events, clubs/NSS, and relevant student resources.

**Acceptance criteria**

- Resource listings identify document type, program/faculty, semester, and session when confirmed by the source.
- Every published download is verified, has a useful label, and opens/downloads successfully.
- Outdated notices are archived or omitted after review rather than presented as current.
- Results are published only after the college confirms continued public availability and appropriate handling of personal information.
- Events use actual college imagery with reviewed captions and accessible alternatives.

## Milestone 6 — Public information, contact, and backend foundation

Implement the approved public information pages and the initial PostgreSQL-backed CMS and enquiry workflow. The current code includes authentication/session routes, admin/editor roles, content/document/media CRUD paths, private file handling, publication gates, and retention-based enquiry storage. It remains unverified against a live database and is not production-ready until operational checks are completed.

**Acceptance criteria**

- Accreditation claims and marks are published only after scope, evidence, and permission are confirmed.
- Contact collection remains disabled until retention and privacy terms are approved.
- Admin/editor access checks, sessions, CRUD, uploads, validation, and error handling pass live integration tests.
- Contact submissions have approved consent, retention, privacy notice, and scheduled cleanup.
- Backups include PostgreSQL and persistent upload storage and are restore-tested.

## Milestone 7 — Quality review and release readiness

Review the complete site with the college, check accessibility/responsiveness/performance/SEO, verify all routes and downloads, and prepare deployment and redirects.

**Acceptance criteria**

- No placeholder, empty, or dead navigation/action links remain in the release scope.
- Keyboard, screen-reader structure, contrast, responsive layouts, and form states are reviewed.
- Content and asset provenance are reviewed; conflicting/outdated entries are resolved or excluded.
- Public URLs and legacy-route redirect decisions are documented.
- Production environment, secrets, backups, monitoring, privacy, and deployment ownership are approved.
- College content owner signs off on publication scope.

## Deferred future work

RAG functionality is intentionally not implemented: asynchronous ingestion, OCR, normalization, chunking, embeddings, vector search, answer generation, and citation APIs require a separate design and data/security review. The schema preserves document provenance and a chunk boundary for that work. External AI services, vector databases, and paid APIs are not configured. Faculty profiles remain pending until the current roster, identities, roles, and portrait mappings are confirmed and approved. Production hosting, database operations, backups, monitoring, privacy, and content-owner sign-off also remain outstanding.
