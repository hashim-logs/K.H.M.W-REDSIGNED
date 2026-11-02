import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";
import {
  academicResources,
  academicSourceUrls,
  coursePageSources,
  enquiryFormCourseOptions,
} from "@/content/academics";

export const metadata: Metadata = {
  title: "Academics | K.H.M.W. College",
  description:
    "Academic programme information and source links, with differences between the existing course pages and enquiry form clearly identified.",
};

export default function AcademicsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Academics" />
      <PageHeader
        eyebrow="Academics"
        title="Academic information"
        description="Explore programme and academic-resource links from the existing college website. Current offerings and course information require confirmation by the college."
      />

      <ContentSection id="academic-introduction" title="About the academic information">
        <p>
          The existing website publishes individual course pages and also lists course choices in its admission enquiry form. Those two sources do not show the same programme list. This preview keeps each source separate and does not identify either list as the definitive current offering.
        </p>
        <p className="source-note">
          The reviewed material does not establish a confirmed undergraduate/postgraduate grouping or current programme status. No eligibility, duration, affiliation or course description is supplied here.
        </p>
      </ContentSection>

      <ContentSection id="programme-directory" title="Programme directory from course pages" tone="muted">
        <p>
          These names appear in the existing site’s Programs navigation and individual course pages. They are presented as source-page titles, not as a confirmed current programme list.
        </p>
        <ul className="academic-source-list">
          {coursePageSources.map((source) => (
            <li key={source.href}>
              <a href={source.href}>{source.label}<span aria-hidden="true"> ↗</span></a>
              {source.note ? <p>{source.note}</p> : null}
            </li>
          ))}
        </ul>
        <p className="source-note">
          The B.Com page is listed in the audit and the site navigation, though it could not be retrieved during the latest source review. The course pages contain semester/course tables and links to syllabus resources; the individual linked documents were not checked for currentness or complete availability.
        </p>
      </ContentSection>

      <ContentSection id="enquiry-form-options" title="Different course options in the enquiry form">
        <p>
          The existing homepage enquiry form lists the following options. This is evidence of the form’s labels only; it does not confirm that these programmes are currently offered or that the form submission workflow is operational.
        </p>
        <ul className="academic-option-list">
          {enquiryFormCourseOptions.map((course) => <li key={course}>{course}</li>)}
        </ul>
        <p><a href={academicSourceUrls.homepage}>View the enquiry form on the existing college website</a></p>
        <p className="source-note">
          The enquiry-form options differ from the programme course pages above. In particular, B.B.A./M.B.A. and BMS/BAFF/M.Com do not match across the sources. The college must confirm the current official list before migration.
        </p>
      </ContentSection>

      <ContentSection id="curriculum-and-syllabus" title="Curriculum and syllabus resources" tone="muted">
        <p>
          The audit found semester-wise course or credit tables and year/semester syllabus links on the course pages. No curriculum has been copied here because the audit also notes data-quality errors, and individual syllabus files were not exhaustively verified.
        </p>
        <p>Use the source-page links in the programme directory to inspect resources published for each course. Confirm the academic year and document validity with the college before relying on a syllabus.</p>
      </ContentSection>

      <ContentSection id="admissions-navigation" title="Admissions information">
        <p>
          The existing site has a Prospectus page, but the audited “Click here to Form” link leads to a page that was not clearly identified as an application form. This preview does not provide an Apply action or claim that an admissions workflow is available.
        </p>
        <p><a href={academicSourceUrls.prospectus}>View the Prospectus page on the existing college website</a></p>
      </ContentSection>

      <RelatedLinks
        title="Related academic resources"
        links={academicResources.map((resource) => ({
          label: resource.label,
          href: resource.href,
          external: true,
          description: resource.note,
        }))}
      />
    </main>
  );
}
