import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { resultCollections, studentDocumentCounts } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Results | Student Corner | K.H.M.W. College",
  description: "Result PDF links identified in the website audit, grouped by the source file labels.",
};

export default function StudentResultsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Results" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Results"
        description={`${studentDocumentCounts.resultPdfs} result PDF links from the existing site, grouped by their source filenames.`}
      />
      <ContentSection id="result-downloads" title="Published result links" tone="muted">
        <p>
          These eight filenames and URLs were identified in the audit and asset inventory. Individual PDF response status, contents, academic session and current availability were not checked. Their presence here does not imply that a result is current or complete.
        </p>
        <div className="resource-groups resource-groups--results">
          {resultCollections.map((collection) => (
            <section className="resource-group" key={collection.id} aria-labelledby={`results-${collection.id}`}>
              <h3 id={`results-${collection.id}`}>{collection.title}</h3>
              <DocumentList items={collection.items} label={`${collection.title} result PDFs`} />
            </section>
          ))}
        </div>
        <p className="source-note">
          Result files may contain student information. Verify continued public availability and handling policy with the college before presenting or indexing their contents.
        </p>
      </ContentSection>
    </main>
  );
}
