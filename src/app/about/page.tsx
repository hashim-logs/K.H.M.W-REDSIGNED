import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";

const publishedVisionMissionUrl = "https://khmwcollege.org/vision-mission.html";
const currentSite = "https://khmwcollege.org";

export const metadata: Metadata = {
  title: "About | K.H.M.W. College",
  description:
    "About K.H.M.W. College: a source-attributed overview based on information published on the existing college website.",
};

export default function AboutPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="About" />
      <PageHeader
        eyebrow="About the college"
        title="K.H.M.W. College"
        description="An overview of the college's published aims and institutional information, with source links for further reading."
      />

      <ContentSection id="introduction" title="Institutional introduction">
        <p>
          The existing college website publishes a vision, mission and goals for the institution. This page summarizes those statements and links to the source so that readers can consult the original wording.
        </p>
        <p className="source-note">
          Source: <a href={publishedVisionMissionUrl}>Vision &amp; Mission on the current college website</a>. The source page uses the name “The K.H.M.W Night College of Commerce”; the redesigned site is retaining the approved project label pending confirmation of the institution’s public name and scope.
        </p>
      </ContentSection>

      <ContentSection id="background" title="College background" tone="muted">
        <p>
          A historical overview is not included in this preview because the reviewed public source did not provide an accessible, verifiable account. No founding date or history has been inferred.
        </p>
      </ContentSection>

      <ContentSection id="vision-and-mission" title="Vision and mission">
        <div className="statement-grid">
          <article className="statement">
            <h3>Vision</h3>
            <p>
              The published vision describes an inclusive and sustainable learning environment that supports students’ potential, and identifies integrity, innovation, creativity and quality among its guiding values.
            </p>
          </article>
          <article className="statement">
            <h3>Mission</h3>
            <p>
              The published mission describes accessible, affordable and high-quality education, educational programs and services that support student achievement and lifelong learning, and academic, cultural and civic development.
            </p>
          </article>
        </div>
        <p className="source-note">
          These are paraphrases of the <a href={publishedVisionMissionUrl}>college’s published Vision &amp; Mission page</a>. The wording is publicly visible; its currentness and institutional scope still need confirmation.
        </p>
      </ContentSection>

      <ContentSection id="objectives" title="Institutional objectives">
        <p>The source page presents these objectives under the heading “Goals.” It describes:</p>
        <ul className="editorial-list">
          <li>Making quality education accessible and affordable.</li>
          <li>Pursuing excellence and a culture of openness, sharing and commitment.</li>
          <li>Supporting students with skilled and caring staff.</li>
          <li>Enriching lives and contributing to society.</li>
        </ul>
        <p className="source-note">
          Summarized from the <a href={publishedVisionMissionUrl}>published Vision &amp; Mission page</a>; confirm the current approved wording before treating these as current institutional objectives.
        </p>
      </ContentSection>

      <ContentSection id="campus-and-infrastructure" title="Campus and infrastructure" tone="muted">
        <p>
          The existing website has an Infrastructure page. Specific facilities are not described here because their details and currentness were not established in the project research.
        </p>
        <p><a href={`${currentSite}/infrastructure.html`}>View infrastructure information on the current college website</a></p>
      </ContentSection>

      <ContentSection id="governance" title="Governance and institutional information">
        <p>
          Committee and self-study information remains on the existing college website. This preview links to those source pages without reproducing membership, accreditation status or other claims that require current confirmation.
        </p>
        <ul className="editorial-list">
          <li><a href={`${currentSite}/iqac-committee.html`}>IQAC committee information</a></li>
          <li><a href={`${currentSite}/ssr.html`}>Self Study Report (SSR)</a></li>
        </ul>
      </ContentSection>

      <RelatedLinks
        links={[
          { label: "Vision & Mission", href: publishedVisionMissionUrl, external: true, description: "Published vision, mission and goals." },
          { label: "Infrastructure", href: `${currentSite}/infrastructure.html`, external: true, description: "Infrastructure information on the existing college website." },
          { label: "IQAC committee", href: `${currentSite}/iqac-committee.html`, external: true, description: "Committee information on the existing college website." },
          { label: "Self Study Report", href: `${currentSite}/ssr.html`, external: true, description: "Published SSR page on the existing college website." },
        ]}
      />
    </main>
  );
}
