import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  date: string; // ISO (YYYY-MM-DD)
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  tags: string[];
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function assertBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    throw new Error(`Blog directory not found: ${BLOG_DIR}`);
  }
}

export function listPostSlugs(): string[] {
  assertBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPost[] {
  assertBlogDir();
  const slugs = listPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  // newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export function getPostBySlug(slug: string): BlogPost {
  assertBlogDir();
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Partial<BlogFrontmatter>;

  if (!data.title || !data.date) {
    throw new Error(
      `Missing required frontmatter (title/date) in ${path.relative(
        process.cwd(),
        filePath,
      )}`,
    );
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.map(String)
    : data.tags
      ? [String(data.tags)]
      : [];

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    tags,
    content: parsed.content.trim() + "\n",
  };
}
