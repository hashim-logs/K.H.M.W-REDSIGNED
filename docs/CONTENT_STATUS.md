# Content status register

**Status:** Initial register based on the existing audit and migration-archive reports  
**Recorded:** 2 November 2026

Use the item-level [institutional source register](INSTITUTIONAL_SOURCE_REGISTER.csv) to track claims and sources through the verification workflow. Its allowed verification statuses are **unverified**, **pending-college-confirmation**, **verified**, **rejected**, **historical**, and **unavailable**. `verified` requires evidence suitable for the intended publication context and confirmation where needed; a public URL or successful HTTP response alone is not sufficient. `historical` means the claim/document is explicitly time-bound and must not be presented as current. `unavailable` means the source or information could not be established from the reviewed material; it is not permission to infer a replacement. Verification status is separate from `publication_permission_status`: an item may be verified but not approved for public website publication.

The existing summary table below is retained to preserve the original audit findings and notes. Its legacy labels map to the controlled statuses as follows: “Needs review” usually means `pending-college-confirmation` or `unverified` (see the item-level row); “Excluded” is a publication boundary, not a verification status, and should be recorded as publication permission/status rather than converted to `rejected`. Site-inventory statements marked “Verified” describe what the audit observed, not verified current institutional facts.

The audit confirms that some content was publicly present; this alone does not establish that it is current or approved as a current claim. No college content is marked `verified` as a current institutional fact in the source register at creation.

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
| Vision, mission and published goals | Needs review | `/vision-mission.html` publicly presents a vision, mission and “Goals.” The About preview summarizes these statements and links to the source. Current wording and the source page's institutional scope have not been confirmed by the college. | Treat the preview text as a source-attributed summary, not a verified current institutional commitment; confirm before final publication. |
| College background/history | Needs review / unavailable | The audited `/introduction.html` page returned 404. No founding date or history was available from that source. | Omitted as factual content from `/about`; do not infer history. |
| Campus and infrastructure details | Needs review | The audit lists `/infrastructure.html`, but facility details and currentness were not established in the project research. | About preview links to the existing page without repeating facility claims; verify details before migration. |
| Governance and SSR information | Needs review | The audit lists `/iqac-committee.html` and `/ssr.html`; current contents and any associated accreditation claims were not verified for reuse. | About preview links to the existing pages only. Do not restate committee membership or accreditation claims without confirmation. |
| Program names and curriculum | Needs review | Existing course pages/navigation list BMS, B.Com, B.Sc. IT, BAFF, M.Com; homepage enquiry form lists B.B.A., B.Com., B.Sc., M.B.A. Audit records course/credit tables and year/semester syllabus links, but also data-quality errors and individual resources were not exhaustively checked. Source pages: `/b-m-s.html`, `/b-com.html`, `/bsc-it.html`, `/baff.html`, `/m-com.html`; form is on `/`. | About/Academics preview keeps source-page names separate from enquiry-form options and does not claim a definitive current list, level grouping, curriculum, duration, eligibility or affiliation. College academic owner must confirm current offerings and approved details. |
| Academic calendar | Needs review / historical | Existing `/academic-calendar.html` displays “Academic Calendar 2018-19.” No direct calendar PDF URL was identified in the audit or asset inventory. | `/student-corner/academic-calendar` labels the source as 2018–19 historical and links to the source page only. Obtain and verify the current calendar before migration. |
| Institution name and scope | Needs review | Homepage and interior pages differ between K.H.M.W. College and K.H.M.W. Night College; junior/senior/night-college scope is unclear. | Do not select a single name/scope until confirmed. |
| Admissions, prospectus, application links | Needs review | Audit records homepage labels “First Year Admission,” “Senior College Admissions Open 2026–27,” “Admission Instructions 2026–27,” and “Certificate Course”; some banner links are empty. `/prospectus.html` links “Click here to Form” to `/degree-college.html`; no prospectus PDF was identified. The homepage enquiry script posts to `submit.php` and handles an expected `success` response, but delivery/storage and POST response were not verified; no submission was made. Sources: `/`, `/prospectus.html`, `/degree-college.html`. | `/admissions` identifies source links and observed behavior without claiming an open intake, functioning application, working delivery, current deadline, eligibility or required documents. Confirm current admissions cycle, prospectus, process, document checklist, deadlines and form backend with the college. |
| Admission eligibility, process and required documents | Needs review / not established | The audit did not establish verified eligibility criteria, a complete application process or a required-document checklist. | Do not publish requirements or make an application workflow until the college provides approved public information. |
| Contacts and location | Needs review | Homepage and older pages show different phone numbers/email addresses. The audit does not record an address conflict. | Confirm the address/map location and canonical public contact details with the college. |
| Faculty directory and profiles | Needs review / unavailable for public publication | Audit records `/teaching-staff.html` and individual faculty profile routes, but current roster, names, departments, designations and qualifications were not independently verified. `/faculty` links to the source page without reproducing its records. | Obtain a college-confirmed current faculty roster and approved public profile details before adding profiles. Do not infer current roles from old site pages or image filenames. |
| NAAC/IQAC/accreditation statements | Needs review | The recovered certificate names K.H.M.W. Night College of Commerce and states B++ (CGPA 2.84), dated 7 June 2024, valid through 6 June 2029. Whether that scope matches this website identity and permission to use the mark or redistribute the PDF remain unconfirmed. | The NAAC page attributes the details to the archived certificate and does not present them as a confirmed current status. The header mark remains disabled; confirm institutional scope and publication permission before enabling or distributing accreditation branding/documents. |
| Timetables and examination circulars | Needs review | `ASSET_INVENTORY.csv` enumerates 19 timetable PDFs plus `circular.pdf` and `notice-circular.pdf`; the inventory records HTTP 200 for all 21 URLs during the audit. Four science/technology timetable filenames are exact byte duplicates of other semester files. The archive does not establish current applicability. | Student Corner groups all 19 source labels and both circulars. Duplicate files share one local stored PDF; labels and the source limitation remain visible. Check dates and notice status before relying on them. |
| Other student notices and announcements | Needs review / not established | The audit did not identify a dated, individually verified set of general notices, student announcements or academic updates for this page. | Do not add sample or placeholder notices. Add only actual public notices with reviewed titles, dates, links and validity. |
| Examination results | Needs review | Eight result PDF files are present in the archive and are byte-identical by SHA-256; their contents, session and privacy implications were not reviewed. | No result PDF is copied or linked. Confirm the source documents and privacy/publication policy before any use. |
| Examination details page | Needs review / unavailable | The audited `/examination-details.html` route returned HTTP 404. | Do not link as a working page or infer schedules; use only the verified timetable/circular links and request a current source from the college. |
| Faculty names, roles, qualifications, profiles | Needs review | Public staff/profile pages exist; current roster and credentials were not independently verified. Some filenames do not map cleanly between original and Adobe Express photo sets. | Have college owner verify records and approve photo-to-person mapping. |
| Campus, event, cultural, and placement imagery | Needs review | Archive contains original public asset collections. Provenance is retained by path; captions, people/context, rights, and current relevance need review. | Use only approved, relevant college images; never use generic stock campus imagery. |
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

These are separate sets: several names differ or have spelling variants (for example, `abid-dhuka-shaikh.png` vs. `abid-dhuka.jpg`, `sohaib-gulam-patel.png` vs. `soheb-gulam-patel.jpg`, and `akil-shaikh.png` vs. `aqueel-shamshuddin-shaikh.jpg`). No image-to-person mapping has been verified and no files have been copied. `syma-bot.png` is not to be used as a faculty photograph.
