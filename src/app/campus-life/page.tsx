import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Campus Life",
  description: "Recovered campus facilities and student activity sources, with source limitations explained.",
};

export default function CampusLifePage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Campus Life" />
      <PageHeader
        eyebrow="Campus Life"
        title="Campus Life"
        description="Explore facility photographs and activity labels from the recovered college materials."
      />
      <ContentSection id="campus-overview" title="Campus and facilities" tone="muted">
        <p>
          The recovered image collection contains a college-building photograph and facility photographs labeled for a computer lab and gym. These show the source material available for this site; they do not establish current operation, access, equipment or student availability.
        </p>
        <p><Link href="/campus-life/facilities">View facility photographs</Link></p>
      </ContentSection>
      <ContentSection id="student-activities" title="Events and student activities">
        <p>
          The archive includes event-photo folders for named activities, and the source audit records pages for clubs and NSS. Event dates, descriptions, participation details and current activity status were not recovered as page text.
        </p>
        <p><Link href="/campus-life/events">Browse recovered event and activity records</Link></p>
      </ContentSection>
    </main>
  );
}
