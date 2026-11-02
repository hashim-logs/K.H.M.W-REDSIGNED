import type { Metadata } from "next";
import { Breadcrumbs, PageHeader, RelatedLinks } from "@/components/public-page";
import { studentCornerPages, studentDocumentCounts } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Student Corner",
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
        description={`Browse ${studentDocumentCounts.timetablePdfs} archived timetable PDFs and ${studentDocumentCounts.examinationCircularPdfs} examination notices hosted here. Results remain withheld pending review.`}
      />
      <RelatedLinks title="Browse student resources" links={[...studentCornerPages]} />
    </main>
  );
}
