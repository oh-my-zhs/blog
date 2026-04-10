import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag, formatPostDate } from "@/lib/posts";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({
    tag: encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-")),
  }));
}

async function resolveTag(tagSlug: string): Promise<string | null> {
  const decoded = decodeURIComponent(tagSlug).replace(/-/g, " ");
  const tags = await getAllTags();
  const match = tags.find(
    ({ tag }) => tag.toLowerCase() === decoded.toLowerCase(),
  );
  return match?.tag ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = await resolveTag(tagSlug);
  if (!tag) return {};
  return {
    title: `#${tag}`,
    description: `Posts tagged with "${tag}" on oh-my-zhs Build Notes.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = await resolveTag(tagSlug);

  if (!tag) notFound();

  const posts = await getPostsByTag(tag!);

  return (
    <main>
      <div className="page-header">
        <Link href="/tags" className="back-link">
          ← All tags
        </Link>
        <span className="eyebrow">Tag</span>
        <h1 className="page-title">#{tag}</h1>
        <p className="page-subtitle">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
      </div>

      <section className="posts-grid" aria-label={`Posts tagged ${tag}`}>
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <div>
              <div className="meta-line">
                <span>{formatPostDate(post.publishedAt)}</span>
                <span>{post.readingTime}</span>
                <span>{post.author}</span>
              </div>
              <h2>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
              <div className="chip-row">
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${encodeURIComponent(t.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="chip chip-link"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
            <div className="feed-links">
              <Link href={`/posts/${post.slug}`} className="mini-link">
                Read post
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
