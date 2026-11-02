import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { historicalAcademicCalendar } from "@/content/student-corner";

export const metadata: Metadata = {
  title: "Academic Calendar | Student Corner",
  description: "Historical academic calendar source identified as 2018–19; no current calendar is verified.",
};

export default function StudentAcademicCalendarPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Academic calendar" parent={{ label: "Student Corner", href: "/student-corner" }} />
      <PageHeader
        eyebrow="Student Corner"
        title="Academic calendar"
        description="The calendar identified in the source audit is historical, not a current academic calendar."
      />
      <ContentSection id="historical-calendar" title={historicalAcademicCalendar.title} tone="muted">
        <p>
          The existing calendar page displays 2018–19. Its date is preserved here so it cannot be mistaken for the current calendar. No current calendar or verified direct PDF download was identified in the audit and asset inventory.
        </p>
        <p className="source-note">
          The recovered archive did not include a calendar PDF or a copy of the source page. A current academic calendar has not been supplied.
        </p>
      </ContentSection>
    </main>
  );
}
