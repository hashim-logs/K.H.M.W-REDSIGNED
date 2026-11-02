import Link from "next/link";

type NavigationItem = {
  label: string;
  href: string;
  currentSite?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "https://khmwcollege.org/vision-mission.html", currentSite: true },
  { label: "Academics", href: "https://khmwcollege.org/academic.html", currentSite: true },
  { label: "Admissions", href: "https://khmwcollege.org/prospectus.html", currentSite: true },
  { label: "Student Corner", href: "https://khmwcollege.org/results.html", currentSite: true },
  { label: "IQAC & Accreditation", href: "https://khmwcollege.org/iqac-committee.html", currentSite: true },
  { label: "Contact", href: "https://khmwcollege.org/contact-us.html", currentSite: true },
];

function NavigationLinks() {
  return (
    <ul className="navigation-list">
      {navigationItems.map((item) => (
        <li key={item.label}>
          {item.currentSite ? (
            <a href={item.href} aria-label={`${item.label}, current college website`}>
              {item.label}
            </a>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__identity">
        <Link className="site-brand" href="/" aria-label="K.H.M.W. College home">
          <span className="site-brand__name">K.H.M.W. College</span>
          <span className="site-brand__descriptor">Website redesign preview</span>
        </Link>
        <a className="site-header__current-link" href="https://khmwcollege.org/">
          Visit current college website
        </a>
      </div>

      <div className="site-header__navigation" id="site-navigation">
        <div className="container site-header__navigation-inner">
          <p className="site-header__navigation-note">
            Section links open pages on the current college website.
          </p>

          <nav className="site-header__desktop-nav" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>

          <details className="site-header__mobile-menu">
            <summary aria-controls="mobile-primary-navigation">Menu</summary>
            <nav id="mobile-primary-navigation" aria-label="Primary navigation">
              <NavigationLinks />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
