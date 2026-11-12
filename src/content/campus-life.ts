export type CampusFacility = {
  name: string;
  image?: string;
  imagePosition?: "top" | "bottom";
  alt?: string;
  width?: number;
  height?: number;
  note: string;
};

export const campusFacilities: CampusFacility[] = [
  {
    name: "Computer laboratories",
    image: "/images/facilities/computer-lab.jpg",
    alt: "Computer workstations arranged around the walls of a laboratory",
    width: 1280,
    height: 960,
    note: "Contact the college for current information.",
  },
  {
    name: "Auditorium",
    image: "/images/facilities/Auditorium3.jpeg",
    alt: "Auditorium interior with a stage and rows of chairs",
    width: 1280,
    height: 960,
    note: "Contact the college for current information.",
  },
  {
    name: "AV room",
    image: "/images/facilities/AVRoom3.jpeg",
    alt: "Room with seating facing a presentation area",
    width: 1280,
    height: 960,
    note: "Contact the college for current information.",
  },
  {
    name: "Canteen",
    note: "Contact the college for current information.",
  },
  {
    name: "Classrooms",
    note: "Contact the college for current information.",
  },
  {
    name: "Sports turf",
    image: "/images/facilities/CricketTurf4.jpg",
    imagePosition: "bottom",
    alt: "Outdoor sports turf with players in the distance",
    width: 1280,
    height: 960,
    note: "Contact the college for current information.",
  },
  {
    name: "Gym",
    image: "/images/facilities/gym.jpg",
    alt: "Exercise equipment and weights in an indoor gym",
    width: 1600,
    height: 1066,
    note: "Contact the college for current information.",
  },
  {
    name: "Library",
    image: "/images/facilities/library4.jpeg",
    alt: "Library tables and shelving",
    width: 1280,
    height: 960,
    note: "Contact the college for current information.",
  },
  {
    name: "Digital library",
    note: "Contact the college for current information.",
  },
  {
    name: "Accessibility-related facilities",
    image: "/images/facilities/divyang5.jpeg",
    alt: "Interior doorway and rail detail from the source accessibility-related image collection",
    width: 960,
    height: 1280,
    note: "Contact the college for current information.",
  },
];

export const homepageFacilityHighlights = [
  campusFacilities[0],
  campusFacilities[6],
  campusFacilities[7],
];

type EventSourceGroup = {
  slug: string;
  title: string;
  imageCount: number;
  period: string;
  folder: string;
  prefix: string;
  extension: ".jpg" | ".JPG";
  uppercaseExtensionIndices?: number[];
};

export const eventSourceGroups: EventSourceGroup[] = [
  {
    slug: "beach-cleaning",
    title: "Beach Cleaning",
    imageCount: 15,
    period: "2025–26",
    folder: "Beach_Cleaning_2025_26",
    prefix: "Beach_Cleaning_2025_26",
    extension: ".jpg",
  },
  {
    slug: "career-counselling-bsc-it",
    title: "Career Counselling for B.Sc. IT Students",
    imageCount: 12,
    period: "2025–26",
    folder: "CAREER_COUNSELLING_FOR_BSCIT_STUDENTS_2025_26",
    prefix: "CAREER_COUNSELLING_FOR_BSCIT_STUDENTS_2025_26",
    extension: ".jpg",
  },
  {
    slug: "e-lan-fest",
    title: "E-LAN Fest",
    imageCount: 18,
    period: "2025–26",
    folder: "E-LAN_FEST_2025-26",
    prefix: "E-LAN_FEST_2025-26",
    extension: ".jpg",
    uppercaseExtensionIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 14, 17, 18],
  },
  {
    slug: "industrial-visit",
    title: "Industrial Visit",
    imageCount: 15,
    period: "2025–26",
    folder: "Industrial_Visit_2025_26",
    prefix: "Industrial_Visit_2025_26",
    extension: ".jpg",
  },
  {
    slug: "sports-day",
    title: "Sports Day",
    imageCount: 24,
    period: "2025–26",
    folder: "Sports_Day_2025_26",
    prefix: "Sports_Day_2025_26",
    extension: ".JPG",
  },
];

export function eventPhotoPath(event: EventSourceGroup, photoNumber: number) {
  const extension = event.uppercaseExtensionIndices?.includes(photoNumber)
    ? ".JPG"
    : event.extension;

  return `/images/events/${event.folder}/${event.prefix}_${photoNumber}${extension}`;
}

export const homepageEventPhotos = eventSourceGroups.map((event) => {
  const photoNumber = 1;

  return {
    eventSlug: event.slug,
    eventTitle: event.title,
    src: eventPhotoPath(event, photoNumber),
    alt: `${event.title}, photograph ${photoNumber}`,
  };
});

export const culturalClubPhotos = [
  "k-h-m-w-cultur-1.jpg",
  "k-h-m-w-cultur-2.jpg",
  "k-h-m-w-cultur-3.jpg",
  "k-h-m-w-cultur-6.jpg",
] as const;

export const studentActivitySourcePages = [
  "Clubs",
  "NSS",
  "Culture Club",
  "English Social Club",
  "Social Club Committee",
] as const;
