export type StudentDocument = {
  title: string;
  href: string;
};

export const studentCornerPages = [
  { label: "Notices & circulars", href: "/student-corner/notices", description: "Two archived examination notice PDFs, hosted locally." },
  { label: "Timetables", href: "/student-corner/timetables", description: "Nineteen archived timetable PDFs grouped by source category." },
  { label: "Results", href: "/student-corner/results", description: "Result files are withheld pending privacy and publication review." },
  { label: "Examinations", href: "/student-corner/examinations", description: "Local examination notices and timetable directory." },
  { label: "Academic calendar", href: "/student-corner/academic-calendar", description: "The historical 2018–19 calendar observation; no current calendar found." },
] as const;

const documentRoot = "/documents/exam-timetable";

function documents(directory: string, names: string[], aliases: Record<string, string> = {}): StudentDocument[] {
  return names.map((title) => ({
    title,
    href: `${documentRoot}/${directory}/${aliases[title] ?? title}`,
  }));
}

export const examNoticeDocuments = documents("notice-circular", [
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
        items: documents("commerce-management/nep-atkt-exam-timetable", [
          "nep-sem-1.pdf",
          "nep-sem-2.pdf",
          "nep-sem-3.pdf",
          "nep-sem-4.pdf",
        ]),
      },
      {
        title: "Non-NEP ATKT timetables",
        items: documents("commerce-management/non-nep-atkt-exam-timetable", [
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
        items: documents("science-technology/nep-atkt-exam-timetable", [
          "sem-1.pdf",
          "sem-2.pdf",
          "sem-3.pdf",
          "sem-4.pdf",
          "sem-5.pdf",
        ], { "sem-3.pdf": "sem-1.pdf", "sem-4.pdf": "sem-2.pdf" }),
      },
      {
        title: "Non-NEP ATKT timetables",
        items: documents("science-technology/non-nep-atkt-exam-timetable", [
          "Internal-ATKT-Non-NEP.pdf",
          "sem-1.pdf",
          "sem-2.pdf",
          "sem-3.pdf",
          "sem-4.pdf",
        ], { "sem-3.pdf": "sem-1.pdf", "sem-4.pdf": "sem-2.pdf" }),
      },
    ],
  },
] as const;

export const resultDocumentFilenames = [
  "FYBAF.pdf",
  "FYBCOM.pdf",
  "FYBMS.pdf",
  "FYBSCIT.pdf",
  "SYBAF.pdf",
  "SYBCOM.pdf",
  "SYBMS.pdf",
  "SYBSCIT.pdf",
] as const;

export const historicalAcademicCalendar = {
  title: "Academic Calendar 2018–19",
  displayedPeriod: "2018–19",
} as const;

export const studentDocumentCounts = {
  timetablePdfs: timetableCollections.reduce(
    (count, collection) => count + collection.categories.reduce((subtotal, category) => subtotal + category.items.length, 0),
    0,
  ),
  examinationCircularPdfs: examNoticeDocuments.length,
  resultPdfs: resultDocumentFilenames.length,
} as const;
