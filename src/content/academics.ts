export type AcademicSource = {
  label: string;
  href: string;
  note?: string;
};

export const coursePageSources: AcademicSource[] = [
  { label: "BMS", href: "/academics/bms" },
  { label: "B.Com", href: "/academics/b-com", note: "The audit lists the page, but it could not be retrieved during source review." },
  { label: "B.Sc. IT", href: "/academics/b-sc-it" },
  { label: "BAF / BAFF", href: "/academics/baf", note: "The source records use both BAF and BAFF." },
  { label: "M.Com", href: "/academics/m-com" },
];

export const programmes = [
  { slug: "bms", label: "BMS" },
  { slug: "b-com", label: "B.Com" },
  { slug: "b-sc-it", label: "B.Sc. IT" },
  { slug: "baf", label: "BAF / BAFF" },
  { slug: "m-com", label: "M.Com" },
] as const;

export const enquiryFormCourseOptions = ["B.B.A.", "B.Com.", "B.Sc.", "M.B.A."] as const;
