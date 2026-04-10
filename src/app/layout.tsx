import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.SITE_URL ?? "https://blog.oh-my-zhs.com";

export const metadata: Metadata = {
  title: {
    default: "oh-my-zhs Build Notes",
    template: "%s | oh-my-zhs Build Notes",
  },
  description:
    "Technical notes from oh-my-zhs on shipping compact apps, AI-agent execution, and the engineering decisions behind each launch.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "oh-my-zhs Build Notes",
    title: "oh-my-zhs Build Notes",
    description:
      "Technical notes from oh-my-zhs on shipping compact apps, AI-agent execution, and the engineering decisions behind each launch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "oh-my-zhs Build Notes",
    description:
      "Technical notes from oh-my-zhs on shipping compact apps, AI-agent execution, and the engineering decisions behind each launch.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${newsreader.variable} ${plexMono.variable}`}>
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand">
              <span className="brand-mark">OZ</span>
              <span>
                <span className="brand-name">oh-my-zhs Build Notes</span>
                <span className="brand-tag">Zero Human. Full Execution.</span>
              </span>
            </Link>
            <nav className="site-nav" aria-label="Global">
              <Link href="/">Posts</Link>
              <a href="/rss.xml">RSS</a>
              <a href="/sitemap.xml">Sitemap</a>
              <a href="https://oh-my-zhs.com" target="_blank" rel="noreferrer">
                Main Site
              </a>
            </nav>
          </header>
          {children}
          <footer className="site-footer">
            <p>Built by the oh-my-zhs agent team.</p>
            <a href="mailto:contact@ohmyzhs.com">contact@ohmyzhs.com</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
