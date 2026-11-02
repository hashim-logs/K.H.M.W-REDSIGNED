const collegeSite = "https://khmwcollege.org";

export type StudentDocument = {
  title: string;
  href: string;
  auditStatus: string;
};

export const studentCornerPages = [
  { label: "Notices", href: "/student-corner/notices", description: "Published examination circulars and links to other notice sources." },
  { label: "Timetables", href: "/student-corner/timetables", description: "NEP and Non-NEP ATKT timetable PDFs by source category." },
  { label: "Results", href: "/student-corner/results", description: "Eight result PDF links grouped by the source filename labels." },
  { label: "Examinations", href: "/student-corner/examinations", description: "Verified exam resources and the unavailable examination-details page." },
  { label: "Academic calendar", href: "/student-corner/academic-calendar", description: "The historical calendar page, labeled 2018–19." },
] as const;

function documents(
  directory: string,
  names: string[],
  auditStatus = "HTTP 200 during audit; contents, date and currentness not verified.",
): StudentDocument[] {
  return names.map((title) => ({
    title,
    href: `${collegeSite}/${directory}/${title}`,
    auditStatus,
  }));
}

export const examNoticeDocuments = documents("exam-timetable/notice-circular", [
  "circular.pdf",
  "notice-circular.pdf",
]);

export const timetableCollections = [
  {
    id: "commerce-management",
    discipline: "Commerce and Management",
    categories: [
      {
        title: "NEP ATKT timetables",
        items: documents("exam-timetable/commerce-management/nep-atkt-exam-timetable", [
          "nep-sem-1.pdf",
          "nep-sem-2.pdf",
          "nep-sem-3.pdf",
          "nep-sem-4.pdf",
        ]),
      },
      {
        title: "Non-NEP ATKT timetables",
        items: documents("exam-timetable/commerce-management/non-nep-atkt-exam-timetable", [
          "Internal-ATKT-Non-NEP.pdf",
          "non-nep-sem-1.pdf",
          "non-nep-sem-2.pdf",
          "non-nep-sem-3.pdf",
          "non-nep-sem-4.pdf",
        ]),
      },
    ],
  },
  {
    id: "science-technology",
    discipline: "Science and Technology",
    categories: [
      {
        title: "NEP ATKT timetables",
        items: documents("exam-timetable/science-technology/nep-atkt-exam-timetable", [
          "sem-1.pdf",
          "sem-2.pdf",
          "sem-3.pdf",
          "sem-4.pdf",
          "sem-5.pdf",
        ]),
      },
      {
        title: "Non-NEP ATKT timetables",
        items: documents("exam-timetable/science-technology/non-nep-atkt-exam-timetable", [
          "Internal-ATKT-Non-NEP.pdf",
          "sem-1.pdf",
          "sem-2.pdf",
          "sem-3.pdf",
          "sem-4.pdf",
        ]),
      },
    ],
  },
] as const;

const resultStatus = "Linked in source inventory; individual PDF status, content and session not checked.";

export const resultCollections = [
  { id: "fy-bcom", title: "FY B.Com", items: documents("results", ["FYBCOM.pdf"], resultStatus) },
  { id: "sy-bcom", title: "SY B.Com", items: documents("results", ["SYBCOM.pdf"], resultStatus) },
  { id: "baf", title: "BAF", items: documents("results", ["FYBAF.pdf", "SYBAF.pdf"], resultStatus) },
  { id: "bms", title: "BMS", items: documents("results", ["FYBMS.pdf", "SYBMS.pdf"], resultStatus) },
  { id: "bsc-it", title: "B.Sc. IT", items: documents("results", ["FYBSCIT.pdf", "SYBSCIT.pdf"], resultStatus) },
];

export const historicalAcademicCalendar = {
  title: "Academic Calendar 2018–19",
  href: `${collegeSite}/academic-calendar.html`,
  displayedPeriod: "2018–19",
} as const;

export const unavailableExaminationDetailsUrl = `${collegeSite}/examination-details.html`;

export const studentDocumentCounts = {
  timetablePdfs: timetableCollections.reduce(
    (count, collection) => count + collection.categories.reduce((subtotal, category) => subtotal + category.items.length, 0),
    0,
  ),
  examinationCircularPdfs: examNoticeDocuments.length,
  resultPdfs: resultCollections.reduce((count, collection) => count + collection.items.length, 0),
} as const;
