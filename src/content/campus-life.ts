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
    note: "The archived ComputerLab1 photograph includes a location overlay; only its upper portion is shown.",
  },
  {
    name: "Auditorium",
    image: "/images/facilities/Auditorium3.jpeg",
    alt: "Auditorium interior with a stage and rows of chairs",
    width: 1280,
    height: 960,
    note: "Photograph filed in the source Auditorium collection; current use and condition are unconfirmed.",
  },
  {
    name: "AV room",
    image: "/images/facilities/AVRoom3.jpeg",
    alt: "Room with seating facing a presentation area",
    width: 1280,
    height: 960,
    note: "Photograph filed in the source AVRoom collection; current use and equipment are unconfirmed.",
  },
  {
    name: "Canteen",
    note: "The recovered Canteen images show a branded storefront; they are withheld until its location and relationship to the college are confirmed.",
  },
  {
    name: "Classrooms",
    note: "Classroom photographs contain identifiable people and are withheld pending publication review.",
  },
  {
    name: "Sports turf",
    image: "/images/facilities/CricketTurf4.jpg",
    imagePosition: "bottom",
    alt: "Outdoor sports turf with players in the distance",
    width: 1280,
    height: 960,
    note: "Photograph filed in the source CricketTurf collection; current availability and permitted use are unconfirmed.",
  },
  {
    name: "Gym",
    image: "/images/facilities/gym.jpg",
    alt: "Exercise equipment and weights in an indoor gym",
    width: 1600,
    height: 1066,
    note: "Photograph filed in the source Gym collection; current availability and equipment are unconfirmed.",
  },
  {
    name: "Library",
    image: "/images/facilities/library4.jpeg",
    alt: "Library tables and shelving",
    width: 1280,
    height: 960,
    note: "The source Library photograph includes a location overlay; only its upper portion is shown.",
  },
  {
    name: "Digital library",
    note: "The available digital-library photographs contain identifiable people and are withheld pending publication review.",
  },
  {
    name: "Accessibility-related facilities",
    image: "/images/facilities/divyang5.jpeg",
    alt: "Interior doorway and rail detail from the source accessibility-related image collection",
    width: 960,
    height: 1280,
    note: "The image is filed in the source Divyang collection; the feature shown and current accessibility provision are not confirmed.",
  },
];

export const homepageFacilityHighlights = [
  campusFacilities[0],
  campusFacilities[6],
  campusFacilities[7],
];

type EventSourceGroup = {
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
    title: "Beach Cleaning",
    imageCount: 15,
    period: "The source collection folder is labelled 2025–26; exact event dates were not recovered.",
    folder: "Beach_Cleaning_2025_26",
    prefix: "Beach_Cleaning_2025_26",
    extension: ".jpg",
  },
  {
    title: "Career Counselling for B.Sc. IT Students",
    imageCount: 12,
    period: "The source collection folder is labelled 2025–26; exact event dates were not recovered.",
    folder: "CAREER_COUNSELLING_FOR_BSCIT_STUDENTS_2025_26",
    prefix: "CAREER_COUNSELLING_FOR_BSCIT_STUDENTS_2025_26",
    extension: ".jpg",
  },
  {
    title: "E-LAN Fest",
    imageCount: 18,
    period: "The source collection folder is labelled 2025–26; exact event dates were not recovered.",
    folder: "E-LAN_FEST_2025-26",
    prefix: "E-LAN_FEST_2025-26",
    extension: ".jpg",
    uppercaseExtensionIndices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 14, 17, 18],
  },
  {
    title: "Industrial Visit",
    imageCount: 15,
    period: "The source collection folder is labelled 2025–26; exact event dates were not recovered.",
    folder: "Industrial_Visit_2025_26",
    prefix: "Industrial_Visit_2025_26",
    extension: ".jpg",
  },
  {
    title: "Sports Day",
    imageCount: 24,
    period: "The source collection folder is labelled 2025–26; exact event dates were not recovered.",
    folder: "Sports_Day_2025_26",
    prefix: "Sports_Day_2025_26",
    extension: ".JPG",
  },
];

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
