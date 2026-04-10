import { getAllPosts, getPostUrl } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL ?? "https://blog.oh-my-zhs.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function buildFeedXml() {
  const posts = await getAllPosts();
  const items = posts
    .map((post) => {
      const url = getPostUrl(post.slug);
      const description = escapeXml(post.excerpt);

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>oh-my-zhs Build Notes</title>
    <link>${SITE_URL}</link>
    <description>Technical notes from oh-my-zhs on shipping compact apps and operating an AI-agent team.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;
}
