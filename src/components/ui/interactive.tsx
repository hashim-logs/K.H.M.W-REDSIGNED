"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-small px-4 py-2 text-small font-semibold leading-none transition-transform active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-current)] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

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
    "border border-navy-100 bg-surface-1 transition-transform hover:-translate-y-0.5 hover:shadow-level-1 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-current)] aria-disabled:pointer-events-none aria-disabled:opacity-50",
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
      className="group flex min-h-11 items-center justify-between gap-4 border-b border-navy-200 py-3 text-navy-900 transition-transform hover:translate-x-1 active:translate-x-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-current)] aria-disabled:pointer-events-none aria-disabled:opacity-50"
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
        className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900 hover:text-navy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-current)] active:translate-y-px aria-disabled:pointer-events-none aria-disabled:opacity-50 [&::-webkit-details-marker]:hidden"
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
