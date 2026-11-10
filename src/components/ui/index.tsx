"use client";

import Link from "next/link";
import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-small px-4 py-2 text-small font-semibold leading-none transition-transform active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-800",
  secondary: "border border-navy-800 bg-surface-1 text-navy-900 hover:bg-navy-50",
  ghost: "bg-transparent text-navy-900 hover:bg-navy-100",
};

type ButtonElementProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: never;
};

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button(props: ButtonElementProps | ButtonLinkProps) {
  if (props.href !== undefined) {
    const {
      href,
      variant = "primary",
      className = "",
      disabled,
      onClick,
      tabIndex,
      ...linkProps
    } = props;
    const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`.trim();

    return (
      <Link
        {...linkProps}
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      />
    );
  }

  const { variant = "primary", className = "", ...buttonProps } = props;
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`.trim();

  return <button {...buttonProps} className={classes} />;
}

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

type CardProps = {
  variant?: "plain" | "linked" | "media";
  href?: string;
  media?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

const cardStyles = {
  plain: "border border-navy-100 bg-surface-1",
  linked:
    "border border-navy-100 bg-surface-1 transition-transform hover:-translate-y-0.5 hover:shadow-level-1 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold aria-disabled:pointer-events-none aria-disabled:opacity-50",
  media: "overflow-hidden border border-navy-100 bg-surface-1",
};

export function Card({
  variant = "plain",
  href,
  media,
  children,
  className = "",
  disabled = false,
}: CardProps) {
  const classes =
    `grid gap-4 rounded-medium p-5 ${cardStyles[variant]} ${className}`.trim();
  const content = (
    <>
      {media ? <div className="overflow-hidden rounded-small">{media}</div> : null}
      <div className="grid gap-2">{children}</div>
    </>
  );

  if (href && variant === "linked") {
    return (
      <Link
        className={classes}
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (event) => event.preventDefault() : undefined}
      >
        {content}
      </Link>
    );
  }

  return <article className={classes}>{content}</article>;
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

export function LinkRow({
  href,
  title,
  description,
  disabled = false,
}: {
  href: string;
  title: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <Link
      className="group flex min-h-11 items-center justify-between gap-4 border-b border-navy-200 py-3 text-navy-900 transition-transform hover:translate-x-1 active:translate-x-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold aria-disabled:pointer-events-none aria-disabled:opacity-50"
      href={href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? (event) => event.preventDefault() : undefined}
    >
      <span className="grid gap-1">
        <span className="font-semibold group-hover:underline">{title}</span>
        {description ? (
          <span className="text-small text-navy-700">{description}</span>
        ) : null}
      </span>
      <span aria-hidden="true" className="text-lg">→</span>
    </Link>
  );
}

export function Accordion({
  title,
  children,
  disabled = false,
  open = false,
}: {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  open?: boolean;
}) {
  return (
    <details
      className="group rounded-medium border border-navy-200 bg-surface-1 p-4"
      open={open}
    >
      <summary
        className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900 hover:text-navy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:translate-y-px aria-disabled:pointer-events-none aria-disabled:opacity-50 [&::-webkit-details-marker]:hidden"
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : undefined}
      >
        {title}
        <span aria-hidden="true" className="text-lg">+</span>
      </summary>
      <div className="pt-3 text-small text-navy-700">{children}</div>
    </details>
  );
}

export function PageHero({
  variant = "compact",
  eyebrow,
  title,
  lead,
  actions,
}: {
  variant?: "home" | "compact";
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  const isHome = variant === "home";
  const titleId = useId();

  return (
    <section
      className={`bg-surface-0 ${isHome ? "py-section" : "py-10"}`}
      aria-labelledby={titleId}
    >
      <div className="mx-auto grid max-w-content gap-5 px-5 md:px-8">
        {eyebrow ? (
          <p className="text-small font-semibold tracking-[0.08em] text-navy-700">
            {eyebrow}
          </p>
        ) : null}
        <h1
          id={titleId}
          className={`max-w-reading font-heading text-navy-900 ${isHome ? "text-display" : "text-h1"}`}
        >
          {title}
        </h1>
        {lead ? (
          <p className="max-w-reading text-body text-navy-700">{lead}</p>
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
