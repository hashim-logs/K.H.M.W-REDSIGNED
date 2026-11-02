import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";
import { admissionsSourceUrls, observedAdmissionsNoticeLabels } from "@/content/admissions";

export const metadata: Metadata = {
  title: "Admissions | K.H.M.W. College",
  description:
    "Admissions source links and information for K.H.M.W. College, with unverified application details clearly identified.",
};

export default function AdmissionsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Admissions" />
      <PageHeader
        eyebrow="Admissions"
        title="Admissions information"
        description="Find published admissions links and see which details still need confirmation."
      />

      <ContentSection id="admissions-introduction" title="Admissions overview">
        <p>
          This page links to admissions information published on the existing college website. The reviewed sources contain incomplete and conflicting details, so this preview does not state that admissions are open or provide application requirements.
        </p>
      </ContentSection>

      <ContentSection id="available-programmes" title="Programme information" tone="muted">
        <p>
          The programme list on the existing course pages differs from the options in its enquiry form. Confirm the current programme list with the college before making an application decision.
        </p>
        <p><Link href="/academics">Review the programme sources and discrepancy on the Academics page</Link></p>
      </ContentSection>

      <ContentSection id="admission-requirements" title="Eligibility, process and required documents">
        <div className="statement-grid">
          <article className="statement">
            <h3>Eligibility</h3>
            <p>No verified eligibility criteria were established in the reviewed project sources.</p>
          </article>
          <article className="statement">
            <h3>Admission process</h3>
            <p>No complete, verified application process was established. The enquiry form is not presented as an application system.</p>
          </article>
          <article className="statement">
            <h3>Required documents</h3>
            <p>No verified required-document checklist was found in the reviewed sources.</p>
          </article>
        </div>
      </ContentSection>

      <ContentSection id="admission-notices" title="Published notice labels" tone="muted">
        <p>
          The audit recorded these headings on the existing homepage. They are source labels only, not confirmation of a current admission cycle. The audit also found some admission banner links with empty destinations; no verified deadline was recorded.
        </p>
        <ul className="editorial-list">
          {observedAdmissionsNoticeLabels.map((label) => <li key={label}>{label}</li>)}
        </ul>
        <p><a href={admissionsSourceUrls.homepage}>Check the existing college homepage for published notices</a></p>
      </ContentSection>

      <ContentSection id="prospectus-and-forms" title="Prospectus and forms">
        <p>
          The existing site has a Prospectus page, but the audited “Click here to Form” link leads to <code>degree-college.html</code>. The audit did not identify a prospectus PDF or confirm that this destination is an application form.
        </p>
        <p><a href={admissionsSourceUrls.prospectus}>View the Prospectus page on the existing college website</a></p>
      </ContentSection>

      <ContentSection id="enquiry-access" title="Admission enquiry access" tone="muted">
        <p>
          The existing homepage contains an admission enquiry form. Its page script sends the form data to <code>submit.php</code> and displays a response message when the endpoint returns the expected response. The audit did not verify successful delivery or storage, and no form was submitted for this review.
        </p>
        <p>
          This is described only as an existing enquiry form; it is not a verified application workflow. The redesign does not collect or send any information.
        </p>
        <p><a href={admissionsSourceUrls.homepage}>Open the existing college homepage to view its enquiry form</a></p>
      </ContentSection>

      <ContentSection id="admissions-contact" title="Admission queries">
        <p>
          No canonical admission-specific contact was verified. The audit records conflicting contact details across the existing site, so none are reproduced here.
        </p>
        <p><a href={admissionsSourceUrls.contact}>View the contact page on the existing college website</a></p>
      </ContentSection>

      <RelatedLinks
        title="Related admissions information"
        links={[
          { label: "Academic programmes", href: "/academics", description: "Source-page programme names and their unresolved discrepancy." },
          { label: "Prospectus page", href: admissionsSourceUrls.prospectus, external: true, description: "Existing page; its form destination is unclear." },
          { label: "Existing enquiry form", href: admissionsSourceUrls.homepage, external: true, description: "Submission delivery and storage were not verified." },
          { label: "Contact page", href: admissionsSourceUrls.contact, external: true, description: "Contact details on the existing site require confirmation." },
        ]}
      />
    </main>
  );
}
