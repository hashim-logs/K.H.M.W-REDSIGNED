# Content status register

**Status:** Initial register based on the existing audit and migration-archive reports  
**Recorded:** 2 November 2026

Use these labels before publishing content:

- **Verified** — supported by an identified public college source and checked for the intended publication context.
- **Needs review** — public source exists, but the audit or archive reports conflict, stale details, broken links, or missing confirmation.
- **Excluded** — private/unpublished, invented, unsupported, or outside the approved publication boundary.

The audit confirms that content is publicly present; this alone does not establish that it is current or approved as a current claim. No college content is marked `Verified` as a current institutional fact in this initial register without a college review.

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
| Contacts and location | Needs review | Homepage and older pages show different phone numbers/email addresses. | Principal/office to provide canonical public details. |
| Faculty directory and profiles | Needs review / unavailable for redesign | Audit records `/teaching-staff.html` and individual faculty profile routes, but current roster, names, departments, designations and qualifications were not independently verified. `/faculty` links to the source page without reproducing its records. | Obtain a college-confirmed current faculty roster and approved public profile details before adding profiles. Do not infer current roles from old site pages or image filenames. |
| NAAC/IQAC/accreditation statements | Needs review | Public accreditation claim exists, but freshness and exact status wording need confirmation. Archive notes broken DVV PDFs and alternate recovered evidence that is not an exact replacement. | Publish only approved current claim; label and verify each evidence document. |
| Timetables and examination circulars | Needs review | Asset inventory records 19 timetable PDFs grouped under Commerce and Management / Science and Technology, NEP / Non-NEP ATKT paths, plus `circular.pdf` and `notice-circular.pdf`. All 21 original URLs returned HTTP 200 during the audit; filenames are preserved in `src/content/student-corner.ts`. PDF content, dates, academic years, versions and present validity were not confirmed. | `/student-corner/timetables` lists the 19 timetable links under source-path categories; `/student-corner/notices` and `/student-corner/examinations` list the two circular PDFs. Treat HTTP 200 as link availability at audit time only. Verify contents and currency before presenting as current. |
| Other student notices and announcements | Needs review / not established | The audit did not identify a dated, individually verified set of general notices, student announcements or academic updates for this page. | Do not add sample or placeholder notices. Add only actual public notices with reviewed titles, dates, links and validity. |
| Examination results | Needs review | Eight result PDF links: `FYBAF.pdf`, `FYBCOM.pdf`, `FYBMS.pdf`, `FYBSCIT.pdf`, `SYBAF.pdf`, `SYBCOM.pdf`, `SYBMS.pdf`, `SYBSCIT.pdf`; URLs are recorded in `ASSET_INVENTORY.csv`. Individual PDF status, contents, academic session and current availability were not checked. | `/student-corner/results` preserves source filenames and URLs and groups by source labels. Confirm continued public availability and privacy/handling policy before republishing or indexing. |
| Examination details page | Needs review / unavailable | The audited `/examination-details.html` route returned HTTP 404. | Do not link as a working page or infer schedules; use only the verified timetable/circular links and request a current source from the college. |
| Faculty names, roles, qualifications, profiles | Needs review | Public staff/profile pages exist; current roster and credentials were not independently verified. Some filenames do not map cleanly between original and Adobe Express photo sets. | Have college owner verify records and approve photo-to-person mapping. |
| Campus, event, cultural, and placement imagery | Needs review | Archive contains original public asset collections. Provenance is retained by path; captions, people/context, rights, and current relevance need review. | Use only approved, relevant college images; never use generic stock campus imagery. |
| Capacity-building gallery images | Needs review / missing | Archive report identifies `/capacity-building-and-skill-enhancement.html`, with Soft Skill, Language and Communication Skills, Life Skills, and ICT/Computing Skills headings. Ten referenced images returned 404; literal backslashes occur in five original references. | Do not substitute unrelated images. College may supply approved replacements or authorize omission. |
| NAAC DVV PDFs `2-1.pdf`, `2-2.pdf`, `4-4-1-front-page.pdf` | Needs review / missing | Archive report records all three original URLs as 404. Other recovered criterion documents are not confirmed exact replacements. | Ask accreditation owner for current equivalents; preserve metric labels and provenance. |
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
