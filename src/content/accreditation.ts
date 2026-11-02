export const accreditationArchiveSummary = {
  pdfCount: 90,
  categories: [
    "NAAC certificate",
    "Criterion-wise evidence",
    "DVV clarification evidence",
    "SSR supporting material",
    "Minutes of meeting",
    "Research publications",
    "Stakeholder feedback evidence",
  ],
} as const;

export const unavailableDvvDocuments = [
  {
    filename: "2-1.pdf",
    path: "/naac/dvv/criterion-2/2-1/2-1.pdf",
    note: "The archived source report records this URL as unavailable. A recovered metric 2.1.1 document is a distinct file and is not assumed to be a replacement.",
  },
  {
    filename: "2-2.pdf",
    path: "/naac/dvv/criterion-2/2-2/2-2.pdf",
    note: "The archived source report records this URL as unavailable; no equivalent replacement was established.",
  },
  {
    filename: "4-4-1-front-page.pdf",
    path: "/naac/dvv/criterion-4/4-4-1/4-4-1-front-page.pdf",
    note: "The archived source report records this URL as unavailable. Other recovered metric 4.4.1 files are not treated as an exact replacement.",
  },
  {
    filename: "2-4-1.pdf",
    path: "/naac/dvv/criterion-2/2-4-1/2-4-1.pdf",
    note: "The bounded audit recorded an HTTP 404 for this distinct source URL on 1 November 2026.",
  },
] as const;
