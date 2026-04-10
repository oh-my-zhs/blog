import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all topics covered on oh-my-zhs Build Notes.",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <main>
      <div className="page-header">
        <span className="eyebrow">Browse by topic</span>
        <h1 className="page-title">All Tags</h1>
      </div>

      <section className="tags-grid">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}
            className="tag-card"
          >
            <span className="tag-card-name">{tag}</span>
            <span className="tag-card-count">{count} post{count !== 1 ? "s" : ""}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
