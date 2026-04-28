import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Share2 } from "lucide-react";
import { ShareProfileButton } from "./share-button";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        
        {/* Two Column Card Layout */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          {/* Left Sidebar - Profile Card */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-border bg-muted">
                  {logoUrl ? (
                    <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="112px" intrinsicWidth={112} intrinsicHeight={112} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Name & Domain */}
              <div className="mt-4 text-center">
                <h1 className="text-xl font-bold text-foreground">{brandName}</h1>
                {domain ? (
                  <p className="mt-1 text-sm text-muted-foreground">{domain}</p>
                ) : null}
              </div>
              
              {/* Stats Row */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-y border-border py-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center border-l border-border">
                  <p className="text-lg font-semibold text-foreground">1</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div className="text-center border-l border-border">
                  <p className="text-lg font-semibold text-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              
              {/* Website Link */}
              {website && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground truncate">
                    {domain}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Right Content Area */}
          <div className="space-y-6">
            {/* About Card */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
                <article
                  className="article-content prose prose-slate text-base leading-relaxed prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
                <div className="mt-6">
                  <ShareProfileButton url={`${baseUrl}/profile/${post.slug}`} />
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <Card className="mt-6 border-border bg-card/60">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground">Related links</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {suggestedArticles.slice(0, 3).map((article) => (
                    <li key={`related-${article.id}`}>
                      <Link
                        href={buildPostUrl("article", article.slug)}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                      Browse all profiles
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
