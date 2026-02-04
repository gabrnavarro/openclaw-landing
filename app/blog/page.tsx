import Link from "next/link";

import { getAllPosts } from "@/lib/blog";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute left-[20%] top-[240px] h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Writing archive.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          >
            Home
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <ul className="divide-y divide-neutral-100">
            {posts.map((p) => (
              <li key={p.slug} className="p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-base font-semibold tracking-tight text-neutral-900 hover:underline"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-neutral-500">{formatDate(p.date)}</div>
                </div>

                {p.tags.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
