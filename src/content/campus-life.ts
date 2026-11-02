export const campusFacilities = [
  {
    name: "Computer lab",
    image: "/images/facilities/computer-lab.jpg",
    alt: "Computer workstations arranged around the walls of a college lab",
    width: 1280,
    height: 960,
    note: "The source image is stored in the archive’s ComputerLab1 collection.",
  },
  {
    name: "Gym",
    image: "/images/facilities/gym.jpg",
    alt: "Exercise equipment and weights in an indoor gym",
    width: 1600,
    height: 1066,
    note: "The source image is stored in the archive’s Gym collection.",
  },
] as const;

export const eventSourceGroups = [
  { title: "Beach Cleaning", period: "Source image folder labeled 2025–26." },
  { title: "Career Counselling for B.Sc. IT Students", period: "Source image folder labeled 2025–26." },
  { title: "E-LAN Fest", period: "Source image folder labeled 2025–26." },
  { title: "Industrial Visit", period: "Source image folder labeled 2025–26." },
  { title: "Sports Day", period: "Source image folder labeled 2025–26." },
] as const;

export const studentActivitySourcePages = [
  "Clubs",
  "NSS",
  "Culture Club",
  "English Social Club",
  "Social Club Committee",
] as const;
