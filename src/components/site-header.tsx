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
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Vision & Mission", href: "/about#vision-and-mission" },
      { label: "Facilities", href: "/campus-life/facilities" },
      { label: "Faculty", href: "/faculty" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "BMS", href: "/academics/bms" },
      { label: "B.Com", href: "/academics/b-com" },
      { label: "B.Sc. IT", href: "/academics/b-sc-it" },
      { label: "BAF / BAFF", href: "/academics/baf" },
      { label: "M.Com", href: "/academics/m-com" },
    ],
  },
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
      { label: "Results", href: "/student-corner/results" },
      { label: "Academic calendar", href: "/student-corner/academic-calendar" },
    ],
  },
  { label: "IQAC & Accreditation", href: "/accreditation" },
  { label: "Contact", href: "/contact" },
];

function isCurrentPath(pathname: string, href: string) {
  const path = href.split("#", 1)[0];
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

function NavigationLinks() {
  const pathname = usePathname();

  return (
    <ul className="navigation-list">
      {navigationItems.map((item) => {
        const current = isCurrentPath(pathname, item.href);
        return (
          <li className={item.children ? "navigation-list__item navigation-list__item--has-children" : "navigation-list__item"} key={item.href}>
            <Link href={item.href} aria-current={current ? "page" : undefined}>
              {item.label}
              {item.children ? <span className="navigation-list__chevron" aria-hidden="true">⌄</span> : null}
            </Link>
            {item.children ? (
              <ul className="navigation-list__submenu" aria-label={`${item.label} pages`}>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} aria-current={isCurrentPath(pathname, child.href) ? "page" : undefined}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
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
        <Link className="site-header__current-link" href="/student-corner">
          Student resources
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
              onClick={closeMobileMenu}
            >
              <NavigationLinks />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
