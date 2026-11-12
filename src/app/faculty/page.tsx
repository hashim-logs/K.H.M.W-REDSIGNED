import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { PublishedContentList } from "@/components/published-content-list";
import { LightboxImage } from "@/components/image-lightbox";
import { historicalFacultyPortraits, unmatchedEnhancedPortraits } from "@/content/faculty";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Faculty names and qualifications published by K.H.M.W. College of Commerce.",
};

export default function FacultyPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Faculty" />
      <PageHeader
        eyebrow="Faculty"
        title="Faculty profiles"
        description="Select a portrait to view the qualifications listed on the college website. Contact the college for current staff details."
      />
      <ContentSection id="faculty-source" title="Faculty profiles" tone="muted">
        <p>
          These names and qualifications are from the college’s published faculty page. They are not a confirmation of current employment, designations or roster details.
        </p>
        <div className="faculty-portrait-grid">
          {historicalFacultyPortraits.map((portrait) => (
            <article className="faculty-portrait-card" key={portrait.image}>
              <LightboxImage
                className="faculty-portrait-card__image"
                src={`/images/faculty/${portrait.image}`}
                alt={`Portrait of ${portrait.name}`}
                width={portrait.width}
                height={portrait.height}
                sizes="(max-width: 40rem) 50vw, (max-width: 62rem) 33vw, 22vw"
                openLabel={`View faculty profile for ${portrait.name}`}
                details={(
                  <div>
                    <h2>{portrait.name}</h2>
                    <dl>
                      <dt>Qualifications listed on the college website</dt>
                      <dd>{portrait.qualifications}</dd>
                    </dl>
                    <p>Current designation and staff status should be confirmed with the college.</p>
                  </div>
                )}
              />
              <h3>{portrait.name}</h3>
              <p>Open the portrait for published profile details.</p>
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
