import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { programmes } from "@/content/academics";
import { programmeRecords } from "@/content/academic-curricula";

type ProgrammePageProps = {
  params: Promise<{ program: string }>;
};

function findProgramme(slug: string) {
  return programmes.find((programme) => programme.slug === slug);
}

export async function generateStaticParams() {
  return programmes.map(({ slug }) => ({ program: slug }));
}

export async function generateMetadata({ params }: ProgrammePageProps): Promise<Metadata> {
  const { program } = await params;
  const programme = findProgramme(program);

  return {
    title: programme ? `${programme.label} programme information` : "Programme information",
    description: "Programme source information and content awaiting confirmation.",
  };
}

export default async function ProgrammePage({ params }: ProgrammePageProps) {
  const { program } = await params;
  const programme = findProgramme(program);
  const record = programmeRecords[program];

  if (!programme || !record) notFound();

  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage={programme.label} parent={{ label: "Academics", href: "/academics" }} />
      <PageHeader
        eyebrow="Programme source record"
        title={programme.label}
        description={`The original course page labels this programme “${record.pageLabel}”. The information below is transcribed from that page and is not confirmation of current availability or curriculum.`}
      />
      {record.semesters.length ? record.semesters.map((semester) => (
        <ContentSection
          id={`programme-${semester.label.toLowerCase().replaceAll(" ", "-")}`}
          key={semester.label}
          title={semester.label}
          tone="muted"
        >
          <ul className="editorial-list">
            {semester.courses.map((course) => <li key={course}>{course}</li>)}
          </ul>
          {semester.note ? <p className="source-note">{semester.note}</p> : null}
        </ContentSection>
      )) : (
        <ContentSection id="programme-information" title="Available source information" tone="muted">
          <p>
            The inspected course page contains the programme label but no curriculum table or course description to reproduce.
          </p>
        </ContentSection>
      )}
      <ContentSection id="programme-source" title="Source and remaining details">
        <p>
          <a href={record.sourceUrl} target="_blank" rel="noreferrer">
            Open the original {record.pageLabel} course page
          </a>
        </p>
        <ul className="editorial-list">
          {record.notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
        <p className="source-note">
          The broader programme list also conflicts with course choices observed in the source enquiry form. See the <Link href="/academics">Academics overview</Link> for that discrepancy.
        </p>
      </ContentSection>
      <ContentSection id="student-resources" title="Student resources">
        <p>
          Archived examination timetables are organized by the source’s Commerce and Management / Science and Technology groups, not by confirmed programme affiliation.
        </p>
        <p><Link href="/student-corner/timetables">Browse archived timetable PDFs</Link></p>
      </ContentSection>
    </main>
  );
}
