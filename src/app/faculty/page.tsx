import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";
import { facultyDirectoryContent } from "@/content/faculty";

export const metadata: Metadata = {
  title: "Faculty | K.H.M.W. College",
  description:
    "Faculty directory awaiting verified institutional information and approved photo-to-person mappings.",
};

export default function FacultyPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Faculty" />
      <PageHeader
        eyebrow="Faculty"
        title="Faculty directory"
        description="Faculty information will be added when the college confirms the current public roster and profile details."
      />
      <ContentSection id="faculty-directory-status" title="Directory awaiting verification">
        <p>{facultyDirectoryContent.summary}</p>
        <p>{facultyDirectoryContent.verificationNote}</p>
      </ContentSection>
      <RelatedLinks
        title="Published faculty information"
        links={[
          {
            label: "Teaching Faculty on the existing college website",
            href: facultyDirectoryContent.sourceUrl,
            external: true,
            description: facultyDirectoryContent.sourceDescription,
          },
        ]}
      />
    </main>
  );
}
