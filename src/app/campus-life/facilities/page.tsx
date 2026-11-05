import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { campusFacilities } from "@/content/campus-life";

export const metadata: Metadata = {
  title: "Facilities | Campus Life",
  description: "Recovered photographs and source records for college facilities.",
};

export default function FacilitiesPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Facilities" parent={{ label: "Campus Life", href: "/campus-life" }} />
      <PageHeader
        eyebrow="Campus Life"
        title="Facilities"
        description="A visual index of facility photographs recovered from the college’s published image collection."
      />
      <ContentSection id="facility-photographs" title="Facility photographs and records" tone="muted">
        <p>
          These photographs are reproduced from source folders bearing the labels shown below. They do not establish current operation, condition, access arrangements, equipment or opening hours. Where people are identifiable or the source context is unclear, the photograph is withheld pending review.
        </p>
        <div className="facility-grid">
          {campusFacilities.map((facility) => (
            <article className={`facility-card${facility.image ? "" : " facility-card--withheld"}`} key={facility.name}>
              {facility.image && facility.alt && facility.width && facility.height ? (
                <figure>
                  <Image
                    className={facility.imagePosition === "bottom" ? "facility-card__image--bottom" : undefined}
                    src={facility.image}
                    alt={facility.alt}
                    width={facility.width}
                    height={facility.height}
                    sizes="(max-width: 62rem) 100vw, 40vw"
                  />
                  <figcaption>{facility.name}</figcaption>
                </figure>
              ) : (
                <h3>{facility.name}</h3>
              )}
              <p>{facility.note}</p>
            </article>
          ))}
        </div>
      </ContentSection>
      <ContentSection id="facilities-information" title="Facility information still needed">
        <p>
          A current, institution-confirmed directory is needed for facility names, availability, access information, support provisions and opening details. No accessibility compliance claim is inferred from the archived image labels or photographs.
        </p>
      </ContentSection>
    </main>
  );
}
