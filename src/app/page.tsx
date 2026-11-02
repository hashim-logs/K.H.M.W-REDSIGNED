import Image from "next/image";
import Link from "next/link";

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
    href: "/student-corner",
    title: "Student Corner",
    description: "Examination timetables, notices and student resources.",
  },
  {
    href: "/campus-life",
    title: "Campus Life",
    description: "Facilities and campus activity information from recovered materials.",
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
              <Link className="button button--secondary" href="/student-corner">Student resources</Link>
            </div>
          </div>
          <figure className="home-intro__image">
            <Image
              src="/images/khmw-college.jpg"
              width={500}
              height={363}
              priority
              alt="Exterior of the college building"
              sizes="(max-width: 62rem) 100vw, 42vw"
            />
            <figcaption>College building, from the recovered college image collection.</figcaption>
          </figure>
        </div>
      </section>

      <section className="home-destinations" aria-labelledby="home-destinations-title">
        <div className="container">
          <div className="home-destinations__heading">
            <p className="page-header__eyebrow">Explore</p>
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
    </main>
  );
}
