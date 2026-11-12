"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type EventPhoto = {
  eventSlug: string;
  eventTitle: string;
  src: string;
  alt: string;
};

function PhotoGroup({ photos, duplicate = false }: { photos: EventPhoto[]; duplicate?: boolean }) {
  return (
    <ul className="event-photo-marquee__group" aria-hidden={duplicate || undefined}>
      {photos.map((photo, index) => (
        <li className="event-photo-marquee__item" key={`${photo.src}-${index}`}>
          <Link
            className="event-photo-marquee__link"
            href={`/campus-life/events#event-gallery-${photo.eventSlug}`}
            aria-label={`View ${photo.eventTitle} photographs`}
            tabIndex={duplicate ? -1 : undefined}
          >
            <span className="event-photo-marquee__image">
              <Image
                src={photo.src}
                alt={duplicate ? "" : photo.alt}
                fill
                sizes="(max-width: 40rem) 72vw, (max-width: 62rem) 42vw, 24rem"
              />
              <span className="event-photo-marquee__caption">
                <span>{photo.eventTitle}</span>
                <span aria-hidden="true">↗</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function EventPhotoMarquee({ photos }: { photos: EventPhoto[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <section className="event-photo-marquee" aria-label="Campus life photographs">
      <div className="container event-photo-marquee__toolbar">
        <h2>Campus life in pictures</h2>
        <button
          className="event-photo-marquee__toggle"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "Resume photo loop" : "Pause photo loop"}
        </button>
      </div>
      <div className="event-photo-marquee__viewport">
        <div className={`event-photo-marquee__track${paused ? " is-paused" : ""}`}>
          <PhotoGroup photos={photos} />
          <PhotoGroup photos={photos} duplicate />
        </div>
      </div>
    </section>
  );
}
