import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";

export const metadata: Metadata = {
  title: "IQAC",
  description: "IQAC material identified in the archive and information awaiting institutional confirmation.",
};

export default function IqacPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="IQAC" parent={{ label: "IQAC & Accreditation", href: "/accreditation" }} />
      <PageHeader
        eyebrow="Internal Quality Assurance Cell"
        title="IQAC"
        description="Recovered quality-assurance material and information required for a complete institutional record."
      />
      <ContentSection id="iqac-records" title="Material in the recovered collection" tone="muted">
        <p>
          The archive contains a PDF named <code>minutes-of-meeting.pdf</code> in its NAAC directory. Its meeting date, participants, decisions and relationship to the current IQAC have not been verified, so it is not presented as a current activity record.
        </p>
        <p>
          The audit also recorded an IQAC committee page. Its contents were not included as source HTML in the migration archive.
        </p>
      </ContentSection>
      <ContentSection id="iqac-confirmation" title="Information awaiting confirmation">
        <ul className="editorial-list">
          <li>Current IQAC mandate and institutional scope.</li>
          <li>Committee members, coordinator and effective dates.</li>
          <li>Current quality initiatives, meeting minutes and action reports.</li>
          <li>Policies and reports approved for public publication.</li>
        </ul>
        <p className="source-note">
          No coordinator, committee roster, activity, report or date is inferred from filenames or the presence of a document.
        </p>
      </ContentSection>
    </main>
  );
}
