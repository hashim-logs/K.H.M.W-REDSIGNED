# K.H.M.W. College website audit

**Audit date:** 1 November 2026  
**Scope:** Read-only review of publicly linked pages and resources on `https://khmwcollege.org/`. No forms were submitted and no site files were changed.

## 1. Existing architecture

- The homepage and sampled pages are conventional multi-page HTML documents (`.html`) with relative links and assets. No client-side application framework or server-rendered route system was evident in the pages inspected.
- Frontend dependencies identified in homepage source: Bootstrap CSS/JS, jQuery 3.1.1, Owl Carousel, CounterUp and Waypoints, WebSlideMenu, Fancybox, Bootstrap responsive tabs, Font Awesome 4.7.0, plus Google Fonts Lato and Roboto. Local CSS includes `bootstrap.min.css`, `reset.css`, `jquery.fancybox.min.css`, `menu.css`, `owl.carousel.min.css`, `tab.css`, `style.css`, and `responsive.css`; local scripts include `app.js` and the libraries above.
- Hosting headers on the homepage identify Hostinger / `hcdn`. The site is delivered over HTTPS. This does not identify the application or storage implementation.
- **Backend evidence:** the admission enquiry form has an inline JavaScript handler that sends `FormData` by `POST` to `submit.php`. The endpoint responds to read-only `GET` and `HEAD` requests with HTTP 200 and `text/html`; this alone does not confirm what a POST does, whether data is stored, or who receives it. The PHP handler's implementation was not inspected. No other API endpoint was found in the homepage source.
- Content is predominantly page-based HTML, with a small amount of client-side behavior for navigation, sliders/carousels, tabs, counters and image viewing. Announcements, course tables, staff records and accreditation content are rendered as page content; no content-management platform was confirmed.

## 2. Sitemap and navigation

The primary menu groups content as follows. The list includes linked HTML pages discovered from the main navigation and its linked pages; it is not a guarantee that every page on the domain was discovered.

| Section | Public HTML pages / routes |
| --- | --- |
| Home and about | `/`, `/index.html`, `/vision-mission.html`, `/desk-of-chairman.html`, `/desk-of-principal.html`, `/introduction.html` (404), `/degree-college.html` |
| Programs | `/b-m-s.html` (BMS), `/b-com.html` (B.Com), `/bsc-it.html` (B.Sc. IT), `/baff.html` (BAF/BAFF), `/m-com.html` (M.Com), `/academic.html`, `/academic-calendar.html` |
| Admissions and students | `/prospectus.html`, `/results.html`, `/exam-time-table.html`, `/events.html`, `/club.html`, `/nss.html` |
| People and campus | `/teaching-staff.html`, individual faculty profile pages: `/abid-hussain.html`, `/md-harron.html`, `/abid-dhuka.html`, `/naseem-ansari.html`, `/Miss-Shahida-Bawa.html`, `/vinay.html`, `/aqueel.html`, `/afrin.html`, `/shireen-shaikh.html`, `/Patel-Soheb-Gulam.html`, `/shaikh-fahim.html`, `/hani-haroon.html`, `/syma-bot.html`, `/ajay-kamble.html`, `/raheel-khan.html`, `/adil-shah.html`, `/shrishyam-mishra.html`, `/mayur-kumawat.html`, `/afiya-khan.html`, `/kirti-mishra.html`; `/infrastructure.html`, `/culture-club.html`, `/english-social-club.html`, `/social-club-committee.html` |
| Research and publications | `/research-teachers.html`, `/research-students.html`, `/publications.html`, `/research-publication.html` |
| Governance, committees and accreditation | `/student-grievance-committee.html`, `/anti-sexual-harassment-committee.html`, `/anti-ragging-committee.html`, `/iqac-committee.html`, `/ssr.html`, `/extended-profile.html`, `/dvv-clarification.html`, `/dvv-extended-profile.html`, `/capacity-building-and-skill-enhancement.html`, `/stakeholders-feedback.html` |
| Contact | `/contact-us.html` |

The header also labels Committee, NAAC, IQAC, RTI and Self Declaration. Committee, RTI and Self Declaration menu entries observed in source point to `#`; the NAAC label routes to `iqac-committee.html`, as does IQAC. The site has no sitemap page linked to a functioning sitemap URL in the reviewed navigation; “Sitemap” links point to `#`.

### Programs

Program pages contain semester-wise course / credit tables and links to year/semester syllabus documents. Pages found: BMS, B.Com, B.Sc. IT, BAFF, and M.Com. `/academic-calendar.html` is linked from program pages. The enquiry form offers B.B.A., B.Com., B.Sc. and M.B.A., which does not match the program menu and should be reconciled with the college before migration.

### Admissions

`/prospectus.html` is in the menu, but its visible “Click here to Form” link leads to `/degree-college.html`; it is not clearly a prospectus download. The homepage advertises First Year Admission, Senior College Admissions Open 2026–27, Admission Instructions and Certificate Course, but several banner anchors have empty `href` values. A prominent admission enquiry form is present on the homepage.

### Student resources and governance

- Exam timetables: separate Commerce & Management and Science & Technology groupings, each with NEP and Non-NEP ATKT PDFs and semester/internal timetable links.
- Results: eight linked PDF result cards (FY/SY B.Com, BAF, BMS and B.Sc. IT).
- Events: five recent event entries plus an events image gallery.
- Research: teacher/student/publication pages link research PDFs.
- Accreditation: SSR and DVV/extended-profile pages link NAAC criteria evidence PDFs; committee pages list governance membership. Anti-Sexual-Harassment page links a Google Forms complaint form.

### Contact information observed

The current homepage header/footer gives Relief Road, Oshiwara, Jogeshwari (West), Mumbai 400102, Maharashtra; `+91 9987797194`, `+91 9324261257`, and `khmwdegree@gmail.com`. The contact page and older content instead show `022-2678-0865`, `022-2678-2582`, and `info@khmwcollege.org`. Another homepage notice also lists `022-26782582` / `022-26780865`. Confirm authoritative contact details before migration. A Google Maps iframe is embedded on Contact Us.

## 3. Asset inventory

The companion [asset URL manifest](ASSET_INVENTORY.csv) contains 444 unique image and downloadable-file references gathered from the pages reached in the bounded crawl (186 image references and 258 file references). It records original absolute URLs and filenames; it does not claim a status check for every entry. Sizes and dimensions in the selected-image inventory below are direct fetch observations. The site has no centralized media index, so preserve the original directory/path relationships when gathering the full media library.

| Category | Filename / path | Format; dimensions | Bytes | Notes |
| --- | --- | ---: | ---: | --- |
| Logo | `images/k-h-m-w-logo.png` | PNG; 200×200 | 43,685 | Header and footer logo |
| Accreditation mark | `images/b++naac.png` | PNG; 200×200 | 51,232 | NAAC mark; source also links `naac/naac-certificate.pdf` |
| Campus | `images/khmw-college.jpg` | JPEG; 500×363 | 48,631 | Homepage college image |
| About banner | `images/about.jpg` | JPEG; 1600×221 | 81,944 | Shared interior-page banner |
| Chairman | `images/chairmen-mr-abdul-ahad-khan.jpg` | JPEG; 500×335 | 35,483 | Leadership image |
| Hero | `images/slider/slider-1.jpg` | JPEG; 1400×451 | 155,888 | Homepage carousel |
| Hero | `images/slider/slider-2.jpg` | JPEG; 1400×450 | 157,345 | Homepage carousel |
| Hero | `images/slider/slider-3.jpg` | JPEG; 1401×451 | 172,985 | Homepage carousel |
| Hero | `images/slider/slider-4.jpg` | JPEG; 1400×450 | 106,519 | Homepage carousel |
| Hero | `images/slider/slider-5.jpg` | JPEG; 1401×451 | 154,348 | Homepage carousel |
| Hero | `images/slider/slider-6.jpg` | JPEG; 1401×451 | 131,004 | Homepage carousel |
| Hero | `images/slider/slider-7.jpg` | JPEG; 1401×451 | 145,373 | Homepage carousel |
| Hero | `images/slider/slider-8.jpg` | JPEG; 1401×451 | 99,903 | Homepage carousel |
| Hero | `images/slider/slider-9.jpg` | JPEG; 1401×451 | 190,956 | Homepage carousel |
| Hero | `images/slider/slider-10.jpg` | JPEG; 1401×451 | 192,010 | Homepage carousel |
| Hero | `images/slider/slider-11.jpg` | JPEG; 1400×450 | 152,730 | Homepage carousel |
| Placement partner | `images/placement-partner/placement_partner1.jpg` | JPEG; 1600×691 | 72,923 | Display constrained to small logo-like card |
| Placement partner | `images/placement-partner/placement_partner2.jpg` | JPEG; 1330×400 | 48,673 | Same |
| Placement partner | `images/placement-partner/placement_partner3.jpg` | JPEG; 709×400 | 34,381 | Same |
| Placement partner | `images/placement-partner/placement_partner4.jpg` | JPEG; 1159×400 | 38,421 | Same |
| Placement partner | `images/placement-partner/placement_partner5.png` | PNG; 758×929 | 571,011 | Large for small-card display |
| Placement partner | `images/placement-partner/placement_partner6.png` | PNG; 934×902 | 510,624 | Large for small-card display |
| Event | `images/events/E-LAN_FEST_2025-26/E-LAN_FEST_2025-26_11.JPG` | JPEG; 1600×1067 | 316,143 | Homepage event gallery sample |
| Event | `images/events/E-LAN_FEST_2025-26/E-LAN_FEST_2025-26_17.JPG` | JPEG; 1600×1067 | 411,669 | Homepage event gallery sample |
| Event | `images/events/Beach_Cleaning_2025_26/Beach_Cleaning_2025_26_1.jpg` | JPEG; 1231×739 | 155,940 | Homepage event gallery sample |
| Event | `images/events/Industrial_Visit_2025_26/Industrial_Visit_2025_26_1.jpg` | JPEG; 1280×960 | 410,608 | Homepage event gallery sample |
| Event | `images/events/Industrial_Visit_2025_26/Industrial_Visit_2025_26_7.jpg` | JPEG; 720×1280 | 186,022 | Portrait event image |
| Event | `images/events/CAREER_COUNSELLING_FOR_BSCIT_STUDENTS_2025_26/CAREER_COUNSELLING_FOR_BSCIT_STUDENTS_2025_26_2.jpg` | JPEG; 1600×1200 | 430,153 | Homepage event gallery sample |
| Event | `images/events/Sports_Day_2025_26/Sports_Day_2025_26_22.JPG` | JPEG; 1600×1067 | 506,292 | Homepage event gallery sample |

Other observed image families include `images/degree-college/` faculty portraits and `images/cultur-club/` cultural committee photographs. Homepage source references 11 hero images, six placement partner images, two copies of the college logo, one NAAC mark, a campus photo, and event-gallery photos. Sample faculty portrait files confirmed HTTP 200 include `images/degree-college/abid-dhuka.jpg` (331×495, 21,613 bytes), `abid-hussain-jagirdar.jpg` (331×495, 14,395 bytes), `adil-shah.jpg` (600×900, 57,905 bytes), `afiya-khan.jpg` (600×900, 68,611 bytes), `afrin-nisar-shaikh.jpg` (251×373, 25,796 bytes), and `ajay-kamble.jpg` (600×900, 46,585 bytes). Sample cultural photos `images/cultur-club/k-h-m-w-cultur-{1,2,3,6}.jpg` are each 461×309 and 27,402–35,769 bytes.

**PDF and document families:** `naac/naac-certificate.pdf`; `exam-timetable/` (21 timetable/notice PDF links observed and verified HTTP 200); `results/` (eight linked result PDFs); `naac/criterion-*` and `naac/dvv/` (many criterion evidence PDFs); `naac/res-publication/` (ten research PDFs); plus NAAC minutes of meeting. For example, the Commerce/Management NEP Semester I PDF is 186,233 bytes and the Non-NEP Semester I PDF is 178,662 bytes. The audit confirmed result links in HTML but did not verify the status of each result PDF in this pass.

**Duplicates / broken assets:** exact duplicate image bytes were not confirmed in the sampled set. Shared logo is intentionally used in header and footer. No broken image URL was observed among sampled homepage assets. This is not a complete byte-for-byte duplicate scan of every asset on the site.

## 4. Functional feature inventory

| Feature | Observed behavior | Confidence / status |
| --- | --- | --- |
| Admission enquiry form | Fields: name, email, mobile, optional WhatsApp/address/message, course selector, required consent checkbox. Inline handler prevents normal submit, posts `FormData` to `submit.php`, displays success/error status and resets on exact response `success`. | **Confirmed in HTML/JS.** Actual delivery/storage and POST response remain unverified; endpoint GET/HEAD returns 200 HTML. No submission attempted. Course list conflicts with program menu. |
| Contact page form | Name/email/message inputs have no `name` attributes; email is `type=text`; Submit control is `type=button`; form uses `action="#"`, `method="post"`; no page-level submit handler was found. | **Appears nonfunctional** from source; no submission attempted. |
| Footer “Get in Touch” form | Name/email fields and Submit are visible in rendered text. | **Unconfirmed.** Page source review found no verified handler or endpoint. |
| Timetable downloads | NEP and Non-NEP ATKT PDF anchors for Commerce & Management and Science & Technology; observed links return HTTP 200. | **Confirmed links/download resources.** Timetable currency should be checked against current academic notices. |
| Results downloads | Eight FY/SY PDF result links across B.Com, BAF, BMS and B.Sc IT. | **Confirmed links in page source.** Individual PDF HTTP status was not checked here. |
| Prospectus / admission forms | Prospectus route exists; “Click here to Form” leads to `degree-college.html`. Homepage admission banners include some empty links. | **Partially confirmed, incomplete flow.** No clear prospectus PDF found on that page. |
| Events gallery | Five recent event page entries and homepage thumbnail images; events route and image links are present. | **Confirmed display/content.** No backend event publishing workflow observed. |
| Grievance / complaint | Anti-sexual-harassment page links to external Google Forms; committee contacts are listed. | **Confirmed outbound link.** External form was not opened or submitted. |
| Map / contact channels | Google Maps iframe and telephone/email anchors appear. | **Confirmed links/embed in page source.** Contact data conflicts across templates. |
| Course syllabus | Course pages show semester and credit tables and link year/semester resources. | **Confirmed page content.** Individual syllabus resource links not exhaustively checked. |

## 5. Broken links and implementation problems

Read-only GETs of discovered internal HTML links found HTTP 404 at: `/introduction.html`, `/science.html`, `/commerce.html`, `/examination-details.html`, `/results-meritorious-students.html`, and `/www.khmwcollege.org` (a hostname is used as a relative path). One PDF referenced from the DVV page, `/naac/dvv/criterion-2/2-4-1/2-4-1.pdf`, also returned 404. This crawl visited linked pages to a bounded depth; treat this as observed broken links, not an exhaustive server-wide check.

Other implementation/content issues visible without submitting forms:

- `prospectus.html` directs “Click here to Form” to `degree-college.html`; no actual prospectus file was identified there from the inspected anchor.
- Some homepage admission/certificate banners have `href=""`; multiple Committee/RTI/Self Declaration/Sitemap/footer policy links point to `#`.
- The same `iqac-committee.html` URL labels both NAAC and IQAC.
- Home/menu say current 2026 admission activity and 2026 copyright, while many interior pages advertise Night College and retain 2019 copyright. Text alternates between “K.H.M.W. College” and “K.H.M.W. Night College”; academic details and contacts should be reconciled.
- Contact details differ between homepage and older interior-page templates.
- Course selector values do not match the listed programs.
- Course pages contain visible spelling and data-quality errors; preserve source facts only after academic review.
- Placement-partner PNG/JPEG images are large for the small display size (up to 571 KB). Several image alt attributes are generic or empty, including event photos; image accessibility and performance need review.
- Form security/privacy behavior cannot be inferred from the pages. The admission form collects personal contact data and consent; its destination and retention should be documented before recreating it.

## 6. Content migration recommendations

1. Reconcile the official institution naming, junior/senior/night-college scope, current course list, academic session, NAAC statement, contacts, and public-facing email with the college before copying page text.
2. Preserve and reorganize high-value student content: course structure/syllabus, academic calendar, admission steps/forms/prospectus, current timetable notices, results, events, faculty profiles, committees, grievance/reporting route, and NAAC/SSR/DVV evidence.
3. Audit each PDF for currentness, accessibility, duplicate copies, title, academic year and owner. Keep stable download links and clearly label the session/version. Result files warrant an individual status/content check.
4. Carry forward image originals and credit/context where known. Create a reviewed asset manifest from the complete media folders; de-duplicate by file hash and add descriptive alt text. The measurements above are a checked subset, not a complete media export.
5. Rebuild content/navigation from verified destinations, replacing dead or placeholder links. Keep old public URLs redirected or mapped where appropriate so students’ bookmarks and search results continue to work.
6. Treat the admission and contact forms as separate flows. Confirm admission enquiry delivery/recipient, consent wording, privacy notice, and required fields; replace the currently inert contact form with a verified submission process.
7. Validate accessible menus, page titles, headings, forms, keyboard behavior, document labels and mobile layouts during replacement planning.

## 7. Functionality that must not be lost

- A working, confirmed admission enquiry path with course choice and explicit consent.
- Current admissions instructions, application/form access and a real prospectus.
- Fast, grouped access to current NEP/Non-NEP timetable PDFs and results by course/year.
- Academic program pages, curriculum tables, syllabus links and calendar.
- Event archive/gallery, campus/facilities images and faculty directory/profile information.
- Grievance reporting and required committee/anti-ragging/anti-harassment information.
- NAAC accreditation status and the downloadable SSR, criterion and DVV evidence archive.
- Verified address, phone, email and map directions.

## Method and limits

Reviewed the live homepage source, followed publicly linked pages/resources with ordinary GET requests, checked response status for discovered same-origin HTML links and selected assets, and parsed form markup/JavaScript. No form or complaint message was submitted, no login or vulnerability checks were performed, and no files on the website were changed. Some pages and documents expose personal staff names or student-result materials; this report records only the public resource categories and selected faculty photos needed for site migration, and does not reproduce individual result data.
