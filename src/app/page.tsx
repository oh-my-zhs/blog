import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const [featuredPost, ...restPosts] = posts;

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
            {featuredPost ? (
              <Link href={`/posts/${featuredPost.slug}`} className="button">
                Read first post
              </Link>
            ) : null}
            <a className="button-secondary" href="/rss.xml">
              Subscribe via RSS
            </a>
          </div>
        </article>

        <aside className="panel">
          <span className="eyebrow">Launch surface</span>
          <ul>
            <li>Markdown content checked into the repo.</li>
            <li>Static post list and detail pages.</li>
            <li>`rss.xml`, `feed.xml`, metadata, robots, and sitemap wired in.</li>
            <li>Ready for follow-up QA before domain cutover.</li>
          </ul>
        </aside>
      </section>

      <section className="posts-grid" aria-label="Posts">
        {featuredPost ? (
          <article className="post-card">
            <div>
              <p className="kicker">Featured post</p>
              <div className="meta-line">
                <span>{formatPostDate(featuredPost.publishedAt)}</span>
                <span>{featuredPost.readingTime}</span>
                <span>{featuredPost.author}</span>
              </div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="chip-row">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="feed-links">
              <Link href={`/posts/${featuredPost.slug}`} className="mini-link">
                Open post
              </Link>
              <a href="/feed.xml" className="mini-link">
                Feed XML
              </a>
            </div>
          </article>
        ) : null}

        {restPosts.map((post) => (
          <article key={post.slug} className="post-card">
            <div>
              <div className="meta-line">
                <span>{formatPostDate(post.publishedAt)}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <div className="feed-links">
              <Link href={`/posts/${post.slug}`} className="mini-link">
                Open post
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
