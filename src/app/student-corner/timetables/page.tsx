import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { studentDocumentCounts, timetableCollections } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Examination Timetables | Student Corner",
  description: "Locally hosted examination timetable PDFs grouped by source category.",
};

export default function StudentTimetablesPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Timetables" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Examination timetables"
        description={`${studentDocumentCounts.timetablePdfs} archived timetable PDFs, grouped by the source directory’s academic group and NEP/Non-NEP ATKT path.`}
      />
      <ContentSection id="timetable-downloads" title="Timetable downloads">
        <p>
          The PDF files are available locally with their source filenames and folder groupings preserved. Some dates are printed in the documents, but the archive does not establish whether any timetable remains applicable. Check each file’s examination date, semester and notice status before relying on it.
        </p>
        <div className="resource-groups">
          {timetableCollections.map((collection) => (
            <section className="resource-group" key={collection.id} aria-labelledby={`timetables-${collection.id}`}>
              <h3 id={`timetables-${collection.id}`}>{collection.discipline}</h3>
              {collection.categories.map((category) => (
                <div className="resource-category" key={category.title}>
                  <h4>{category.title}</h4>
                  <DocumentList items={category.items} label={`${collection.discipline} ${category.title}`} />
                </div>
              ))}
            </section>
          ))}
        </div>
      </ContentSection>
    </main>
  );
}
