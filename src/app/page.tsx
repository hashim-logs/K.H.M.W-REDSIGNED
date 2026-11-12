import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LightboxImage } from "@/components/image-lightbox";
import { EventPhotoMarquee } from "@/components/event-photo-marquee";
import { eventSourceGroups, homepageEventPhotos } from "@/content/campus-life";
import { programmes } from "@/content/academics";

const quickAccessLinks = [
  { label: "Admissions", description: "Admission information and enquiry", href: "/admissions" },
  { label: "Academic programmes", description: "Programme pages and source information", href: "/academics" },
  { label: "Student portal", description: "Open the Student Corner resource directory", href: "/student-corner" },
  { label: "Notices & circulars", description: "Published student notices", href: "/student-corner/notices" },
  { label: "Exam timetables", description: "Browse timetable documents", href: "/student-corner/timetables" },
  { label: "Events & activities", description: "College event photo galleries", href: "/campus-life/events" },
];

export const metadata: Metadata = {
  title: "K.H.M.W. College of Commerce",
  description: "K.H.M.W. College of Commerce in Mumbai, affiliated to the University of Mumbai.",
};

export default function HomePage() {
  return (
    <main className="site-main" id="main-content">
      <section className="home-intro home-intro--image" aria-labelledby="home-title" data-enter>
        <div className="home-intro__backdrop" aria-hidden="true">
          <Image
            src="/images/khmw-college.jpg"
            fill
            priority
            sizes="100vw"
            alt=""
            className="home-intro__background-image"
          />
        </div>
        <div className="container home-intro__grid">
          <div className="home-intro__copy">
            <p className="page-header__eyebrow">Mumbai · University of Mumbai affiliated · NAAC B++</p>
            <h1 id="home-title">K.H.M.W. College of Commerce</h1>
            <p className="home-intro__description">
              An affiliated college of the University of Mumbai, accredited by NAAC with a B++ grade.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" href="/admissions">View admissions</Link>
              <Link className="button button--secondary" href="/academics">Browse programmes</Link>
            </div>
            <div className="home-intro__placement-note">
              <span>Placement partners</span>
              <Link href="/contact">Contact for current information <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
        <Link className="home-intro__scroll" href="#home-audiences">
          <span>Explore the college</span><span aria-hidden="true">↓</span>
        </Link>
      </section>

      <section className="home-quick-access content-section" id="home-audiences" aria-labelledby="home-audiences-title">
        <div className="container">
          <div className="home-audiences__heading">
            <p className="page-header__eyebrow">Quick access</p>
            <h2 className="section-heading" id="home-audiences-title">Student portal and college resources</h2>
          </div>
          <ul className="home-quick-access__grid">
            {quickAccessLinks.map((item, index) => (
              <li key={item.href}>
                <Link className="home-quick-link" href={item.href}>
                  <span className="home-quick-link__index">0{index + 1}</span>
                  <span className="home-quick-link__title">{item.label}</span>
                  <span className="home-quick-link__description">{item.description}</span>
                  <span className="home-quick-link__arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-programmes content-section content-section--muted" aria-labelledby="home-programmes-title">
        <div className="container home-programmes__layout">
          <div className="home-programmes__intro">
            <p className="page-header__eyebrow">Academics</p>
            <h2 className="section-heading" id="home-programmes-title">Academic programmes</h2>
            <p className="home-section-intro">
              View the published programme pages and their academic information. Contact the college for current programme details.
            </p>
            <Link className="text-link" href="/academics">See all academic programmes <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="home-programme-cards">
            {programmes.map((programme) => (
              <li className="home-programme-card" key={programme.slug}>
                <p className="home-programme-card__eyebrow">Programme page</p>
                <h3><Link href={`/academics/${programme.slug}`}>{programme.label}</Link></h3>
                <Link
                  className="home-programme-card__enquiry"
                  href={`/admissions?subject=${encodeURIComponent(`Admissions enquiry: ${programme.label}`)}#admission-enquiry`}
                >
                  Ask about admission <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EventPhotoMarquee photos={homepageEventPhotos} />

      <section className="home-events content-section" aria-labelledby="home-events-title">
        <div className="container home-events__layout">
          <div className="home-events__intro">
            <p className="page-header__eyebrow">Campus life</p>
            <h2 className="section-heading" id="home-events-title">Events and activities</h2>
            <p className="home-section-intro">Browse photographs from college events and activities.</p>
            <Link className="text-link" href="/campus-life/events">View event galleries <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="home-event-list">
            {eventSourceGroups.map((event) => (
              <li key={event.slug}>
                <Link href={`/campus-life/events#event-gallery-${event.slug}`}>
                  {event.title}<span aria-hidden="true"> ↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-chairman content-section content-section--muted" aria-labelledby="home-chairman-title">
        <div className="container home-chairman__grid">
          <div className="home-chairman__copy">
            <p className="page-header__eyebrow">Leadership</p>
            <h2 className="section-heading" id="home-chairman-title">Chairman’s message</h2>
            <blockquote>
              <p>“Education is simply the soul of the society as it passes from one generation to another.”</p>
              <cite>Chairman, K.H.M.W. Night College of Commerce</cite>
            </blockquote>
            <Link className="button button--primary home-chairman__action" href="/admissions">View admissions</Link>
          </div>
          <figure className="home-chairman__portrait">
            <LightboxImage
              src="/images/leadership/chairmen-mr-abdul-ahad-khan.jpg"
              width={500}
              height={335}
              alt="Chairman Mr. Abdul Ahad Khan"
              sizes="(max-width: 62rem) 100vw, 44vw"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
