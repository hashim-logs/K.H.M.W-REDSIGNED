# Approved project decisions

**Status:** Approved by project owner  
**Recorded:** 2 November 2026

This document records the initial technology and content decisions approved on 2 November 2026. A later project request authorized implementation of the public website and an initial CMS/backend foundation; see `README.md`, `docs/BACKEND.md`, and `docs/PROJECT_PLAN.md` for current implementation status.

## Technology

- Primary language: TypeScript.
- Web application: Next.js App Router.
- Styling: Tailwind CSS.
- Initial backend functionality: Next.js Route Handlers.
- Package manager: npm.
- Persistent relational data for the current CMS foundation: PostgreSQL.
- Future vector retrieval: pgvector or another option selected after a scoped design review; none is configured.
- Future hosted AI inference: NVIDIA hosted inference. Credentials and requests must remain server-side.
- Python may be introduced later only when justified for document ingestion.
- The initial scaffold did not include a CMS, database, vector store, AI backend, or Python ingestion service. The current backend is a custom Next.js/PostgreSQL foundation; vector retrieval and AI remain deferred.

## Design

- Build a content-led institutional website informed by the quality of NMIMS's design, without copying its branding or layout.
- Palette: navy `#0F2342`, muted blue `#46638F`, gold `#C9A24A` for small accents, off-white `#F4F6F9`, white `#FFFFFF`, and near-black `#111418`.
- Approved homepage direction: an image-led institutional design with a large landscape campus/exterior photograph in the hero and a restrained navy/blue overlay that keeps the photograph visible.
- Feature the chairman in a separate integrated homepage section using the real chairman portrait; do not combine the chairman portrait with the hero image.
- Retain the existing navy, blue, gold and off-white palette, with gold as a restrained accent. Use a premium editorial institutional appearance; do not use a generic SaaS or dashboard layout.
- A suitable high-resolution landscape campus/exterior photograph is still needed. Use authentic K.H.M.W. College imagery; do not use generic stock campus photography.
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

- Active project: this repository.
- Archive: `~/KHMW-Website-Migration/` (read-only).
- Phase 1 planning and inspection are complete. The Next.js scaffold was separately approved, implemented, and established in the baseline commit `8722a75`.
- Do not add fake or nonfunctional buttons/forms. Any form shipped later must have a verified server-side submission path and accessible feedback.

## Open decisions

Still undecided: hosting/deployment provider, domain and redirect plan, production database hosting, enquiry recipient and approved retention/privacy terms, AI corpus/retrieval policy, AI model configuration, and final approved content/contact data. Decide these before the milestones that depend on them.

## Principal permission and public-source content

**Recorded:** 10 November 2026

- The project owner confirms that the principal granted permission to develop the college website and reuse the college's institutional data and materials. The permission date was not provided; no written evidence is asserted or recorded here. The date above is the documentation record date, not a stated permission date.
- This permission covers reuse of college institutional data and materials in the website project. Do not mark college materials as awaiting general permission solely for that reason. Record any item-specific restriction separately.
- Permission does not establish factual accuracy, currentness, faculty identity or photo mapping, current staff positions or designations, privacy suitability, or institutional scope. Keep those checks open where unresolved. Rights to third-party marks remain a separate question.
- Preserve conflicting source facts as separate records and report the conflict; do not select or reconcile one value without direction.
- Do not add facts that are absent from the source material.

## Foundation implementation record

**Recorded:** 2 November 2026

- Minimal Next.js App Router/TypeScript application scaffolded in the active project; the temporary scaffold's `.git` directory and demo assets were not merged.
- Installed versions: Next.js 16.4.3, React/React DOM 19.3.0, Tailwind CSS 4.3.3, TypeScript 5.9.3, ESLint 9.39.5, and npm 11.19.1. Node.js was v24.22.2.
- Tailwind uses the standard PostCSS integration (`@tailwindcss/postcss` and `postcss`). The create-next-app Turbopack-specific CSS loader caused a worker port-binding failure during `next build`; switching to PostCSS made the production build pass.
- Design palette variables are defined in `src/app/globals.css`. The initial route is intentionally a small foundation screen, not the full homepage.
- Added `src/app/not-found.tsx`, requested source/content/types/lib/component/public/test directories, and root project documentation/configuration.
- At that foundation checkpoint, no archive assets, API handlers, CMS, database, authentication, or AI services had been added; later implementation is documented separately.
- `npm ci`, `npm run build`, `npm run lint`, and `npm run typecheck` succeeded for the foundation scaffold. The project has a Phase 1 baseline commit (`8722a75`); subsequent work is tracked as ordinary working-tree changes until separately committed.
- npm reported 16 moderate affected-package entries tracing to one `minimatch` advisory. ESLint 9.39.5 is end-of-life; the installed `eslint-config-next@16.4.3` peer range accepts ESLint `>=9.0.0`. No dependency upgrade or automatic fix was applied; the advisory and ESLint lifecycle should be addressed before production use.
