import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900" />
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute left-[20%] top-[240px] h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl dark:bg-emerald-900/15" />
      </div>

      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="fade-up delay-1">
          <h1 className="text-8xl font-bold tracking-tight text-neutral-200 dark:text-neutral-800">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              Blog
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
