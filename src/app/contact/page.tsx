import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { contactSourceUrls } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact | K.H.M.W. College",
  description:
    "Contact source pages for K.H.M.W. College, with conflicting details and confirmation needs clearly identified.",
};

export default function ContactPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Contact" />
      <PageHeader
        eyebrow="Contact"
        title="Contact information"
        description="Review the college’s published contact sources and the details that still need confirmation."
      />

      <ContentSection id="contact-details" title="Contact details">
        <p>
          The reviewed homepage and older Contact Us page publish different telephone numbers and email addresses. The college has not confirmed which details are current, so this preview does not present either set as canonical or reproduce them as contact actions.
        </p>
        <p className="source-note">
          The homepage publishes an address, but its currentness and map location also need confirmation. The audit did not identify an address conflict.
        </p>
      </ContentSection>

      <ContentSection id="contact-sources" title="Check the published sources" tone="muted">
        <p>
          These links open the existing college pages. Their contents are source information, not confirmation that the listed contact details are current.
        </p>
        <ul className="editorial-list">
          <li>
            <a href={contactSourceUrls.homepage}>Open the existing college homepage</a>
          </li>
          <li>
            <a href={contactSourceUrls.contactPage}>Open the existing Contact Us page</a>
          </li>
        </ul>
      </ContentSection>

      <ContentSection id="contact-form" title="Contact form">
        <p>
          The audited Contact Us page includes a form, but its inspected markup did not establish a working submission flow. This preview does not collect or send personal information.
        </p>
      </ContentSection>
    </main>
  );
}
