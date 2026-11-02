import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { examNoticeDocuments } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Notices | Student Corner | K.H.M.W. College",
  description: "Published examination circular links identified in the website audit.",
};

export default function StudentNoticesPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Notices" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Notices"
        description="Only notice documents identified in the public-site audit are listed here. Their contents and dates have not been verified."
      />
      <ContentSection id="examination-notices" title="Examination notices and circulars" tone="muted">
        <p>
          These PDFs were linked from the existing site’s exam-timetable notice/circular directory. The audit recorded HTTP 200 for both links; that confirms the response at audit time, not the documents’ meaning, date or current relevance.
        </p>
        <DocumentList items={examNoticeDocuments} label="Examination notice and circular PDFs" />
      </ContentSection>
      <ContentSection id="other-notices" title="Other notice categories">
        <p>
          The audit did not establish a dated, individually verified set of general notices, student announcements or academic updates to reproduce here. Admission notice labels and their limitations are listed on the <Link href="/admissions">Admissions page</Link>.
        </p>
      </ContentSection>
    </main>
  );
}
