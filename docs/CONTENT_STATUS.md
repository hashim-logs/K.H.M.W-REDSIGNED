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
| Program names and curriculum | Needs review | Audit lists BMS, B.Com, B.Sc. IT, BAFF, M.Com; homepage enquiry form instead offers B.B.A., B.Com., B.Sc., M.B.A. | Principal/academic owner to confirm current program names and public curriculum. |
| Institution name and scope | Needs review | Homepage and interior pages differ between K.H.M.W. College and K.H.M.W. Night College; junior/senior/night-college scope is unclear. | Do not select a single name/scope until confirmed. |
| Admissions, prospectus, application links | Needs review | 2026–27 notices are present; some homepage links are empty; Prospectus “Click here to Form” leads to `degree-college.html`, not a clearly identified prospectus. | Confirm current session, application path, dates, eligibility, and prospectus document. |
| Contacts and location | Needs review | Homepage and older pages show different phone numbers/email addresses. | Principal/office to provide canonical public details. |
| NAAC/IQAC/accreditation statements | Needs review | Public accreditation claim exists, but freshness and exact status wording need confirmation. Archive notes broken DVV PDFs and alternate recovered evidence that is not an exact replacement. | Publish only approved current claim; label and verify each evidence document. |
| Timetables and notices | Needs review | Audit found 21 timetable/notice PDFs returning HTTP 200; availability does not prove currentness. | Confirm session and validity; label by term and retain archive links only when useful. |
| Examination results | Needs review | Eight result PDFs are linked in the audit, but their individual status/content was not checked there. | Confirm active public availability and privacy policy before republishing or indexing. |
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

The Adobe Express directory was inspected at:

`~/KHMW-Website-Migration/originals/images/khmwcollege.org/images/Adobe Express/`

It contains these 17 PNGs:

- `raheel-khan.png`
- `adil-shah.png`
- `shrishyam-mishra.png`
- `syma-bot.png`
- `afiya-khan.png`
- `afrin-nisar-shaikh.png`
- `shireen-shaikh.png`
- `sohaib-gulam-patel.png`
- `akil-shaikh.png`
- `vinay-singh.png`
- `kirti-mishra.png`
- `abid-hussain-jagirdar.png`
- `fahim-shaikh.png`
- `mayur-kumawat.png`
- `abid-dhuka-shaikh.png`
- `mohammad-haroon.png`
- `hani-haroon.png`

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

These are separate sets: several names differ or have spelling variants (for example, `sohaib-gulam-patel.png` vs. `soheb-gulam-patel.jpg`, and `akil-shaikh.png` vs. `aqueel-shamshuddin-shaikh.jpg`). Matching is unverified and no files have been copied.
