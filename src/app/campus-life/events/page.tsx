import type { Metadata } from "next";
import { LightboxImage } from "@/components/image-lightbox";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";
import { PublishedContentList } from "@/components/published-content-list";
import {
  culturalClubPhotos,
  eventSourceGroups,
  studentActivitySourcePages,
} from "@/content/campus-life";

export const metadata: Metadata = {
  title: "Events & Activities | Campus Life",
  description: "Recovered event photo collections and student activity source records.",
};

function eventPhotoPath(
  event: (typeof eventSourceGroups)[number],
  photoNumber: number,
) {
  const extension = event.uppercaseExtensionIndices?.includes(photoNumber)
    ? ".JPG"
    : event.extension;

  return `/images/events/${event.folder}/${event.prefix}_${photoNumber}${extension}`;
}

export default function CampusEventsPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Events & activities" parent={{ label: "Campus Life", href: "/campus-life" }} />
      <PageHeader
        eyebrow="Campus Life"
        title="Events and student activities"
        description="Photographs from the recovered event collections, presented under their source-folder labels."
      />
      <section className="event-collections container" aria-labelledby="event-collections-title">
        <div className="event-collections__intro">
          <h2 className="section-heading" id="event-collections-title">Event photo collections</h2>
          <p>
            Folder labels and file order from the recovered collections are retained; exact event dates, descriptions and participant identities are not inferred.
          </p>
        </div>
        <div className="event-gallery-grid">
          {eventSourceGroups.map((event, index) => (
            <section className="event-gallery-card" key={event.title} aria-labelledby={`event-gallery-${index}`}>
              <div className="event-gallery-card__heading">
                <h3 id={`event-gallery-${index}`}>{event.title}</h3>
                <span>{event.imageCount} archived photographs</span>
              </div>
              <p>{event.period}</p>
              <div className="event-gallery-card__images" id={`event-gallery-images-${index}`}>
                {Array.from({ length: event.imageCount }, (_, index) => {
                  const photoNumber = index + 1;
                  return (
                    <figure className="event-gallery-photo" key={photoNumber}>
                      <LightboxImage
                        className="event-gallery-photo__image"
                        src={eventPhotoPath(event, photoNumber)}
                        alt={`Photograph ${photoNumber} from the ${event.title} source collection`}
                        fill
                        sizes="(max-width: 40rem) 50vw, (max-width: 62rem) 33vw, 22vw"
                      />
                      <figcaption>Photograph {photoNumber}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <section className="event-gallery-card event-gallery-card--cultural" aria-labelledby="cultural-club-title">
          <div className="event-gallery-card__heading">
            <h3 id="cultural-club-title">Cultural-club photographs</h3>
            <span>{culturalClubPhotos.length} archived photographs</span>
          </div>
          <p>Photographs from the recovered cultural-club image collection.</p>
          <div className="event-gallery-card__images" id="event-gallery-images-cultural">
            {culturalClubPhotos.map((filename, index) => (
              <figure className="event-gallery-photo" key={filename}>
                <LightboxImage
                  className="event-gallery-photo__image"
                  src={`/images/events/cultur-club/${filename}`}
                  alt={`Photograph ${index + 1} from the cultural-club source collection`}
                  fill
                  sizes="(max-width: 40rem) 50vw, (max-width: 62rem) 33vw, 22vw"
                />
                <figcaption>Photograph {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </section>
      <ContentSection id="activity-pages" title="Student activity pages recorded in the source" tone="muted">
        <p>
          The bounded source audit recorded pages with these labels. Their current descriptions, schedules, membership and participation information are not included in the recovered archive.
        </p>
        <ul className="editorial-list">
          {studentActivitySourcePages.map((activity) => <li key={activity}>{activity}</li>)}
        </ul>
      </ContentSection>
      <ContentSection id="published-event-updates" title="Published event updates">
        <PublishedContentList type="event" emptyMessage="There are no verified, approved event updates." />
      </ContentSection>
    </main>
  );
}
