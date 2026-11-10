import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LightboxImage } from "@/components/image-lightbox";
import { eventSourceGroups, homepageFacilityHighlights } from "@/content/campus-life";
import { programmes } from "@/content/academics";

export const metadata: Metadata = {
  title: "K.H.M.W. College",
  description: "College information, academic resources and student services.",
};

const destinations = [
  {
    href: "/academics",
    title: "Academics",
    description: "Programme names and available academic information.",
  },
  {
    href: "/admissions",
    title: "Admissions",
    description: "Published admission information and details awaiting confirmation.",
  },
  {
    href: "/student-corner/examinations",
    title: "Examinations",
    description: "Archived examination timetables and circulars.",
  },
  {
    href: "/student-corner",
    title: "Student Corner",
    description: "Notices, timetables and student resources.",
  },
];

export default function HomePage() {
  return (
    <main className="site-main" id="main-content">
      <section className="home-intro" aria-labelledby="home-title">
        <div className="container home-intro__grid">
          <div className="home-intro__copy">
            <p className="page-header__eyebrow">K.H.M.W. College</p>
            <h1 id="home-title">College information, gathered in one place.</h1>
            <p className="home-intro__description">
              Explore academic information, campus resources and student documents collected from the college’s published materials.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" href="/academics">Explore academics</Link>
              <Link className="button button--secondary" href="/contact">Contact Us</Link>
            </div>
          </div>
          <figure className="home-intro__image">
            <LightboxImage
              src="/images/khmw-college.jpg"
              width={500}
              height={363}
              preload
              alt="Exterior of the college building"
              sizes="(max-width: 62rem) 100vw, 50vw"
            />
            <figcaption>College building, from the recovered college image collection.</figcaption>
          </figure>
        </div>
      </section>

      <section className="home-destinations" aria-labelledby="home-destinations-title">
        <div className="container">
          <div className="home-destinations__heading">
            <p className="page-header__eyebrow">Quick access</p>
            <h2 id="home-destinations-title">Find what you need</h2>
          </div>
          <ul className="home-destinations__list">
            {destinations.map((destination) => (
              <li key={destination.href}>
                <Link href={destination.href}>
                  <span className="home-destinations__title">{destination.title}</span>
                  <span>{destination.description}</span>
                  <span className="home-destinations__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-programmes content-section content-section--muted" aria-labelledby="home-programmes-title">
        <div className="container">
          <p className="page-header__eyebrow">Academics</p>
          <h2 className="section-heading" id="home-programmes-title">Programme information</h2>
          <p className="home-section-intro">
            These programme names are recorded in the recovered source pages. Current availability and admission details should be confirmed with the college.
          </p>
          <ul className="programme-links">
            {programmes.map((programme) => (
              <li key={programme.slug}>
                <Link href={`/academics/${programme.slug}`}>
                  <span>{programme.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-facilities content-section" aria-labelledby="home-facilities-title">
        <div className="container">
          <p className="page-header__eyebrow">Campus life</p>
          <h2 className="section-heading" id="home-facilities-title">Campus and facilities</h2>
          <p className="home-section-intro">
            Selected facility photographs from the recovered image collection. Present-day availability and details have not been independently confirmed.
          </p>
          <div className="home-facilities__grid">
            {homepageFacilityHighlights.map((facility) => (
              <Link className="home-facility-card" href="/campus-life/facilities" key={facility.name}>
                {facility.image && facility.alt && facility.width && facility.height ? (
                  <Image
                    src={facility.image}
                    alt={facility.alt}
                    width={facility.width}
                    height={facility.height}
                    sizes="(max-width: 48rem) 100vw, 30vw"
                  />
                ) : null}
                <span>{facility.name}</span>
                <span className="home-facility-card__more">View facilities <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
          <p className="home-section-link"><Link href="/campus-life/facilities">See all facility information</Link></p>
        </div>
      </section>

      <section className="home-events content-section content-section--muted" aria-labelledby="home-events-title">
        <div className="container">
          <p className="page-header__eyebrow">Activities</p>
          <h2 className="section-heading" id="home-events-title">Events and student activities</h2>
          <p className="home-section-intro">
            The college has approved the recovered photo collections for public reuse. Folder labels and file order are preserved; exact dates, descriptions and identities are not inferred.
          </p>
          <ul className="home-event-list">
            {eventSourceGroups.map((event) => (
              <li key={event.title}>{event.title}</li>
            ))}
          </ul>
          <p className="home-section-link"><Link href="/campus-life/events">Browse event and activity records</Link></p>
        </div>
      </section>

      <section className="home-institutional content-section" aria-labelledby="home-institutional-title">
        <div className="container home-institutional__grid">
          <div>
            <p className="page-header__eyebrow">Institutional information</p>
            <h2 className="section-heading" id="home-institutional-title">Quality and accreditation records</h2>
            <p>
              This archived NAAC graphic is reproduced from the recovered image collection. A recovered certificate attributes a B++ mark to K.H.M.W. Night College of Commerce; its scope for this website and permission to reuse the mark remain unconfirmed. This is not a statement of current accreditation status.
            </p>
          </div>
          <figure className="home-institutional__mark">
            <Image
              src="/images/branding/b++naac.png"
              width={275}
              height={275}
              alt="Archived B++ NAAC graphic from the original college website; current institutional applicability is unconfirmed"
              sizes="(max-width: 62rem) 40vw, 14rem"
            />
            <figcaption>Archived image; pending institutional confirmation and publication-permission review.</figcaption>
          </figure>
          <div className="home-institutional__links">
            <Link href="/accreditation">IQAC &amp; accreditation information <span aria-hidden="true">→</span></Link>
            <Link href="/about">About the College <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
