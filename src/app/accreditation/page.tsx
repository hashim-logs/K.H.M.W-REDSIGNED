import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";

export const metadata: Metadata = {
  title: "IQAC & Accreditation | K.H.M.W. College",
  description:
    "Source-led IQAC and accreditation information, with current status and verification limits made clear.",
};

export default function AccreditationPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="IQAC & Accreditation" />
      <PageHeader
        eyebrow="Governance and quality"
        title="IQAC & Accreditation"
        description="A guide to the related source pages and documents identified in the project audit, with verification limits made clear."
      />

      <ContentSection id="overview" title="About this section">
        <p>
          The existing college website lists IQAC, SSR, extended-profile and DVV pages. The reviewed project records do not confirm their current contents, committee details, institutional scope, or accreditation status. This preview therefore provides source links and evidence notes rather than presenting unverified claims as current facts.
        </p>
      </ContentSection>

      <ContentSection id="iqac" title="Internal Quality Assurance Cell" tone="muted">
        <p>
          The audit records an IQAC committee page, but the same source URL is also used for the site’s NAAC navigation label. The current IQAC structure, membership, activities, coordinator and approved public information have not been confirmed.
        </p>
        <p><Link href="/accreditation/iqac">Review IQAC source information</Link></p>
      </ContentSection>

      <ContentSection id="naac" title="NAAC and accreditation">
        <p>
          The audit notes that an accreditation claim was observed, but it does not preserve the exact claim wording or establish its cycle, dates or current status. The reviewed sources do not support publishing a current grade, score, certificate validity or accreditation mark.
        </p>
        <p><Link href="/accreditation/naac">Review accreditation source information and limitations</Link></p>
      </ContentSection>

      <RelatedLinks
        title="Explore this section"
        links={[
          {
            label: "IQAC",
            href: "/accreditation/iqac",
            description: "Source pages and information awaiting institutional confirmation.",
          },
          {
            label: "NAAC & Accreditation",
            href: "/accreditation/naac",
            description: "Claims, source documents and unavailable evidence, with limitations.",
          },
        ]}
      />
    </main>
  );
}
