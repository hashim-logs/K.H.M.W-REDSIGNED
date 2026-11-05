import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { PublishedContentList } from "@/components/published-content-list";
import { facultyDirectoryContent } from "@/content/faculty";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Faculty directory publication status and information needed to complete the roster.",
};

export default function FacultyPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Faculty" />
      <PageHeader
        eyebrow="Faculty"
        title="Faculty directory"
        description="Faculty profiles will be published when the college confirms the current roster and approves the profile information."
      />
      <ContentSection id="faculty-source" title="Recovered faculty material" tone="muted">
        <p>
          The source audit recorded a Teaching Faculty page{facultyDirectoryContent.individualProfileRoutesObserved ? " and individual profile routes" : ""}. The migration archive contains {facultyDirectoryContent.originalPortraitCount} original portrait files and {facultyDirectoryContent.enhancedPortraitCount} separately enhanced images, but it does not include faculty-page text or a verified mapping between every portrait and person.
        </p>
        <p>
          No names, titles, qualifications or photographs are assigned to a current directory from filenames alone. The enhanced set is not assumed to be equivalent to the original photographs.
        </p>
      </ContentSection>
      <ContentSection id="faculty-confirmation" title="Information needed to publish profiles">
        <ul className="editorial-list">
          <li>A college-confirmed current faculty roster.</li>
          <li>Approved public names, roles, departments and qualifications.</li>
          <li>Confirmed photo-to-person mappings and permission to publish each image.</li>
          <li>Approval of individual profile text and any contact details.</li>
        </ul>
      </ContentSection>
      <ContentSection id="confirmed-faculty" title="Approved public profiles" tone="muted">
        <PublishedContentList type="faculty" emptyMessage="No current faculty profiles are approved for publication." />
      </ContentSection>
    </main>
  );
}
