import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { observedAdmissionsNoticeLabels } from "@/content/admissions";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Admissions source material, observed notice labels and details that remain unconfirmed.",
};

export default function AdmissionsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Admissions" />
      <PageHeader
        eyebrow="Admissions"
        title="Admissions information"
        description="Published admission labels are recorded here; current requirements and application details have not been established."
      />

      <ContentSection id="admission-information" title="What the recovered material establishes" tone="muted">
        <p>
          The source audit observed admission-related headings and an enquiry form on the college homepage. The recovered migration archive contains no prospectus, application form, admission-instructions document or copy of the admissions page.
        </p>
        <p>
          The old prospectus page’s “Click here to Form” destination was recorded as a degree-college page, not a confirmed application form. The enquiry form posted to a server endpoint, but delivery, recipient, storage and privacy behavior were not verified.
        </p>
      </ContentSection>

      <ContentSection id="notice-labels" title="Admission notice labels observed in the source">
        <p>
          These headings were recorded during the source audit. They are reproduced as historical source labels—not as evidence that an intake is open, a deadline is valid or an application link works.
        </p>
        <ul className="editorial-list">
          {observedAdmissionsNoticeLabels.map((label) => <li key={label}>{label}</li>)}
        </ul>
      </ContentSection>

      <ContentSection id="requirements" title="Requirements and process" tone="muted">
        <div className="statement-grid">
          <article className="statement">
            <h3>Eligibility</h3>
            <p>Current eligibility criteria were not established in the recovered materials.</p>
          </article>
          <article className="statement">
            <h3>Application process</h3>
            <p>No complete, verified application process or working application destination was recovered.</p>
          </article>
          <article className="statement">
            <h3>Required documents and dates</h3>
            <p>No approved checklist or current deadline was available in the archive.</p>
          </article>
        </div>
        <p className="source-note">
          The college must provide the current prospectus, approved programme list, eligibility, application instructions, dates and operational contact before this information can be completed.
        </p>
      </ContentSection>

      <ContentSection id="programme-information" title="Programme information">
        <p>
          Programme names in the source pages differ from the homepage enquiry-form choices. The current official list remains unresolved.
        </p>
        <p><Link href="/academics">Review the programme names and source discrepancy</Link></p>
      </ContentSection>
    </main>
  );
}
