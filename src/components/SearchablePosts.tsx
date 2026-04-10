"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

const fmt = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function formatDate(value: string) {
  return fmt.format(new Date(value));
}

type Props = {
  posts: Post[];
};

export default function SearchablePosts({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [posts, query]);

  return (
    <>
      <div className="search-bar">
        <input
          type="search"
          placeholder="게시글 검색…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          aria-label="게시글 검색"
        />
        {query && (
          <span className="search-count">
            {filtered.length} / {posts.length}
          </span>
        )}
      </div>

      <section className="posts-grid" aria-label="Posts">
        {filtered.length === 0 ? (
          <p className="no-results">검색 결과가 없습니다.</p>
        ) : (
          filtered.map((post) => (
            <article key={post.slug} className="post-card">
              <div>
                <div className="meta-line">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readingTime}</span>
                  <span>{post.author}</span>
                </div>
                <h2>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <div className="chip-row">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"))}`}
                      className="chip chip-link"
                    >
                      {tag}
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
          ))
        )}
      </section>
    </>
  );
}
