import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "K.H.M.W. College",
    template: "%s | K.H.M.W. College",
  },
  description:
    "College academic information, campus facilities and student resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader showNaacMark={process.env.NEXT_PUBLIC_NAAC_MARK_APPROVED === "true"} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
