import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SITE_URL = process.env.SITE_URL ?? "https://blog.oh-my-zhs.com";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
};

type PostFrontmatter = Omit<Post, "slug" | "content">;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));

const readPostFile = async (fileName: string): Promise<Post> => {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug: fileName.replace(/\.md$/, ""),
    content,
    ...(data as PostFrontmatter),
  };
};

export const getAllPosts = cache(async () => {
  const entries = await fs.readdir(POSTS_DIR);
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".md"))
      .map((entry) => readPostFile(entry)),
  );

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
});

export const getPostBySlug = cache(async (slug: string) => {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
});

export function getPostUrl(slug: string) {
  return `${SITE_URL}/posts/${slug}`;
}

export function formatPostDate(value: string) {
  return formatDate(value);
}
