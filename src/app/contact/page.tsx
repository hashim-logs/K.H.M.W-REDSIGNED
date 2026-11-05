import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { ContactForm } from "@/components/contact-form";
import { contactSourceRecords } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Published contact details recorded in the source audit, with unresolved conflicts identified.",
};

export default function ContactPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Contact" />
      <PageHeader
        eyebrow="Contact"
        title="Contact information"
        description="Contact values recorded from the college’s published pages, shown with their unresolved source differences."
      />
      <ContentSection id="address" title="Address displayed on the homepage" tone="muted">
        <address className="contact-address">
          {contactSourceRecords.address}
        </address>
        <p className="source-note">
          This address was observed on the homepage during the source audit. The college has not confirmed the current address or map location for this site.
        </p>
      </ContentSection>
      <ContentSection id="contact-values" title="Telephone and email values observed">
        <div className="contact-records">
          <section aria-labelledby="homepage-contact-title">
            <h3 id="homepage-contact-title">Homepage values</h3>
            <ul className="editorial-list">
              {contactSourceRecords.homepage.map((value) => <li key={value}>{value}</li>)}
            </ul>
          </section>
          <section aria-labelledby="older-contact-title">
            <h3 id="older-contact-title">Older Contact Us page values</h3>
            <ul className="editorial-list">
              {contactSourceRecords.olderContactPage.map((value) => <li key={value}>{value}</li>)}
            </ul>
          </section>
        </div>
        <p className="source-note">
          These values conflict across source pages and are reproduced only as an audit of published material. None is marked as a confirmed current contact channel.
        </p>
      </ContentSection>
      <ContentSection id="contact-form" title="Enquiries" tone="muted">
        <p>
          Send a message for staff review. Online submissions are enabled only when the college configures a data-retention period. The form stores messages in the website database; it does not send email.
        </p>
        <ContactForm />
      </ContentSection>
    </main>
  );
}
