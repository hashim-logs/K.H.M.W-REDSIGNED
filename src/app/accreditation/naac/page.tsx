import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";
import {
  accreditationSourcePageLinks,
  accreditationSourcePages,
  unavailableDvvDocuments,
} from "@/content/accreditation";

export const metadata: Metadata = {
  title: "NAAC & Accreditation | K.H.M.W. College",
  description:
    "NAAC and accreditation source records, including unverified claims and unavailable documents, with no current status inferred.",
};

export default function NaacPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="NAAC & Accreditation" parent={{ label: "IQAC & Accreditation", href: "/accreditation" }} />
      <PageHeader
        eyebrow="Accreditation source record"
        title="NAAC & Accreditation"
        description="The reviewed evidence does not establish a current accreditation status. Source links and known limitations are recorded below."
      />

      <ContentSection id="accreditation-claim" title="Accreditation claim">
        <p>
          The project audit reports that a public accreditation claim was observed on the existing site, but it does not preserve the exact wording or establish an accreditation cycle, grade, score, dates or current status. College confirmation, supporting evidence and publication permission are required before stating an accreditation outcome.
        </p>
        <p className="source-note">
          The same existing page, <code>iqac-committee.html</code>, is labeled for both NAAC and IQAC in the audited navigation. This source-label overlap does not verify either claim.
        </p>
      </ContentSection>

      <ContentSection id="historical-material" title="Historical material">
        <p>
          The reviewed records do not establish a dated accreditation outcome as historical. The certificate’s contents and validity period have not been checked, so no grade or cycle is presented as current or historical.
        </p>
      </ContentSection>

      <ContentSection id="certificate" title="Certificate and institutional mark" tone="muted">
        <p>
          The asset inventory records a source link named <code>naac-certificate.pdf</code>, but its URL was not individually checked. The document contents, issuing authority, validity period and permission to republish are unverified. Do not treat it as evidence of current accreditation without review.
        </p>
        <p>
          <a href={accreditationSourcePages.certificate}>
            Open the source-listed certificate PDF (contents and validity not checked)
          </a>
        </p>
        <p>
          The source site also references an image named <code>b++naac.png</code>. Its applicable status and permission to use the mark in this redesign are not established; no mark or logo is displayed here.
        </p>
      </ContentSection>

      <ContentSection id="dvv-evidence" title="DVV evidence and availability">
        <p>
          The register records three reported 404s whose underlying archive report and observation dates could not be located. The asset inventory explicitly says those URLs were not individually checked, so it is not evidence for the reported responses.
        </p>
        <ul className="academic-source-list">
          {unavailableDvvDocuments.map((document) => (
            <li key={document.path}>
              <strong><code>{document.filename}</code></strong>
              <p><code>{document.path}</code> — {document.status}. {document.note}</p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection id="related-sources" title="Related source pages" tone="muted">
        <p>
          These destinations are listed in the project audit. Their current contents and any documents linked from them have not been independently verified for this redesign.
        </p>
        <ul className="academic-source-list">
          {accreditationSourcePageLinks.slice(2).map((source) => (
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
            label: "IQAC",
            href: "/accreditation/iqac",
            description: "Review IQAC source information and confirmation needs.",
          },
          {
            label: "IQAC & Accreditation overview",
            href: "/accreditation",
            description: "Return to the section landing page.",
          },
          {
            label: "IQAC committee source page",
            href: accreditationSourcePageLinks[0].href,
            external: true,
            description: "Source destination listed in the audit; current contents are unverified.",
          },
        ]}
      />
    </main>
  );
}
