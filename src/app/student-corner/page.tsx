import type { Metadata } from "next";
import { Breadcrumbs, PageHeader, RelatedLinks } from "@/components/public-page";
import { studentCornerPages, studentDocumentCounts } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Student Corner | K.H.M.W. College",
  description:
    "Student resource links for notices, examination timetables, results and the historical academic calendar.",
};

export default function StudentCornerPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Student Corner" />
      <PageHeader
        eyebrow="Student resources"
        title="Student Corner"
        description={`Find published student resources by type. The source audit recorded ${studentDocumentCounts.timetablePdfs} timetable PDFs, ${studentDocumentCounts.examinationCircularPdfs} examination circular PDFs and ${studentDocumentCounts.resultPdfs} result PDFs; dates and document contents require review.`}
      />
      <RelatedLinks title="Browse student resources" links={[...studentCornerPages]} />
    </main>
  );
}
