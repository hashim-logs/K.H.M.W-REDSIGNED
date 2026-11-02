const collegeSite = "https://khmwcollege.org";

export type AcademicSource = {
  label: string;
  href: string;
  note?: string;
};

export const coursePageSources: AcademicSource[] = [
  { label: "BMS", href: `${collegeSite}/b-m-s.html` },
  { label: "B.Com", href: `${collegeSite}/b-com.html` },
  { label: "B.Sc. IT", href: `${collegeSite}/bsc-it.html` },
  {
    label: "BAFF",
    href: `${collegeSite}/baff.html`,
    note: "The audit also records this course as BAF/BAFF.",
  },
  { label: "M.Com", href: `${collegeSite}/m-com.html` },
];

export const enquiryFormCourseOptions = ["B.B.A.", "B.Com.", "B.Sc.", "M.B.A."];

export const academicResources: AcademicSource[] = [
  {
    label: "Academic Calendar page",
    href: `${collegeSite}/academic-calendar.html`,
    note: "The reviewed page displays 2018–19; it is not presented as a current calendar.",
  },
  {
    label: "Prospectus page",
    href: `${collegeSite}/prospectus.html`,
    note: "The audit found its “Click here to Form” link leads to degree-college.html; the application destination is unclear.",
  },
];

export const academicSourceUrls = {
  homepage: `${collegeSite}/`,
  prospectus: `${collegeSite}/prospectus.html`,
} as const;
