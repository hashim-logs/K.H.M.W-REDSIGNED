import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { eventSourceGroups, studentActivitySourcePages } from "@/content/campus-life";

export const metadata: Metadata = {
  title: "Events & Activities | Campus Life",
  description: "Event and student activity labels found in the recovered college materials.",
};

export default function CampusEventsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Events & activities" parent={{ label: "Campus Life", href: "/campus-life" }} />
      <PageHeader
        eyebrow="Campus Life"
        title="Events and student activities"
        description="Names recorded in the recovered event-image collection and source audit."
      />
      <ContentSection id="event-records" title="Event folders in the archive" tone="muted">
        <p>
          These activity names come from original image-folder names. The academic year is part of each folder label; exact event dates, descriptions, outcomes and current status were not recovered and are not inferred.
        </p>
        <ul className="event-list">
          {eventSourceGroups.map((event) => (
            <li key={event.title}>
              <h3>{event.title}</h3>
              <p>{event.period}</p>
            </li>
          ))}
        </ul>
      </ContentSection>
      <ContentSection id="activity-pages" title="Student activity pages recorded in the source">
        <p>
          The bounded source audit recorded pages with these labels. Their current descriptions, schedules, membership and participation information are not included in the recovered archive.
        </p>
        <ul className="editorial-list">
          {studentActivitySourcePages.map((activity) => <li key={activity}>{activity}</li>)}
        </ul>
        <p className="source-note">
          No event photographs are published here until their individual context, captions and publication approval are reviewed.
        </p>
      </ContentSection>
    </main>
  );
}
