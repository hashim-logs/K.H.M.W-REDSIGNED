import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";
import { accreditationSourcePageLinks } from "@/content/accreditation";

export const metadata: Metadata = {
  title: "IQAC | K.H.M.W. College",
  description:
    "IQAC source pages identified by the project audit, with committee information awaiting institutional confirmation.",
};

export default function IqacPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="IQAC" parent={{ label: "IQAC & Accreditation", href: "/accreditation" }} />
      <PageHeader
        eyebrow="Internal Quality Assurance Cell"
        title="IQAC"
        description="Source information for the Internal Quality Assurance Cell, presented with its current verification limits."
      />

      <ContentSection id="iqac-status" title="Information awaiting confirmation">
        <p>
          The project audit lists an IQAC committee page, but its current contents and institutional scope were not verified. The same <code>iqac-committee.html</code> source URL is also labeled as NAAC in the existing site navigation.
        </p>
        <p>
          No current committee roster, coordinator, meeting record, activity, policy or report is reproduced here. These details require confirmation from the college before they can be presented as current institutional information.
        </p>
      </ContentSection>

      <ContentSection id="iqac-sources" title="Source pages recorded in the audit" tone="muted">
        <p>
          The links below point to pages listed in the project audit. Their inclusion records the source destinations; it does not verify their current contents or authorize publication of claims found there.
        </p>
        <ul className="academic-source-list">
          {accreditationSourcePageLinks.slice(0, 2).map((source) => (
            <li key={source.href}>
              <a href={source.href}>{source.label}</a>
              <p>{source.description}</p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <RelatedLinks
        links={[
          {
            label: "NAAC & Accreditation",
            href: "/accreditation/naac",
            description: "Review accreditation claims and supporting-source limitations.",
          },
          {
            label: "IQAC & Accreditation overview",
            href: "/accreditation",
            description: "Return to the section landing page.",
          },
        ]}
      />
    </main>
  );
}
