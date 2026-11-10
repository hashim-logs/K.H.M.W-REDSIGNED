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
  },
  { name: "MR. Abid Dhuka", image: "abid-dhuka-shaikh.png", width: 1069, height: 1600 },
  { name: "MR. Mohammad Haroon", image: "mohammad-haroon.png", width: 1072, height: 1600 },
  { name: "MR. Vinay Kumar Singh", image: "vinay-singh.png", width: 1209, height: 1300 },
  { name: "MISS. Afrin Nisar Shaikh", image: "afrin-nisar-shaikh.png", width: 1076, height: 1600 },
  { name: "MISS. Shireen Banu", image: "shireen-shaikh.png", width: 1024, height: 1536 },
  { name: "MR. Shaikh Fahim", image: "fahim-shaikh.png", width: 1072, height: 1600 },
  { name: "MR. Khan Raheel Mohammed Israr", image: "raheel-khan.png", width: 1072, height: 1600 },
  { name: "Prof. Adil Shah", image: "adil-shah.png", width: 1066, height: 1600 },
  { name: "MR. Shrishyam Shankar Mishra", image: "shrishyam-mishra.png", width: 1024, height: 1536 },
  { name: "MR. Mayur A. Kumawat", image: "mayur-kumawat.png", width: 1072, height: 1600 },
  { name: "Prof. Afiya Khan", image: "afiya-khan.png", width: 1194, height: 1600 },
] as const;

export const unmatchedEnhancedPortraits = [
  "akil-shaikh.png — original page says “MR. Aqueel Shaikh”; name and portrait correspondence is not sufficiently certain.",
  "hani-haroon.png — visual identity correspondence requires manual confirmation.",
  "kirti-mishra.png — visual identity correspondence requires manual confirmation.",
  "sohaib-gulam-patel.png — original page says “MR. Soheb Gulam Patel”; spelling and portrait correspondence require confirmation.",
  "syma-bot.png — not used; the project asset register identifies it as not a faculty portrait.",
] as const;
