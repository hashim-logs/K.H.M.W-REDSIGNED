import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "The college’s published vision, mission and goals, presented with the limits of the recovered source material.",
};

export default function AboutPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="About" />
      <PageHeader
        eyebrow="About the college"
        title="K.H.M.W. College"
        description="Institutional statements and background information preserved from the college’s published materials."
      />

      <ContentSection id="introduction" title="About this institution">
        <p>
          The recovered source material uses both “K.H.M.W. College” and “The K.H.M.W Night College of Commerce.” This site uses K.H.M.W. College as its working label while the official public name and institutional scope are awaiting confirmation.
        </p>
        <p className="source-note">
          The source archive contains asset and document collections, but not the original HTML page files. The original college audit records the institution’s published vision, mission and goals; their text is summarized below, and should be confirmed before being presented as current policy.
        </p>
      </ContentSection>

      <ContentSection id="vision-and-mission" title="Vision and mission" tone="muted">
        <div className="statement-grid">
          <article className="statement">
            <h3>Vision</h3>
            <p>
              The published vision describes an inclusive and sustainable learning environment that supports students’ potential, with integrity, innovation, creativity and quality among its guiding values.
            </p>
          </article>
          <article className="statement">
            <h3>Mission</h3>
            <p>
              The published mission describes accessible, affordable and high-quality education; programmes and services supporting student achievement and lifelong learning; and academic, cultural and civic development.
            </p>
          </article>
        </div>
        <p className="source-note">
          These summaries reflect the vision and mission page recorded in the source audit. The original wording and its intended institutional scope require confirmation.
        </p>
      </ContentSection>

      <ContentSection id="goals" title="Published goals">
        <p>The source page presents goals that include:</p>
        <ul className="editorial-list">
          <li>Making quality education accessible and affordable.</li>
          <li>Pursuing excellence and a culture of openness, sharing and commitment.</li>
          <li>Supporting students with skilled and caring staff.</li>
          <li>Enriching lives and contributing to society.</li>
        </ul>
        <p className="source-note">
          These are source-attributed summaries, not a confirmed current strategic plan.
        </p>
      </ContentSection>

      <ContentSection id="background" title="College background" tone="muted">
        <p>
          A historical account, founding date and leadership message were not available in the recovered materials reviewed for this migration. No history or quotation has been inferred.
        </p>
        <p>
          <Link href="/campus-life/facilities">Explore facility photographs from the college’s recovered image collection</Link>
        </p>
      </ContentSection>
    </main>
  );
}
