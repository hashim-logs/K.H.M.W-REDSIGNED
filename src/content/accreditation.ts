const collegeSite = "https://khmwcollege.org";

export const accreditationSourcePages = {
  iqac: `${collegeSite}/iqac-committee.html`,
  ssr: `${collegeSite}/ssr.html`,
  extendedProfile: `${collegeSite}/extended-profile.html`,
  dvvClarification: `${collegeSite}/dvv-clarification.html`,
  dvvExtendedProfile: `${collegeSite}/dvv-extended-profile.html`,
  certificate: `${collegeSite}/naac/naac-certificate.pdf`,
} as const;

export const accreditationSourcePageLinks = [
  {
    label: "IQAC committee page",
    href: accreditationSourcePages.iqac,
    description: "Listed in the audit; current contents and committee details are not verified.",
  },
  {
    label: "Self Study Report (SSR) page",
    href: accreditationSourcePages.ssr,
    description: "Listed in the audit; contents and current institutional scope are not verified.",
  },
  {
    label: "Extended Profile page",
    href: accreditationSourcePages.extendedProfile,
    description: "Listed in the audit; current contents are not verified.",
  },
  {
    label: "DVV Clarification page",
    href: accreditationSourcePages.dvvClarification,
    description: "Listed in the audit; current contents and document links are not verified.",
  },
  {
    label: "DVV Extended Profile page",
    href: accreditationSourcePages.dvvExtendedProfile,
    description: "Listed in the audit; current contents and document links are not verified.",
  },
] as const;

export const unavailableDvvDocuments = [
  {
    filename: "2-1.pdf",
    path: "/naac/dvv/criterion-2/2-1/2-1.pdf",
    status: "unavailable",
    note: "The content-status record reports a 404, but the underlying archive report and observation date were not located. The asset inventory did not individually check this URL.",
  },
  {
    filename: "2-2.pdf",
    path: "/naac/dvv/criterion-2/2-2/2-2.pdf",
    status: "unavailable",
    note: "The content-status record reports a 404, but the underlying archive report and observation date were not located. The asset inventory did not individually check this URL.",
  },
  {
    filename: "4-4-1-front-page.pdf",
    path: "/naac/dvv/criterion-4/4-4-1/4-4-1-front-page.pdf",
    status: "unavailable",
    note: "The content-status record reports a 404, but the underlying archive report and observation date were not located. The asset inventory did not individually check this URL.",
  },
  {
    filename: "2-4-1.pdf",
    path: "/naac/dvv/criterion-2/2-4-1/2-4-1.pdf",
    status: "unavailable",
    note: "WEBSITE_AUDIT.md §5 records an HTTP 404 on 1 November 2026. This is a bounded audit observation, not a current availability check.",
  },
] as const;
