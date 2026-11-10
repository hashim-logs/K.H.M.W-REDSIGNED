import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Newsreader } from "next/font/google";
import { ImageLightboxProvider } from "@/components/image-lightbox";
import { SiteFooter } from "@/components/public-page";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

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
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`}>
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
