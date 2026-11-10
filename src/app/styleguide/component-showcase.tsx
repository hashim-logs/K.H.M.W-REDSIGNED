import Image from "next/image";
import {
  Accordion,
  Button,
  Card,
  Chip,
  IconTile,
  LinkRow,
  PageHero,
  Prose,
  SectionHeader,
  StatTile,
} from "@/components/ui";
import { Tabs } from "@/components/ui/tabs";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function ComponentShowcase({
  preview,
}: {
  preview: "mobile" | "desktop";
}) {
  const isMobile = preview === "mobile";
  const idPrefix = `styleguide-${preview}`;
  const controlLayout = isMobile ? "flex flex-col items-stretch" : "flex flex-wrap";
  const cardLayout = isMobile ? "grid grid-cols-1" : "grid grid-cols-3";

  return (
    <div className="grid gap-10">
      <section className="grid gap-5" aria-labelledby={`${idPrefix}-buttons`}>
        <SectionHeader
          as="h2"
          id={`${idPrefix}-buttons`}
          eyebrow="Controls"
          title="Buttons"
          lead="Primary, secondary and quiet actions, including a disabled state."
        />
        <div className={`${controlLayout} items-start gap-3`}>
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost">Quiet action</Button>
          <Button disabled>Unavailable action</Button>
          <Button href={`#${idPrefix}-prose`} variant="secondary">Link button</Button>
          <Button href="#styleguide-prose" disabled>Disabled link button</Button>
        </div>
        <p className="text-small text-navy-700">
          Hover, keyboard focus, press and disabled styles are available on the controls.
        </p>
      </section>

      <section className="grid gap-5" aria-labelledby={`${idPrefix}-section-header`}>
        <SectionHeader
          as="h2"
          id={`${idPrefix}-section-header`}
          eyebrow="Hierarchy"
          title="Section header"
          lead="A short introduction can explain the value of the content that follows."
        />
      </section>

      <section className="grid gap-5" aria-labelledby={`${idPrefix}-cards`}>
        <SectionHeader
          as="h2"
          id={`${idPrefix}-cards`}
          eyebrow="Content containers"
          title="Cards"
          lead="Use a plain card for grouping, a linked card for navigation, and a media card when imagery is meaningful."
        />
        <div className={`${cardLayout} gap-4`}>
          <Card>
            <h3 className="font-heading text-h4 text-navy-900">Plain card</h3>
            <p className="text-small text-navy-700">A calm surface for related content.</p>
          </Card>
          <Card variant="linked" href="#styleguide-links">
            <h3 className="font-heading text-h4 text-navy-900">Linked card</h3>
            <p className="text-small text-navy-700">Hover or focus to see its interactive state.</p>
          </Card>
          <Card
            variant="media"
            media={
              <figure>
                <div className="relative aspect-video">
                  <Image
                    src="/images/facilities/Auditorium3.jpeg"
                    alt="Auditorium interior with a stage and rows of chairs"
                    fill
                    sizes="(min-width: 62rem) 25vw, (min-width: 40rem) 50vw, 100vw"
                    className="object-cover object-[center_42%]"
                  />
                </div>
                <figcaption className="px-3 pt-2 text-xs text-navy-700">
                  Authentic college photograph · responsive landscape crop
                </figcaption>
              </figure>
            }
          >
            <h3 className="font-heading text-h4 text-navy-900">Media card</h3>
            <p className="text-small text-navy-700">Use a stable aspect ratio, meaningful alt text and a sizes hint that matches the layout.</p>
          </Card>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby={`${idPrefix}-chips`}>
        <SectionHeader as="h2" id={`${idPrefix}-chips`} title="Chips" />
        <div className="flex flex-wrap items-center gap-3">
          <Chip>Neutral</Chip>
          <Chip tone="accent">Accent</Chip>
          <Chip tone="inverse">Inverse</Chip>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby={`${idPrefix}-tiles`}>
        <SectionHeader as="h2" id={`${idPrefix}-tiles`} title="Stat and icon tiles" />
        <div className={`${cardLayout} gap-4`}>
          <StatTile value="Value" label="Stat label" detail="Optional supporting detail" />
          <IconTile icon={<ArrowIcon />} title="Icon tile">
            Pair a single consistent icon with a clear label and short explanation.
          </IconTile>
        </div>
      </section>

      <section
        className="grid gap-5"
        id={`${idPrefix}-links`}
        aria-labelledby={`${idPrefix}-link-rows`}
      >
        <SectionHeader as="h2" id={`${idPrefix}-link-rows`} title="Link rows" />
        <div>
          <LinkRow
            href={`#${idPrefix}-accordion`}
            title="Open a related section"
            description="A clear label with optional supporting text."
          />
          <LinkRow
            href={`#${idPrefix}-accordion`}
            title="Disabled destination"
            disabled
          />
        </div>
      </section>

      <section
        className="grid gap-5"
        id={`${idPrefix}-accordion`}
        aria-labelledby={`${idPrefix}-accordions`}
      >
        <SectionHeader as="h2" id={`${idPrefix}-accordions`} title="Accordion" />
        <div className="grid gap-3">
          <Accordion title="Closed by default">
            Disclosure content appears when the summary is activated.
          </Accordion>
          <Accordion title="Open by default" open>
            Content remains readable without extra interaction.
          </Accordion>
          <Accordion title="Unavailable disclosure" disabled>
            This content stays closed while the disclosure is disabled.
          </Accordion>
        </div>
      </section>

      <section className="grid gap-5" aria-labelledby={`${idPrefix}-tabs`}>
        <SectionHeader as="h2" id={`${idPrefix}-tabs`} title="Tabs" />
        <Tabs
          id={idPrefix}
          label={`${preview} component examples`}
          items={[
            { id: "first", label: "First tab", content: <p className="p-3 text-small">First panel content.</p> },
            { id: "second", label: "Second tab", content: <p className="p-3 text-small">Second panel content.</p> },
            { id: "disabled", label: "Disabled tab", content: <p className="p-3 text-small">Disabled panel.</p>, disabled: true },
          ]}
        />
        <p className="text-small text-navy-700">
          Use arrow keys to move between enabled tabs; Home and End move to the first and last.
        </p>
      </section>

      <section className="grid gap-5" aria-labelledby={`${idPrefix}-page-heroes`}>
        <SectionHeader as="h2" id={`${idPrefix}-page-heroes`} title="Page hero variants" />
        <div className="overflow-hidden rounded-medium border border-navy-100">
          <PageHero
            variant="home"
            eyebrow="Home variant"
            title="A clear, welcoming first impression"
            lead="Use the larger type scale for a concise page introduction."
            actions={<Button>Primary action</Button>}
          />
        </div>
        <div className="overflow-hidden rounded-medium border border-navy-100">
          <PageHero
            variant="compact"
            eyebrow="Compact variant"
            title="A focused page introduction"
            lead="Use the compact variant on interior pages."
          />
        </div>
      </section>

      <section className="grid gap-5" id={`${idPrefix}-prose`} aria-labelledby={`${idPrefix}-prose-heading`}>
        <SectionHeader as="h2" id={`${idPrefix}-prose-heading`} title="Prose" />
        <Prose className="rounded-medium border border-navy-100 bg-surface-1 p-5">
          <h3>Readable long-form content</h3>
          <p>
            Paragraphs, links and lists share a comfortable reading width and consistent rhythm.
            <a href={`#${idPrefix}-buttons`}> Example inline link</a>
          </p>
          <ul>
            <li>First list item</li>
            <li>Second list item</li>
          </ul>
        </Prose>
      </section>
    </div>
  );
}
