import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ImageLightboxProvider } from "@/components/image-lightbox";
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
        <SiteHeader />
        <ImageLightboxProvider>{children}</ImageLightboxProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
