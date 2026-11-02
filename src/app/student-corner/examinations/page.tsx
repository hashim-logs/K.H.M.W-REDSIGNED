import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { examNoticeDocuments } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Examinations | Student Corner",
  description: "Archived examination notices and timetables hosted locally, with source limitations identified.",
};

export default function StudentExaminationsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Examinations" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Examinations"
        description="Examination timetables and circulars collected from the college’s published resources."
      />
      <ContentSection id="exam-timetables" title="Examination timetables" tone="muted">
        <p>
          The archived timetable PDFs are available from this site and organized by the source directory’s academic group and NEP/Non-NEP ATKT category. Check the date and applicable session printed in each file before relying on it.
        </p>
        <p><Link href="/student-corner/timetables">Browse the timetable PDF directory</Link></p>
      </ContentSection>
      <ContentSection id="exam-circulars" title="Examination circular PDFs">
        <p>
          These two examination documents are copied from the recovered source collection. They may describe a time-bound examination; their local availability does not establish that they remain applicable.
        </p>
        <DocumentList items={examNoticeDocuments} label="Examination circular PDFs" />
      </ContentSection>
      <ContentSection id="examination-details-unavailable" title="Examination details page unavailable" tone="muted">
        <p>
          The audit found the source site’s examination-details route unavailable. The recovered documents above and in the timetable directory are the available materials; no other schedule details are inferred.
        </p>
        <p><Link href="/student-corner/results">View results publication status</Link></p>
      </ContentSection>
    </main>
  );
}
