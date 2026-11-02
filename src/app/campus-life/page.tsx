import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader, RelatedLinks } from "@/components/public-page";
import { campusLifeSourcePages } from "@/content/campus-life";

export const metadata: Metadata = {
  title: "Campus Life | K.H.M.W. College",
  description:
    "Campus-related source pages identified in the project audit, with current facilities and student activities awaiting confirmation.",
};

export default function CampusLifePage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Campus Life" />
      <PageHeader
        eyebrow="Campus Life"
        title="Campus Life"
        description="Explore campus-related source pages identified by the project audit, with clear notes on what still needs confirmation."
      />

      <ContentSection id="campus-life-introduction" title="A source-led overview">
        <p>
          The reviewed project material identifies pages about infrastructure, events, clubs and student programmes on the existing college website. It does not establish a current, college-confirmed account of campus facilities or student life. This page links to those source destinations without presenting unverified details as current.
        </p>
      </ContentSection>

      <ContentSection id="campus-life-sources" title="Campus and student-activity sources" tone="muted">
        <p>
          Each destination below was listed in the project audit. A listed route does not establish that its contents remain available, current, complete or approved for reuse.
        </p>
        <ul className="academic-source-list">
          {campusLifeSourcePages.map((source) => (
            <li key={source.href}>
              <a href={source.href}>{source.label}</a>
              <p>{source.description}</p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection id="campus-information-needs" title="Information awaiting confirmation">
        <p>
          Before this redesign presents a campus guide, the college should confirm current facilities and access information, active clubs and programmes, event details, and any student achievements intended for publication. Photographs also need verified context, location or subject mapping, and permission. No archive imagery or unverified testimonials are used here.
        </p>
      </ContentSection>

      <RelatedLinks
        links={[
          {
            label: "Student Corner",
            href: "/student-corner",
            description: "Source-linked student resources, with their own verification notes.",
          },
          {
            label: "Contact",
            href: "/contact",
            description: "Contact sources and the details awaiting college confirmation.",
          },
        ]}
      />
    </main>
  );
}
