import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { PublishedNotices } from "@/components/published-notices";
import { examNoticeDocuments } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Notices | Student Corner",
  description: "Archived examination notice PDFs hosted locally with their validity limitations stated.",
};

export default function StudentNoticesPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Notices" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Notices and circulars"
        description="Examination notices recovered from the college’s published document collection."
      />
      <ContentSection id="examination-notices" title="Examination notices and circulars" tone="muted">
        <p>
          Both recovered PDFs are hosted locally below. Their content may be time-bound; check the document itself and confirm applicability before acting on it.
        </p>
        <DocumentList items={examNoticeDocuments} label="Examination notice and circular PDFs" />
      </ContentSection>
      <ContentSection id="other-notices" title="Other notice categories">
        <p>
          The recovered archive did not include a verified set of general student notices. Admission source labels and their limitations are described on the <Link href="/admissions">Admissions page</Link>.
        </p>
        <PublishedNotices />
      </ContentSection>
    </main>
  );
}
