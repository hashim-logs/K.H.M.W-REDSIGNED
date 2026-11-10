import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentShowcase } from "./component-showcase";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Design system",
  description: "Preview the design tokens and reusable interface components.",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="site-main" id="main-content">
      <div className="mx-auto grid max-w-wide gap-12 px-5 py-12 md:px-8">
        <header className="grid gap-4">
          <p className="text-small font-semibold tracking-[0.08em] text-navy-700">
            Design system preview
          </p>
          <h1 className="max-w-reading font-heading text-display text-navy-900">
            Interface foundations
          </h1>
          <p className="max-w-reading text-body text-navy-700">
            Review the shared styles and reusable components at a narrow mobile width and a wide desktop width.
          </p>
        </header>

        <section className="grid gap-6" aria-labelledby="styleguide-tokens">
          <SectionHeader as="h2" id="styleguide-tokens" title="Design tokens" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["Navy 50", "bg-navy-50"],
              ["Navy 100", "bg-navy-100"],
              ["Navy 300", "bg-navy-300"],
              ["Navy 500", "bg-navy-500"],
              ["Navy 700", "bg-navy-700"],
              ["Navy 900", "bg-navy-900"],
              ["Gold accent", "bg-gold"],
              ["Surface 0", "bg-surface-0"],
              ["Surface 1", "bg-surface-1"],
              ["Surface 2", "bg-surface-2"],
            ].map(([label, color]) => (
              <div
                className="grid min-h-20 content-end rounded-small border border-navy-200 p-3"
                key={label}
              >
                <span className={`h-8 rounded-small ${color}`} aria-hidden="true" />
                <span className="mt-2 text-small font-semibold text-navy-900">{label}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-3 rounded-medium border border-navy-100 bg-surface-1 p-5">
            <p className="font-heading text-display text-navy-900">Display type</p>
            <p className="font-heading text-h1 text-navy-900">Heading one</p>
            <p className="font-heading text-h2 text-navy-900">Heading two</p>
            <p className="font-heading text-h3 text-navy-900">Heading three</p>
            <p className="font-heading text-h4 text-navy-900">Heading four</p>
            <p className="text-body text-navy-900">Body text with Manrope</p>
            <p className="text-small text-navy-700">Small text with supporting information</p>
          </div>
        </section>

        <section className="grid gap-6" aria-labelledby="styleguide-mobile">
          <SectionHeader
            as="h2"
            id="styleguide-mobile"
            title="Mobile preview"
            lead="This preview is constrained to 390 pixels."
          />
          <div className="w-full max-w-[390px] rounded-large border border-navy-200 bg-surface-1 p-5 shadow-level-1">
            <ComponentShowcase preview="mobile" />
          </div>
        </section>

        <section className="grid gap-6" aria-labelledby="styleguide-desktop">
          <SectionHeader
            as="h2"
            id="styleguide-desktop"
            title="Desktop preview"
            lead="Scroll horizontally on narrow screens to inspect the 1,120-pixel desktop canvas."
          />
          <div className="overflow-x-auto rounded-large border border-navy-200">
            <div className="min-w-[1120px] bg-surface-1 p-8 shadow-level-2">
              <ComponentShowcase preview="desktop" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
