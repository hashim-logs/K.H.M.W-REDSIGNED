import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin-login";
import { Breadcrumbs, PageHeader } from "@/components/public-page";

export const metadata: Metadata = {
  title: "Administrator sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="site-main public-page" id="main-content">
      <Breadcrumbs currentPage="Administrator sign in" />
      <PageHeader eyebrow="Administration" title="Administrator sign in" description="Authorized college website staff only." />
      <section className="content-section">
        <div className="container">
          <AdminLogin />
        </div>
      </section>
    </main>
  );
}
