import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPosts, getPostBySlug, listPostSlugs } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

export const dynamic = "force-static";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} · Blog`,
      description: `Blog post from ${post.date}: ${post.title}`,
    };
  } catch {
    return {};
  }
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const html = await markdownToHtml(post.content);
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute left-[20%] top-[240px] h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          >
            ← Blog
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          >
            Home
          </Link>
        </div>

        <article className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <header className="border-b border-neutral-100 p-6 sm:p-8">
            <div className="text-xs text-neutral-500">{formatDate(post.date)}</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>
            {post.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] text-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div
            className="prose prose-neutral blog-prose max-w-none p-6 sm:p-8 prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
            // markdown is from your own repo; still keep it simple
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        <nav className="mt-8 flex items-center justify-between gap-4 text-sm">
          <div>
            {newer ? (
              <Link className="text-neutral-700 hover:underline" href={`/blog/${newer.slug}`}>
                ← {newer.title}
              </Link>
            ) : null}
          </div>
          <div className="text-right">
            {older ? (
              <Link className="text-neutral-700 hover:underline" href={`/blog/${older.slug}`}>
                {older.title} →
              </Link>
            ) : null}
          </div>
        </nav>
      </main>
    </div>
  );
}
