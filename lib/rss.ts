import { getAllPosts } from "./blog";

const SITE_URL = "https://gabrnavarro.github.io/openclaw-landing";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateRssFeed(): string {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.date + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${escapeXml(post.title)}</description>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kelly Navarro — Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>SRE with 7+ years running large-scale game and web infrastructure.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

export function generateSitemap(): string {
  const posts = getAllPosts();

  const postUrls = posts
    .map(
      (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${postUrls}
</urlset>
`;
}
