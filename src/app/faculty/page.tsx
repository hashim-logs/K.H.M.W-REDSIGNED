import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { PublishedContentList } from "@/components/published-content-list";
import { LightboxImage } from "@/components/image-lightbox";
import { facultyDirectoryContent, historicalFacultyPortraits, unmatchedEnhancedPortraits } from "@/content/faculty";

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
        description="Archived source-page portraits are shown separately; a current faculty directory requires college confirmation."
      />
      <ContentSection id="faculty-source" title="Recovered faculty material" tone="muted">
        <p>
          The original Teaching Faculty page{facultyDirectoryContent.individualProfileRoutesObserved ? " and individual profile routes" : ""} associates names with original image paths. The archive contains {facultyDirectoryContent.originalPortraitCount} original portraits and {facultyDirectoryContent.enhancedPortraitCount} enhanced portraits. The historical pairings below were included only where the source page and visual comparison supported a clear match.
        </p>
        <p>
          This is a historical record of names and images shown by the original site, not a current staff roster. Current employment, titles, qualifications and image publication permission have not been confirmed. No present role is asserted.
        </p>
        <div className="faculty-portrait-grid">
          {historicalFacultyPortraits.map((portrait) => (
            <article className="faculty-portrait-card" key={portrait.image}>
              <LightboxImage
                className="faculty-portrait-card__image"
                src={`/images/faculty/${portrait.image}`}
                alt={`Historical portrait associated with ${portrait.name} on the original teaching-staff page`}
                width={portrait.width}
                height={portrait.height}
                sizes="(max-width: 40rem) 50vw, (max-width: 62rem) 33vw, 22vw"
              />
              <h3>{portrait.name}</h3>
              <p>Listed on the recovered original teaching-staff page; current status unconfirmed.</p>
            </article>
          ))}
        </div>
        <details className="faculty-portrait-review">
          <summary>Enhanced portraits awaiting manual identity confirmation</summary>
          <ul className="editorial-list">
            {unmatchedEnhancedPortraits.map((portrait) => <li key={portrait}>{portrait}</li>)}
          </ul>
        </details>
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
