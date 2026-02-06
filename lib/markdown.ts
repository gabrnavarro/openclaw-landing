import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { codeToHtml } from "shiki";

export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  let html = String(file);

  // Post-process: replace <pre><code class="language-*"> blocks with shiki-highlighted versions
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
  const matches = [...html.matchAll(codeBlockRegex)];

  for (const match of matches) {
    const lang = match[1];
    const code = match[2]
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    try {
      const highlighted = await codeToHtml(code, {
        lang,
        theme: "github-dark-default",
      });
      html = html.replace(match[0], highlighted);
    } catch {
      // If shiki doesn't support the language, leave the block as-is
    }
  }

  return html;
}
