# Approved project decisions

**Status:** Approved by project owner  
**Recorded:** 2 November 2026

This document records decisions approved for the K.H.M.W. College redesign. It is not an implementation record. Application scaffolding, dependency installation, data migration, and backend construction remain gated on explicit approval after Phase 1 planning.

## Technology

- Primary language: TypeScript.
- Web application: Next.js App Router.
- Styling: Tailwind CSS.
- Initial backend functionality: Next.js Route Handlers.
- Package manager: npm.
- Future persistent relational data: PostgreSQL.
- Future vector retrieval: pgvector.
- Future hosted AI inference: NVIDIA hosted inference. Credentials and requests must remain server-side.
- Python may be introduced later only when justified for document ingestion.
- No CMS, database, vector store, AI backend, or Python ingestion service is part of this foundation phase.

## Design

- Build a content-led institutional website informed by the quality of NMIMS's design, without copying its branding or layout.
- Palette: navy `#0F2342`, muted blue `#46638F`, gold `#C9A24A` for small accents, off-white `#F4F6F9`, white `#FFFFFF`, and near-black `#111418`.
- Use a typography-led hero, not a large campus-photo hero.
- Use actual K.H.M.W. College photographs in appropriate sections. Do not use generic stock campus photography.
- Support desktop, tablet, and mobile layouts.
- Accessibility, performance, and search discoverability are baseline requirements.

## Content and asset boundaries

- Publish only information already publicly available on the college's existing website, subject to review where the audit records conflicting or possibly outdated claims.
- Do not invent institutional facts, programs, contacts, achievements, or accreditation claims.
- Do not include private or unpublished college/student information.
- Preserve original assets and their provenance. The migration archive at `~/KHMW-Website-Migration/` is read-only: do not edit, rename, move, or delete its contents.
- Do not copy archive assets into the active project until their intended use and mapping are reviewed.
- Treat conflicting/outdated information as `Needs review` in `CONTENT_STATUS.md` until the college resolves it.

## Project boundaries

- Active project: `~/projects/khmw-redesign/`.
- Archive: `~/KHMW-Website-Migration/` (read-only).
- Phase 1 is documentation and inspection only. Do not scaffold the Next.js application until the project owner approves scaffolding.
- Do not add fake or nonfunctional buttons/forms. Any form shipped later must have a verified server-side submission path and accessible feedback.

## Open decisions

The following are not set by these approvals: hosting/deployment provider, domain and redirect plan, CMS vendor and workflow, production database hosting, enquiry recipient and retention policy, AI corpus/retrieval policy, AI model configuration, and final approved content/contact data. Decide these before the milestones that depend on them.

## Foundation implementation record

**Recorded:** 2 November 2026

- Minimal Next.js App Router/TypeScript application scaffolded in the active project; the temporary scaffold's `.git` directory and demo assets were not merged.
- Installed versions: Next.js 16.4.3, React/React DOM 19.3.0, Tailwind CSS 4.3.3, TypeScript 5.9.3, ESLint 9.39.5, and npm 11.19.1. Node.js was v24.22.2.
- Tailwind uses the standard PostCSS integration (`@tailwindcss/postcss` and `postcss`). The create-next-app Turbopack-specific CSS loader caused a worker port-binding failure during `next build`; switching to PostCSS made the production build pass.
- Design palette variables are defined in `src/app/globals.css`. The initial route is intentionally a small foundation screen, not the full homepage.
- Added `src/app/not-found.tsx`, requested source/content/types/lib/component/public/test directories, and root project documentation/configuration.
- No archive assets, API handlers, CMS, database, authentication, or AI services were added.
- `npm ci`, `npm run build`, `npm run lint`, and `npm run typecheck` succeeded. The repository still has no commits; the lockfile exists but has not been committed.
- npm reported 16 moderate dependency advisories during the initial install and warned that ESLint 9.39.5 is deprecated/unsupported. No automatic or forced upgrade was applied; dependency advisories remain for review before production release.
