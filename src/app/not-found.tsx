import Link from "next/link";
import { Breadcrumbs, ContentSection, PageHeader } from "@/components/public-page";

export default function NotFound() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Page not found" />
      <PageHeader
        eyebrow="404"
        title="Page not found"
        description="The requested page could not be found."
      />
      <ContentSection id="not-found-navigation" title="Continue browsing" tone="muted">
        <p><Link href="/">Return to the homepage</Link></p>
      </ContentSection>
    </main>
  );
}
