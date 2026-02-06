import { generateSitemap } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const sitemap = generateSitemap();
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
