export default function HomePage() {
  return (
    <main className="site-main" id="main-content">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="container hero__content">
          <p className="hero__eyebrow">K.H.M.W. College</p>
          <h1 id="hero-title">A clearer way to find college information.</h1>
          <p className="hero__description">
            A redesigned website is taking shape. Until it is ready, visit the
            current college website for published information.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="https://khmwcollege.org/">
              Visit current college website
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button--secondary"
              href="https://khmwcollege.org/contact-us.html"
            >
              View contact page on current site
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
