import type { MetadataRoute } from "next";
import { getAllPosts, getPostUrl } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL ?? "https://blog.oh-my-zhs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    {
      url: SITE_URL,
      lastModified: posts[0]?.updatedAt ?? posts[0]?.publishedAt ?? new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/rss.xml`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.4,
    },
    ...posts.map((post) => ({
      url: getPostUrl(post.slug),
      lastModified: post.updatedAt ?? post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
