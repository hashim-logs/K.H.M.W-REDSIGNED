"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

const navigationItems: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  {
    label: "Campus Life",
    href: "/campus-life",
    children: [
      { label: "Facilities", href: "/campus-life/facilities" },
      { label: "Events & activities", href: "/campus-life/events" },
    ],
  },
  {
    label: "Student Corner",
    href: "/student-corner",
    children: [
      { label: "Notices & circulars", href: "/student-corner/notices" },
      { label: "Examinations", href: "/student-corner/examinations" },
      { label: "Timetables", href: "/student-corner/timetables" },
    ],
  },
  {
    label: "Institutional",
    href: "/accreditation",
    children: [
      { label: "IQAC", href: "/accreditation/iqac" },
      { label: "NAAC information", href: "/accreditation/naac" },
    ],
  },
];

function isCurrentPath(pathname: string, href: string) {
  const path = href.split("#", 1)[0];
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="navigation-list">
      {navigationItems.map((item) => {
        const current = isCurrentPath(pathname, item.href);
        const exact = pathname === item.href;
        return (
          <li
            className={`navigation-list__item${item.children ? " navigation-list__item--has-children" : ""}${current ? " navigation-list__item--current" : ""}`}
            key={item.href}
          >
            <Link
              href={item.href}
              aria-current={exact ? "page" : current ? "location" : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
            {item.children ? (
              <details className="navigation-disclosure">
                <summary aria-label={`Show ${item.label} pages`}>
                  <span className="navigation-list__chevron" aria-hidden="true">⌄</span>
                </summary>
                <ul className="navigation-list__submenu" aria-label={`${item.label} pages`}>
                  {item.children.map((child) => {
                    const childCurrent = isCurrentPath(pathname, child.href);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : childCurrent ? "location" : undefined}
                          onClick={onNavigate}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader({ showNaacMark = false }: { showNaacMark?: boolean }) {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  function closeMobileMenu() {
    mobileMenuRef.current?.removeAttribute("open");
  }

  return (
    <header className="site-header">
      <div className="container site-header__identity">
        <Link className="site-brand" href="/" aria-label="K.H.M.W. College home">
          <Image
            className="site-brand__logo"
            src="/images/k-h-m-w-logo.png"
            width={200}
            height={200}
            alt=""
            priority
          />
          <span className="site-brand__text">
            <span className="site-brand__name">K.H.M.W. College</span>
            <span className="site-brand__descriptor">College information and resources</span>
          </span>
        </Link>
        {showNaacMark ? (
          <div className="site-header__accreditation">
            <Image
              src="/images/branding/b++naac.png"
              width={200}
              height={200}
              alt="NAAC B++ accreditation mark"
            />
            <span>B++ · valid through 6 June 2029</span>
          </div>
        ) : null}
        <Link className="site-header__current-link" href="/contact">
          Contact Us
        </Link>
      </div>

      <div className="site-header__navigation">
        <div className="container site-header__navigation-inner">
          <nav className="site-header__desktop-nav" aria-label="Primary navigation">
            <NavigationLinks />
          </nav>
          <details className="site-header__mobile-menu" ref={mobileMenuRef}>
            <summary aria-controls="mobile-primary-navigation">Menu</summary>
            <nav
              id="mobile-primary-navigation"
              aria-label="Mobile primary navigation"
            >
              <NavigationLinks onNavigate={closeMobileMenu} />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
