import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { programmes } from "@/content/academics";

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

  if (!programme) notFound();

  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage={programme.label} parent={{ label: "Academics", href: "/academics" }} />
      <PageHeader
        eyebrow="Programme source record"
        title={programme.label}
        description="This programme title was recorded in the source-site course inventory; current availability and detailed course information are not confirmed."
      />
      <ContentSection id="programme-information" title="Available source information" tone="muted">
        <p>
          The audit found a course page under this title and observed semester-wise course/credit tables and syllabus links on the source course pages. The migration archive does not contain those original page files or syllabus documents, so their contents cannot be reproduced from the materials available here.
        </p>
      </ContentSection>
      <ContentSection id="programme-confirmation" title="Details awaiting confirmation">
        <p>
          The college must confirm whether this programme is currently offered and provide approved details such as its full official title, structure, eligibility, duration, affiliation and syllabus before those claims can be published.
        </p>
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
