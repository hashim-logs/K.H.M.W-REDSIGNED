import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { unavailableDvvDocuments } from "@/content/accreditation";

export const metadata: Metadata = {
  title: "NAAC & Accreditation",
  description: "Recovered NAAC document labels, historical evidence and confirmation requirements.",
};

export default function NaacPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="NAAC & Accreditation" parent={{ label: "IQAC & Accreditation", href: "/accreditation" }} />
      <PageHeader
        eyebrow="Accreditation records"
        title="NAAC & Accreditation"
        description="Recovered document information, with historical context and limits on what it establishes."
      />
      <ContentSection id="status" title="Current accreditation status" tone="muted">
        <p>
          A recovered NAAC certificate names K.H.M.W. Night College of Commerce and records a B++ grade with CGPA 2.84. It is dated 7 June 2024 and states validity through 6 June 2029. This is what the archived certificate says; the college has not confirmed that this scope matches the public identity used on this website, and permission to republish the certificate or mark remains unconfirmed. The B++ mark is therefore not displayed in the header.
        </p>
      </ContentSection>
      <ContentSection id="recovered-metrics" title="Recovered DVV document labels">
        <p>
          Two recovered PDFs identify themselves as NAAC DVV clarifications for metrics 2.1.1 (“Enrolment percentage”) and 2.1.2 (seats filled against reserved categories). Their text refers to an assessment period covering 2017–18 through 2021–22. This describes the files’ labels and historical period only; it is not a current programme, admissions or accreditation statement.
        </p>
        <p>
          The archive also contains a metric 4.4.1 index, summary and annual supporting files for 2017–18 through 2021–22. The summary document reports a historical average of 44.68% for maintenance expenditure. The figure is attributed to that source document and has not been independently validated.
        </p>
        <p className="source-note">
          Recovered files are not treated as exact replacements for similarly named unavailable source URLs. The original documents are not offered for download pending content, privacy and publication-permission review.
        </p>
      </ContentSection>
      <ContentSection id="unavailable-dvv" title="Unavailable source documents" tone="muted">
        <p>
          The recovery report distinguishes these unavailable URLs from other files recovered for nearby metrics. No replacement is asserted.
        </p>
        <ul className="academic-source-list">
          {unavailableDvvDocuments.map((document) => (
            <li key={document.path}>
              <strong><code>{document.filename}</code></strong>
              <p><code>{document.path}</code> — {document.note}</p>
            </li>
          ))}
        </ul>
      </ContentSection>
      <ContentSection id="publication-review" title="Before publishing accreditation documents">
        <p>
          The archive contains a certificate PDF, criterion-wise evidence, DVV files, SSR supporting documents, meeting minutes, research-publication files and stakeholder-feedback evidence. The certificate’s issuing authority, grade and validity have not been verified. Each document requires classification, date/content review and publication approval before it can be made available to visitors.
        </p>
      </ContentSection>
    </main>
  );
}
