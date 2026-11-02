import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-navy">
        Page not found
      </h1>
      <p className="mt-4 text-base leading-7 text-near-black">
        The requested page could not be found.
      </p>
      <Link className="mt-6 w-fit font-medium text-muted-blue underline" href="/">
        Return to the starting page
      </Link>
    </main>
  );
}
