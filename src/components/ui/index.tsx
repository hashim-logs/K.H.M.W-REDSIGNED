import { useId, type ReactNode } from "react";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
};

const sectionHeadingStyles = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
} as const;

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`grid gap-3 ${className}`.trim()}>
      {eyebrow ? (
        <p className="text-small font-semibold tracking-[0.08em] text-navy-700">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={`font-heading ${sectionHeadingStyles[Heading]} text-navy-900`}
      >
        {title}
      </Heading>
      {lead ? <p className="max-w-reading text-body text-navy-700">{lead}</p> : null}
    </header>
  );
}

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "inverse";
}) {
  const tones = {
    neutral: "bg-navy-100 text-navy-800",
    accent: "bg-gold/15 text-navy-900",
    inverse: "bg-navy-900 text-white",
  };

  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full px-3 py-1 text-small font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatTile({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="grid gap-1 rounded-medium border border-navy-100 bg-surface-1 p-5">
      <span className="font-heading text-h2 text-navy-900">{value}</span>
      <span className="font-semibold text-navy-900">{label}</span>
      {detail ? <span className="text-small text-navy-700">{detail}</span> : null}
    </div>
  );
}

export function IconTile({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid content-start gap-3 rounded-medium border border-navy-100 bg-surface-1 p-5">
      <span className="grid size-11 place-items-center rounded-small bg-navy-100 text-navy-900">
        {icon}
      </span>
      <h3 className="font-heading text-h4 text-navy-900">{title}</h3>
      <p className="text-small text-navy-700">{children}</p>
    </div>
  );
}

export function PageHero({
  variant = "compact",
  tone,
  eyebrow,
  title,
  lead,
  actions,
}: {
  variant?: "home" | "compact";
  tone?: "light" | "navy";
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  const isHome = variant === "home";
  const resolvedTone = tone ?? (isHome ? "light" : "navy");
  const isNavy = resolvedTone === "navy";
  const titleId = useId();

  return (
    <section
      className={`${isNavy ? "bg-navy-900 text-white" : "bg-surface-0 text-navy-900"} ${isHome ? "py-section" : "py-10"}`}
      aria-labelledby={titleId}
      data-focus-tone={isNavy ? "dark" : "light"}
    >
      <div className="mx-auto grid max-w-content gap-5 px-5 md:px-8">
        {eyebrow ? (
          <p
            className={`text-small font-semibold tracking-[0.08em] ${isNavy ? "text-gold" : "text-navy-700"}`}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          id={titleId}
          className={`max-w-reading font-heading ${isNavy ? "text-white" : "text-navy-900"} ${isHome ? "text-display" : "text-h1"}`}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className={`max-w-reading text-body ${isNavy ? "text-white/85" : "text-navy-700"}`}
          >
            {lead}
          </p>
        ) : null}
        {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
      </div>
    </section>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-reading space-y-4 text-body text-near-black [&_a]:font-semibold [&_a]:text-navy-800 [&_a]:underline [&_h2]:font-heading [&_h2]:text-h2 [&_h2]:text-navy-900 [&_h3]:font-heading [&_h3]:text-h3 [&_h3]:text-navy-900 [&_li]:ml-6 [&_li]:list-disc [&_ol_li]:list-decimal ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export { Accordion, Button, Card, LinkRow } from "./interactive";
