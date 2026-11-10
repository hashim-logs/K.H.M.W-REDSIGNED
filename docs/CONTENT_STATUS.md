# Content status register

**Status:** Updated from the existing audit, migration-archive reports, and project authorization
**Recorded:** 10 November 2026

The project owner confirms that the principal granted permission to develop the college website and reuse the college's institutional data and materials. The permission date was not provided, and no written evidence is asserted. The date in `DECISIONS.md` is the documentation record date only. General permission to reuse college materials is recorded as approved; it does not certify factual accuracy, currentness, faculty identity or photo mapping, current staff positions or designations, privacy suitability, or institutional scope. Rights to third-party marks remain a separate question. Keep conflicting facts listed separately; do not select a value without confirmation.

Use the item-level [institutional source register](INSTITUTIONAL_SOURCE_REGISTER.csv) to track claims and sources through the verification workflow. Its allowed verification statuses are **unverified**, **pending-college-confirmation**, **verified**, **rejected**, **historical**, and **unavailable**. `verified` requires evidence suitable for the intended publication context and confirmation where needed; a public URL or successful HTTP response alone is not sufficient. `historical` means the claim/document is explicitly time-bound and must not be presented as current. `unavailable` means the source or information could not be established from the reviewed material; it is not permission to infer a replacement. Verification status is separate from `publication_permission_status`: an item may be verified but not approved for public website publication.

The existing summary table below is retained to preserve the original audit findings and notes. Its legacy labels map to the controlled statuses as follows: “Needs review” usually means `pending-college-confirmation` or `unverified` (see the item-level row); “Excluded” is a publication boundary, not a verification status, and should be recorded as publication permission/status rather than converted to `rejected`. Site-inventory statements marked “Verified” describe what the audit observed, not verified current institutional facts.

The audit confirms that some content was publicly present; public presence and project permission do not establish that it is current or correct. `historical` source claims describe what the college site displayed at the recorded observation date, not current institutional facts.

## Verification workflow

1. Maintain one register row per claim or independently reviewable source item. Track each student PDF separately with its exact source URL and stable `information_id`; preserve separate rows when pages conflict rather than merging or choosing a preferred value.
2. Record the known claim, source URL or repository file, source authority, `source_observed_date`, `claim_verified_date`, controlled verification status, responsible college authority, publication permission/status, and limitations. Leave unknown structured values blank; explain the gap in the notes field.
3. Distinguish source authority, observation freshness, claim verification and publication approval. `source_observed_date` records when the source or link was observed; `claim_verified_date` is populated only when the claim itself was confirmed. Do not copy an audit date into the claim-verification field. HTTP status, filenames and page labels do not establish content accuracy, currency, identity, or publication permission.
4. Request confirmation from the appropriate college authority when one is known. Do not invent an owner; leave the structured owner field blank and explain the gap in notes. Record the confirmation evidence and date before changing a claim to `verified`. Track publication permission independently; verification does not imply permission to publish.
5. Use `rejected` only when a claim has been explicitly disproved or formally declined after review. An unverified claim, missing approval, or publication restriction is not `rejected`; record its evidence status separately from publication permission. Keep time-bound information `historical`; use `unavailable` when evidence could not be established. Record the reason and do not silently replace unavailable material.
6. Only publish a claim as current when its source, intended scope, currentness and publication permission are established. Keep unresolved or conflicting claims out of current public copy. Update this summary and the relevant content module only after its source-register row supports publication.

The CSV is a tracking register, not a second copy of the full audit or asset inventory. Existing detailed route, asset, link-status and archive-provenance evidence remains in `WEBSITE_AUDIT.md` and `ASSET_INVENTORY.csv`; the register points to those sources where useful.

| Content area | Status | Evidence / issue | Publication handling |
| --- | --- | --- | --- |
| Site sections and route inventory | Verified as a record of what the audit found | `WEBSITE_AUDIT.md` lists public routes and records that the crawl was bounded. Some listed routes returned 404. | Use as migration inventory only; check every route before linking. |
| Vision, mission and published goals | Historical source material; project publication approved | `/vision-mission.html` publicly presents a vision, mission and “Goals.” The About preview summarizes those source statements. Their current wording and institutional scope are not established. | May be presented as source-attributed historical material under the project permission; do not describe it as current policy. |
| College background/history | Needs review / unavailable | The audited `/introduction.html` page returned 404. No founding date or history was available from that source. | Omitted as factual content from `/about`; do not infer history. |
| Campus and infrastructure details | Needs review | The audit lists `/infrastructure.html`, but facility details and currentness were not established in the project research. | About preview links to the existing page without repeating facility claims; verify details before migration. |
| Governance and SSR information | Needs review | The audit lists `/iqac-committee.html` and `/ssr.html`; current contents and any associated accreditation claims were not verified for reuse. | About preview links to the existing pages only. Do not restate committee membership or accreditation claims without confirmation. |
| Program names and curriculum | Historical source material; project publication approved | The five original course pages and their semester tables were transcribed to `src/content/academic-curricula.ts`. BMS, B.Com, B.Sc. IT and BAFF pages contain tables with source spelling/formatting errors; M.Com has no curriculum table. The pages do not establish eligibility, duration, or current offering. The homepage enquiry form lists B.B.A., B.Com., B.Sc., M.B.A., which conflicts with the course-page list. | May be presented as source-attributed historical material under the project permission. Keep the programme-list conflict visible; do not imply current availability or curriculum. |
| Academic calendar | Needs review / historical | Existing `/academic-calendar.html` displays “Academic Calendar 2018-19.” No direct calendar PDF URL was identified in the audit or asset inventory. | `/student-corner/academic-calendar` labels the source as 2018–19 historical and links to the source page only. Obtain and verify the current calendar before migration. |
| Institution name and scope | Conflicting historical source labels; project publication approved | The homepage uses “K.H.M.W. College”; interior material uses “K.H.M.W. Night College.” Junior/senior/night-college scope remains unresolved. | Preserve both source labels and the conflict. Project permission allows historical source attribution; it does not select the current official name or institutional scope. |
| Admissions, prospectus, application links | Historical source labels; project publication approved | The audit records homepage labels “First Year Admission,” “Senior College Admissions Open 2026–27,” “Admission Instructions 2026–27,” and “Certificate Course”; some banner links are empty. `/prospectus.html` links “Click here to Form” to `/degree-college.html`; no prospectus PDF was identified. The homepage enquiry script posts to `submit.php`, but delivery/storage and POST response were not verified; no submission was made. Sources: `/`, `/prospectus.html`, `/degree-college.html`. | Historical labels and observed links may be described under the project permission. Do not claim an intake is open, a form works, or a deadline, eligibility, or process is current. |
| Admission eligibility, process and required documents | Needs review / not established | The audit did not establish verified eligibility criteria, a complete application process or a required-document checklist. | Do not publish requirements or make an application workflow until the college provides approved public information. |
| Contacts and location | Conflicting historical source values; project publication approved | The homepage and older pages show different phone numbers and email addresses. The audit does not record an address conflict. | Preserve all distinct source values and show the conflict; project permission does not identify a canonical current contact. |
| Faculty directory and profiles | Historical source material; current roster unavailable | The original `/teaching-staff.html` associates names with original image paths. Twelve enhanced portraits were visually matched for historical display. Current roster, roles and qualifications are not established. | College permission covers reuse of institutional materials. Keep uncertain portrait mappings, privacy suitability and institutional scope under review. Four enhanced portraits remain unmatched. `Syma Bot` is a teacher's name; preserve the surname and do not treat it as a technical term. Do not assert current employment or designations. |
| NAAC/IQAC/accreditation statements | Historical certificate statement; scope and mark rights unresolved | The certificate names K.H.M.W. Night College of Commerce and states B++ (CGPA 2.84), dated 7 June 2024, valid through 6 June 2029. Its scope for this website remains unconfirmed. | Project permission allows historical attribution of the college's published certificate statement. It does not independently establish current accreditation or third-party mark rights; keep the graphic qualified and do not use it as unqualified branding. |
| Timetables and examination circulars | Needs review | `ASSET_INVENTORY.csv` enumerates 19 timetable PDFs plus `circular.pdf` and `notice-circular.pdf`; the inventory records HTTP 200 for all 21 URLs during the audit. Four science/technology timetable filenames are exact byte duplicates of other semester files. The archive does not establish current applicability. | Student Corner groups all 19 source labels and both circulars. Duplicate files share one local stored PDF; labels and the source limitation remain visible. Check dates and notice status before relying on them. |
| Other student notices and announcements | Needs review / not established | The audit did not identify a dated, individually verified set of general notices, student announcements or academic updates for this page. | Do not add sample or placeholder notices. Add only actual public notices with reviewed titles, dates, links and validity. |
| Examination results | Needs review | Eight result PDF files are present in the archive and are byte-identical by SHA-256; their contents, session and privacy implications were not reviewed. | No result PDF is copied or linked. Confirm the source documents and privacy/publication policy before any use. |
| Examination details page | Needs review / unavailable | The audited `/examination-details.html` route returned HTTP 404. | Do not link as a working page or infer schedules; use only the verified timetable/circular links and request a current source from the college. |
| Faculty names, roles, qualifications, profiles | Historical source listing; current roster unavailable | Public staff/profile pages list faculty names and images, but do not establish the current roster or credentials. Some enhanced-image filenames do not map cleanly to the original source portraits. | College permission covers reuse of institutional materials. Keep uncertain portrait mappings, privacy suitability, and institutional scope unresolved; do not assert current employment, positions, designations, or qualifications. |
| Campus, event, cultural, and placement imagery | Needs review | Archive contains original public asset collections and college permission covers reuse of college materials. Provenance is retained by path; captions, depicted people/context, privacy suitability, current relevance, and third-party partner-mark rights need separate review. | Use relevant college images after reviewing people, context, and current relevance; assess partner-mark rights separately. Never use generic stock campus imagery. |
| Capacity-building gallery images | Needs review / missing | Archive report identifies `/capacity-building-and-skill-enhancement.html`, with Soft Skill, Language and Communication Skills, Life Skills, and ICT/Computing Skills headings. Ten referenced images returned 404; literal backslashes occur in five original references. | Do not substitute unrelated images. College may supply approved replacements or authorize omission. |
| NAAC DVV PDFs `2-1.pdf`, `2-2.pdf`, `4-4-1-front-page.pdf` | Needs review / missing | The existing content-status note says an archive report recorded these URLs as 404, but the report itself and its observation date are not present in the reviewed repository files. `ASSET_INVENTORY.csv` lists the three URLs as not individually checked and does not substantiate those 404s. Separately, `WEBSITE_AUDIT.md` §5 records a 404 for `/naac/dvv/criterion-2/2-4-1/2-4-1.pdf`. | Keep the three unlocated archive findings distinct from the specifically documented audit 404. The three claims remain source-note-only, with their underlying 404 evidence unavailable; request current authoritative equivalents and do not treat unverified substitutes as replacements. |
| Anti-harassment/grievance destinations and committee details | Needs review | Audit records public committee pages and a Google Forms complaint link; current ownership/destination is unconfirmed. | Verify committee membership and complaint route before publication. |
| Private/unpublished college or student information | Excluded | Project boundary explicitly excludes private/unpublished information. | Do not ingest, store, publish, or use as an AI source. |
| Invented facts, unsupported claims, unapproved accreditation/achievement claims | Excluded | Project authorization permits only information already publicly available; conflicts must be flagged. | Do not create or publish. |
| Generic stock campus photography | Excluded | Design decision requires actual college photography and prohibits generic stock campus photos. | Do not source or use. |
| AI answers based on unapproved or private documents | Excluded | Future assistant is limited to verified public documents. | Do not index or answer from private/unreviewed material. |

## Asset provenance note

The migration archive is read-only. Do not rename, move, edit, or delete archive contents. Record archive-relative source paths when an asset is later approved for copying into the active project. Do not infer that similarly named files show the same person or represent an approved enhanced version.

The Adobe Express directory was inspected read-only at:

`~/KHMW-Website-Migration/originals/images/khmwcollege.org/images/Adobe Express/`

It contains these 17 PNGs, recorded from the directory listing:

- `abid-dhuka-shaikh.png`
- `adil-shah.png`
- `abid-hussain-jagirdar.png`
- `afiya-khan.png`
- `afrin-nisar-shaikh.png`
- `akil-shaikh.png`
- `fahim-shaikh.png`
- `hani-haroon.png`
- `kirti-mishra.png`
- `mohammad-haroon.png`
- `mayur-kumawat.png`
- `raheel-khan.png`
- `shireen-shaikh.png`
- `shrishyam-mishra.png`
- `sohaib-gulam-patel.png`
- `syma-bot.png`
- `vinay-singh.png`

Original faculty-photo files are separately present under `originals/images/khmwcollege.org/images/degree-college/`:

- `abid-dhuka.jpg`
- `abid-hussain-jagirdar.jpg`
- `adil-shah.jpg`
- `afiya-khan.jpg`
- `afrin-nisar-shaikh.jpg`
- `ajay-kamble.jpg`
- `aqueel-shamshuddin-shaikh.jpg`
- `hani-haroon.jpeg`
- `kirti-mishra.jpg`
- `mayur-kumawat.jpg`
- `mohammad-haroon.jpg`
- `naseem-ahmad-ansari.jpg`
- `raheel-khan.jpg`
- `shahida-bawa.jpeg`
- `shaikh-fahim.jpeg`
- `shireen-shaikh.jpg`
- `shrishyam-mishra.jpg`
- `soheb-gulam-patel.jpg`
- `syma-bot.jpg`
- `vinay-kumar-singh.jpg`

The original Teaching Faculty page was retrieved and inspected read-only. Its alt text and image paths associate names with original photographs. Visual comparison supported 12 enhanced/original pairings for historical portrait records; see `src/content/faculty.ts` and the asset manifest for exact files. These pairings do not establish current employment, positions, designations or qualifications. Four enhanced images remain unmatched pending identity confirmation (`akil-shaikh.png`, `hani-haroon.png`, `kirti-mishra.png`, and `sohaib-gulam-patel.png`). `syma-bot.jpg` and `syma-bot.png` are faculty-portrait assets for teacher Syma Bot; preserve the surname spelling. Keep current roster, portrait mapping, privacy and institutional-scope checks open before publication.

The archive NAAC graphic `b++naac.png` is copied into the homepage's accreditation section only as an archived source image. Its institution/scope alignment and third-party rights to reuse the mark remain unconfirmed; the site does not assert current accreditation status, and header branding remains disabled by default.
