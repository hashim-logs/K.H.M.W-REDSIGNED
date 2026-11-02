import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { coursePageSources, enquiryFormCourseOptions } from "@/content/academics";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Programme names found in the recovered college source inventory, with missing curriculum material clearly identified.",
};

export default function AcademicsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Academics" />
      <PageHeader
        eyebrow="Academics"
        title="Academic programmes"
        description="Browse programme names recorded in the source audit. The programme list and full course information require institutional confirmation."
      />

      <ContentSection id="programme-directory" title="Programme directory" tone="muted">
        <p>
          These programme titles were found in the existing college site’s navigation/course-page inventory. They are preserved as source labels, not asserted as a current offering.
        </p>
        <ul className="program-directory">
          {coursePageSources.map((source) => (
            <li key={source.href}>
              <Link href={source.href}>{source.label}</Link>
              {source.note ? <p>{source.note}</p> : null}
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection id="programme-conflict" title="Programme list requires confirmation">
        <p>
          The homepage admission-enquiry form used a different set of course labels:
        </p>
        <ul className="academic-option-list">
          {enquiryFormCourseOptions.map((course) => <li key={course}>{course}</li>)}
        </ul>
        <p className="source-note">
          The course-page labels are BMS, B.Com, B.Sc. IT, BAFF/BAF and M.Com. These conflict with the enquiry-form labels. Neither source establishes the current approved programme list.
        </p>
      </ContentSection>

      <ContentSection id="curriculum" title="Curriculum and syllabus">
        <p>
          The source audit observed semester-wise course/credit tables and syllabus links on course pages, but the original HTML and syllabus files are not in the recovered archive. Consequently, no course structure, credit value, eligibility, duration, affiliation or syllabus has been reconstructed or inferred here.
        </p>
        <p>
          <Link href="/admissions">See admissions information and confirmation needs</Link>
        </p>
      </ContentSection>
    </main>
  );
}
