import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export type RelatedLink = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
};

export function Breadcrumbs({
  currentPage,
  parent,
}: {
  currentPage: string;
  parent?: { label: string; href: string };
}) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {parent ? (
          <li>
            <Link href={parent.href}>{parent.label}</Link>
          </li>
        ) : null}
        <li aria-current="page">{currentPage}</li>
      </ol>
    </nav>
  );
}

export function PageHeader({ eyebrow, title, description }: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="page-header">
      <div className="container page-header__content">
        {eyebrow ? <p className="page-header__eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="page-header__description">{description}</p> : null}
      </div>
    </header>
  );
}

export function ContentSection({
  id,
  title,
  children,
  tone = "default",
}: {
  id: string;
  title: string;
  children: ReactNode;
  tone?: "default" | "muted";
}) {
  return (
    <section className={`content-section content-section--${tone}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container content-section__inner">
        <h2 id={`${id}-title`} className="section-heading">{title}</h2>
        <div className="content-section__body">{children}</div>
      </div>
    </section>
  );
}

export function RelatedLinks({ title = "Related public information", links }: {
  title?: string;
  links: RelatedLink[];
}) {
  return (
    <ContentSection id="related-information" title={title} tone="muted">
      <ul className="related-links">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a href={link.href}>{link.label}<span aria-hidden="true"> ↗</span></a>
            ) : (
              <Link href={link.href}>{link.label}</Link>
            )}
            {link.description ? <p>{link.description}</p> : null}
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer closing">
      <div className="container site-footer__inner">
        <div className="site-footer__identity">
          <Image src="/images/k-h-m-w-logo.png" width={72} height={72} alt="" />
          <div>
            <p>K.H.M.W. College of Commerce</p>
            <Link href="/contact">Contact the college</Link>
          </div>
        </div>
        <nav className="site-footer__navigation" aria-label="Footer navigation">
          <div>
            <h2>College</h2>
            <Link href="/about">About the college</Link>
            <Link href="/faculty">Faculty</Link>
            <Link href="/campus-life">Campus life</Link>
            <Link href="/campus-life/events">Events &amp; activities</Link>
          </div>
          <div>
            <h2>Programmes</h2>
            <Link href="/academics">Academic programmes</Link>
            <Link href="/admissions">Admissions</Link>
          </div>
          <div>
            <h2>Student resources</h2>
            <Link href="/student-corner">Overview</Link>
            <Link href="/student-corner/notices">Notices &amp; circulars</Link>
            <Link href="/student-corner/examinations">Examinations</Link>
            <Link href="/student-corner/timetables">Timetables</Link>
            <Link href="/student-corner/results">Results</Link>
            <Link href="/student-corner/academic-calendar">Academic calendar</Link>
          </div>
          <div>
            <h2>Institutional</h2>
            <Link href="/accreditation/iqac">IQAC</Link>
            <Link href="/accreditation/naac">NAAC information</Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
