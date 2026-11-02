import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { examNoticeDocuments } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Examinations | Student Corner | K.H.M.W. College",
  description: "Verified examination resource links and status notes from the website audit.",
};

export default function StudentExaminationsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Examinations" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Examinations"
        description="Access the examination PDFs found in the public-site audit. No schedules or dates are inferred."
      />
      <ContentSection id="exam-timetables" title="Examination timetables" tone="muted">
        <p>Timetable links are organized by NEP/Non-NEP ATKT category and academic group.</p>
        <p><Link href="/student-corner/timetables">Browse the timetable PDF directory</Link></p>
      </ContentSection>
      <ContentSection id="exam-circulars" title="Examination circular PDFs">
        <p>
          The source inventory lists these circular filenames under its exam-timetable directory. The audit recorded HTTP 200 responses, but did not verify their contents or date.
        </p>
        <DocumentList items={examNoticeDocuments} label="Examination circular PDFs" />
      </ContentSection>
      <ContentSection id="examination-details-unavailable" title="Examination details page unavailable" tone="muted">
        <p>
          The original <code>examination-details.html</code> route returned HTTP 404 in the audit, so it is not linked as a working resource. The audit did not establish other verified schedule details.
        </p>
        <p><Link href="/student-corner/results">View the audited result PDF links</Link></p>
        <p className="source-note">Audited source path: <code>/examination-details.html</code>.</p>
      </ContentSection>
    </main>
  );
}
