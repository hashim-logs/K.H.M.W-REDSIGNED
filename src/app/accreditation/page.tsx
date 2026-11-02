import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { accreditationArchiveSummary } from "@/content/accreditation";

export const metadata: Metadata = {
  title: "IQAC & Accreditation",
  description: "Recovered institutional quality and accreditation material with verification and publication limits.",
};

export default function AccreditationPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="IQAC & Accreditation" />
      <PageHeader
        eyebrow="Governance and quality"
        title="IQAC & Accreditation"
        description="A locally maintained guide to recovered quality-assurance and accreditation records."
      />
      <ContentSection id="archive-overview" title="Recovered institutional records" tone="muted">
        <p>
          The migration archive contains {accreditationArchiveSummary.pdfCount} PDFs filed under its NAAC directory. The collection includes a certificate file, criterion-wise and DVV evidence, SSR supporting material, meeting minutes, research-publication files and stakeholder-feedback evidence.
        </p>
        <p>
          These directory labels identify source files, not their current validity, completeness, institutional scope or permission for public redistribution. The documents are not offered for download until those checks are complete.
        </p>
        <ul className="editorial-list">
          {accreditationArchiveSummary.categories.map((category) => <li key={category}>{category}</li>)}
        </ul>
      </ContentSection>
      <ContentSection id="iqac" title="Internal Quality Assurance Cell">
        <p>
          The source audit recorded an IQAC committee page, while the archive contains a file named “minutes-of-meeting.pdf.” The current committee, coordinator, terms of reference, activities and date/content of those minutes have not been verified.
        </p>
        <p><Link href="/accreditation/iqac">Review IQAC information and required confirmations</Link></p>
      </ContentSection>
      <ContentSection id="naac" title="NAAC and accreditation" tone="muted">
        <p>
          The audit observed a public accreditation claim but did not preserve its exact wording or establish a cycle, grade, score, validity period or current status. No accreditation mark is displayed.
        </p>
        <p><Link href="/accreditation/naac">Review recovered NAAC evidence and limitations</Link></p>
      </ContentSection>
    </main>
  );
}
