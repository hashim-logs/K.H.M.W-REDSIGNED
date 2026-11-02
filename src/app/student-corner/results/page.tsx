import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { resultDocumentFilenames } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Results | Student Corner",
  description: "Result document publication status and review requirements.",
};

export default function StudentResultsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Results" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Results"
        description="Result documents are not published here until their contents and privacy status have been reviewed."
      />
      <ContentSection id="results-review" title="Publication review required" tone="muted">
        <p>
          The recovered source collection contains {resultDocumentFilenames.length} result PDFs. Their contents, examination sessions, personal information and continued publication approval have not been reviewed, so the files are intentionally not linked or hosted on this public site.
        </p>
        <p className="source-note">
          The source filenames are retained in the internal project inventory. The institution must confirm which results, if any, are appropriate for public redistribution and how student information should be handled.
        </p>
      </ContentSection>
    </main>
  );
}
