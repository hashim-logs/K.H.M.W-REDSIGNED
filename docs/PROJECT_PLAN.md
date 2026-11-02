# Development plan

**Status:** Proposed sequence under approved project direction  
**Recorded:** 2 November 2026

The seven milestones below cover the first public redesign. Scaffolding and implementation are not authorized by this plan alone; the project owner must approve the scaffold after reviewing Phase 1 findings. Work must use public, college-approved content and preserve the read-only migration archive.

## Current status

**Milestone 1 — Application foundation: implemented 2 November 2026.** The minimal Next.js App Router scaffold, TypeScript, Tailwind/PostCSS integration, ESLint, npm lockfile, root layout, metadata, not-found page, palette variables, and agreed directory structure are present. No assets were copied and no CMS/database/AI functionality was added. Production build, lint, and typecheck pass. The existing Git repository has no commits, so all project files remain untracked until the project owner chooses to commit.

## Milestone 1 — Application foundation

Set up Next.js App Router, TypeScript, Tailwind CSS, npm scripts, linting, environment-variable conventions, and shared layout structure. Do not add CMS, database, pgvector, or AI services.

**Acceptance criteria**

- Reproducible npm install using a lockfile and documented supported Node version.
- TypeScript and lint commands are available and pass on the scaffold.
- No secrets are committed; any future `.env.example` contains names/placeholders only.
- App has a semantic root layout, metadata defaults, and a not-found route.
- No legacy website source or archive asset is copied without an approved mapping.

**Implementation record:** Node.js v24.22.2/npm 11.19.1; Next.js 16.4.3, React 19.3.0, Tailwind CSS 4.3.3 through PostCSS, TypeScript 5.9.3, and ESLint 9.39.5. Commands `npm ci`, `npm run build`, `npm run lint`, and `npm run typecheck` succeeded. The initial Turbopack-specific Tailwind loader failed during CSS processing with a worker port-binding error; the scaffold now uses the standard PostCSS Tailwind integration. npm install reported 16 moderate advisories and an unsupported ESLint 9.39.5 warning; these were not force-upgraded. No tests were added or run.

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

## Milestone 6 — IQAC, Accreditation, Contact, and initial backend routes

Build governance/accreditation pages and Contact. Add only approved Route Handler functionality for working enquiry/contact flows; keep credentials and delivery integrations server-side.

**Acceptance criteria**

- Accreditation statements and evidence links are confirmed, current, and clearly labeled.
- Contact details, map, and complaint destinations are approved and functional.
- Any form validates input server-side, handles errors safely, applies appropriate abuse controls, and displays accessible success/error feedback.
- Form recipient, consent language, retention, and privacy notice are approved before collection begins.
- No PostgreSQL, CMS, pgvector, or AI service is added in this milestone unless separately approved.

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

The faculty CMS, PostgreSQL persistence, pgvector document retrieval, AI assistant using NVIDIA hosted inference, and any Python ingestion pipeline are future work. Each requires a scoped design, data/security review, operational owner, and separate approval before implementation. The assistant must use approved public documents and cite its sources; it must not be treated as an authority for unverified college facts.
