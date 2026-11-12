export const facultyDirectoryContent = {
  rosterPageObserved: true,
  individualProfileRoutesObserved: true,
  originalPortraitCount: 20,
  enhancedPortraitCount: 17,
} as const;

export const historicalFacultyPortraits = [
  {
    name: "Dr. Abid Hussain Jagirdar",
    image: "abid-hussain-jagirdar.png",
    width: 1194,
    height: 1600,
    qualifications: "PhD, M.COM, B.ED",
  },
  {
    name: "MR. Abid Dhuka",
    image: "abid-dhuka-shaikh.png",
    width: 1069,
    height: 1600,
    qualifications: "M.A. B.ED M.C.P.",
  },
  {
    name: "MR. Mohammad Haroon",
    image: "mohammad-haroon.png",
    width: 1072,
    height: 1600,
    qualifications: "M.COM-IPCC-UGN NET",
  },
  {
    name: "MR. Vinay Kumar Singh",
    image: "vinay-singh.png",
    width: 1209,
    height: 1300,
    qualifications: "M.S.C. B.ED",
  },
  {
    name: "MISS. Afrin Nisar Shaikh",
    image: "afrin-nisar-shaikh.png",
    width: 1076,
    height: 1600,
    qualifications: "M.COM",
  },
  {
    name: "MISS. Shireen Banu",
    image: "shireen-shaikh.png",
    width: 1024,
    height: 1536,
    qualifications: "M.COM",
  },
  {
    name: "MR. Shaikh Fahim",
    image: "fahim-shaikh.png",
    width: 1072,
    height: 1600,
    qualifications: "M.Sc IT",
  },
  {
    name: "MR. Khan Raheel Mohammed Israr",
    image: "raheel-khan.png",
    width: 1072,
    height: 1600,
    qualifications: "MCA, B.Ed, MA, SET, CTET",
  },
  {
    name: "Prof. Adil Shah",
    image: "adil-shah.png",
    width: 1066,
    height: 1600,
    qualifications: "M.Com",
  },
  {
    name: "MR. Shrishyam Shankar Mishra",
    image: "shrishyam-mishra.png",
    width: 1024,
    height: 1536,
    qualifications: "M.Com, MBA",
  },
  {
    name: "MR. Mayur A. Kumawat",
    image: "mayur-kumawat.png",
    width: 1072,
    height: 1600,
    qualifications: "M.Com, MA (Eco)",
  },
  {
    name: "Prof. Afiya Khan",
    image: "afiya-khan.png",
    width: 1194,
    height: 1600,
    qualifications: "M.Com (Accountancy)",
  },
] as const;

export const unmatchedEnhancedPortraits = [
  "akil-shaikh.png — original page says “MR. Aqueel Shaikh”; name and portrait correspondence is not sufficiently certain.",
  "hani-haroon.png — visual identity correspondence requires manual confirmation.",
  "kirti-mishra.png — visual identity correspondence requires manual confirmation.",
  "sohaib-gulam-patel.png — original page says “MR. Soheb Gulam Patel”; spelling and portrait correspondence require confirmation.",
  "syma-bot.png — faculty portrait filename for teacher Syma Bot; preserve the surname spelling and verify portrait mapping and current roster before display.",
] as const;
