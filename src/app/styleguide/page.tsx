import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentShowcase } from "./component-showcase";
import { SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Design system",
  description: "Preview the editorial design tokens and reusable interface components.",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="site-main" id="main-content">
      <div className="mx-auto grid max-w-wide gap-12 px-5 py-12 md:px-8">
        <header className="grid gap-4">
          <p className="text-small font-semibold tracking-[0.08em] text-navy-700">
            Editorial design system
          </p>
          <h1 className="max-w-reading font-heading text-display text-navy-900">
            A visual language for the college
          </h1>
          <p className="max-w-reading text-body text-navy-700">
            Shared foundations for a distinctive institutional website: clear typography, authentic photography, measured colour and room for content to breathe.
          </p>
        </header>

        <section className="grid gap-6" aria-labelledby="styleguide-principles">
          <SectionHeader
            as="h2"
            id="styleguide-principles"
            title="Editorial principles"
            lead="Use these decisions to guide new pages and keep existing components consistent."
          />
          <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Typography sets the hierarchy</h3>
              <p className="text-small text-navy-700">Use Newsreader for headings and Manrope for body copy and controls. Keep long-form text within the reading width.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Composition can vary by section</h3>
              <p className="text-small text-navy-700">Balance image and text, use alignment and cropping deliberately, and avoid repeating the same card grid everywhere.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Space creates rhythm</h3>
              <p className="text-small text-navy-700">Use the shared spacing scale and generous section gaps. Add borders or surfaces only when they clarify grouping.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Colour stays restrained</h3>
              <p className="text-small text-navy-700">Navy carries the institutional identity. Gold marks small accents, with off-white and white supporting the content.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Photography remains authentic</h3>
              <p className="text-small text-navy-700">Use approved college photographs with intentional aspect ratios, focal points, descriptive alternatives and responsive image sizes.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Components share conventions</h3>
              <p className="text-small text-navy-700">Choose components by purpose and keep their spacing, typography, edges and interaction states predictable.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Accessibility is part of the foundation</h3>
              <p className="text-small text-navy-700">Use semantic headings, keyboard access, visible focus, adequate contrast, clear names and touch targets of at least 44 pixels. Respect reduced motion.</p>
            </li>
            <li className="grid content-start gap-1 border-t border-navy-200 pt-3">
              <h3 className="font-semibold text-navy-900">Layouts adapt from small screens</h3>
              <p className="text-small text-navy-700">Keep the same content hierarchy across mobile, tablet and desktop, then adjust alignment and column count as space allows.</p>
            </li>
          </ol>
        </section>

        <section className="grid gap-6" aria-labelledby="styleguide-tokens">
          <SectionHeader as="h2" id="styleguide-tokens" title="Brand palette" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "Navy", hex: "#0F2342", token: "bg-navy-900", text: "text-white" },
              { label: "Muted blue", hex: "#46638F", token: "bg-muted-blue", text: "text-white" },
              { label: "Gold accent", hex: "#C9A24A", token: "bg-gold", text: "text-navy-900" },
              { label: "Off-white", hex: "#F4F6F9", token: "bg-off-white", text: "text-navy-900" },
              { label: "White", hex: "#FFFFFF", token: "bg-white", text: "text-navy-900" },
              { label: "Near-black", hex: "#111418", token: "bg-near-black", text: "text-white" },
            ].map((color) => (
              <div className="grid gap-2" key={color.label}>
                <span className={`grid min-h-24 content-end rounded-small border border-navy-200 p-3 ${color.token}`}>
                  <span className={`text-small font-semibold ${color.text}`}>{color.label}</span>
                  <span className={`text-xs ${color.text}`}>{color.hex}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="grid gap-3 rounded-medium border border-navy-100 bg-surface-1 p-5">
            <p className="font-heading text-display text-navy-900">Display · Newsreader</p>
            <p className="font-heading text-h1 text-navy-900">Page title · H1</p>
            <p className="font-heading text-h2 text-navy-900">Section title · H2</p>
            <p className="font-heading text-h3 text-navy-900">Subsection title · H3</p>
            <p className="font-heading text-h4 text-navy-900">Supporting heading · H4</p>
            <p className="text-body text-near-black">Body copy · Manrope, 16px with a 1.7 line height</p>
            <p className="text-small text-navy-700">Supporting copy · Manrope, 14px with a 1.5 line height</p>
            <p className="max-w-reading text-small text-navy-700">Reading measure: long-form content uses the shared max-w-reading width instead of spanning the full page.</p>
          </div>
        </section>

        <section className="grid gap-6" aria-labelledby="styleguide-spacing">
          <SectionHeader
            as="h2"
            id="styleguide-spacing"
            title="Spacing and containers"
            lead="Use the shared scale for component gaps and padding, then increase to section spacing for page rhythm."
          />
          <div className="grid gap-3 rounded-medium border border-navy-100 bg-surface-1 p-5">
            {[
              ["1 · 4px", "--spacing-1"],
              ["2 · 8px", "--spacing-2"],
              ["3 · 12px", "--spacing-3"],
              ["4 · 16px", "--spacing-4"],
              ["6 · 24px", "--spacing-6"],
              ["8 · 32px", "--spacing-8"],
              ["12 · 48px", "--spacing-12"],
              ["16 · 64px", "--spacing-16"],
              ["24 · 96px", "--spacing-24"],
              ["section · fluid 48–96px", "--spacing-section"],
            ].map(([label, token]) => (
              <div className="flex min-h-6 items-center gap-4" key={token}>
                <span className="w-36 shrink-0 text-small text-navy-700">{label}</span>
                <span className="h-3 max-w-full rounded-sm bg-navy-700" style={{ width: `var(${token})` }} aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 rounded-medium border border-navy-100 bg-surface-1 p-5">
            {[
              ["Reading · 46rem", "max-w-reading"],
              ["Content · 76rem", "max-w-content"],
              ["Wide · 88rem", "max-w-wide"],
            ].map(([label, width]) => (
              <div className="grid gap-2" key={label}>
                <span className="text-small text-navy-700">{label}</span>
                <span className={`h-4 w-full border-r-4 border-gold bg-navy-100 ${width}`} aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="text-small text-navy-700">The lg utility breakpoint aligns with the existing 62rem desktop breakpoint.</p>
        </section>

        <section className="grid gap-6" aria-labelledby="styleguide-components">
          <SectionHeader
            as="h2"
            id="styleguide-components"
            title="Choosing a component"
            lead="Start with the content and its task. A reusable component should clarify a page, not turn every section into a box."
          />
          <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[
              ["SectionHeader", "Introduce a section with an optional eyebrow and lead. Set its heading level to match the page outline."],
              ["PageHero", "Provide a concise page-level introduction, usually on interior pages."],
              ["Button", "Use for an action. Choose primary for the main action, secondary for a supporting action, and ghost for a quiet action."],
              ["Card", "Group related content; use linked for navigation and media only when an image adds meaning."],
              ["Chip", "Show a short category or status label. Keep it non-interactive."],
              ["StatTile", "Highlight a verified, useful figure with its label and optional context."],
              ["IconTile", "Pair one meaningful icon with a concise title and description."],
              ["Prose", "Format long-form text, headings, links and lists at a comfortable reading width."],
              ["Accordion", "Disclose optional supporting detail while keeping the rest of the page in view."],
              ["Tabs", "Switch between a small set of related panels that share one content area."],
            ].map(([name, guidance]) => (
              <div className="grid content-start gap-1 border-t border-navy-200 pt-3" key={name}>
                <dt className="font-semibold text-navy-900">{name}</dt>
                <dd className="text-small text-navy-700">{guidance}</dd>
              </div>
            ))}
          </dl>
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
