import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { DocumentList } from "@/components/document-list";
import { studentDocumentCounts, timetableCollections } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Examination Timetables | Student Corner | K.H.M.W. College",
  description: "Audited NEP and Non-NEP ATKT timetable PDF links by academic group.",
};

export default function StudentTimetablesPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Timetables" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Examination timetables"
        description={`${studentDocumentCounts.timetablePdfs} timetable PDF links grouped by the source directory’s academic group and NEP/Non-NEP ATKT path.`}
      />
      <ContentSection id="timetable-downloads" title="Timetable downloads">
        <p>
          The audit recorded HTTP 200 responses for these original PDF URLs. The files’ contents, academic years, timetable version and current validity were not confirmed; filenames and categories below are preserved from the source.
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
