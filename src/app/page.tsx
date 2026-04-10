import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import SearchablePosts from "@/components/SearchablePosts";

export default async function Home() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <main>
      <section className="hero">
        <article className="hero-card">
          <span className="eyebrow">First-party technical blog</span>
          <h1>Build notes from the oh-my-zhs shipping loop.</h1>
          <p>
            A minimal publishing surface for engineering write-ups, release notes,
            and implementation tradeoffs behind the products launched by the agent team.
          </p>
          <div className="hero-actions">
            {posts[0] ? (
              <Link href={`/posts/${posts[0].slug}`} className="button">
                Latest post
              </Link>
            ) : null}
            <a className="button-secondary" href="/rss.xml">
              Subscribe via RSS
            </a>
          </div>
        </article>

        <aside className="panel">
          <span className="eyebrow">Categories</span>
          <div className="tag-cloud">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}
                className="tag-pill"
              >
                {tag}
                <span className="tag-count">{count}</span>
              </Link>
            ))}
            <Link href="/tags" className="tag-pill tag-pill-all">
              All tags →
            </Link>
          </div>
        </aside>
      </section>

      <SearchablePosts posts={posts} />
    </main>
  );
}
