import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { campusFacilities } from "@/content/campus-life";

export const metadata: Metadata = {
  title: "Facilities | Campus Life",
  description: "Facility photographs recovered from the college’s published image collection.",
};

export default function FacilitiesPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Facilities" parent={{ label: "Campus Life", href: "/campus-life" }} />
      <PageHeader
        eyebrow="Campus Life"
        title="Facilities"
        description="Photographs and source labels for selected campus facilities."
      />
      <ContentSection id="facility-photographs" title="Recovered facility photographs" tone="muted">
        <p>
          The images below come from the source archive’s facility folders. They are presented as photographs from that collection; current availability, condition, access arrangements and opening hours have not been confirmed.
        </p>
        <div className="facility-grid">
          {campusFacilities.map((facility) => (
            <figure className="facility-card" key={facility.name}>
              <Image
                src={facility.image}
                alt={facility.alt}
                width={facility.width}
                height={facility.height}
                sizes="(max-width: 62rem) 100vw, 40vw"
              />
              <figcaption>{facility.name}</figcaption>
              <p>{facility.note}</p>
            </figure>
          ))}
        </div>
      </ContentSection>
      <ContentSection id="facilities-information" title="Facility information still needed">
        <p>
          An institution-confirmed facilities directory should include current names, access information, relevant support provisions and opening details. The recovered materials do not provide verified public descriptions for those items.
        </p>
      </ContentSection>
    </main>
  );
}
