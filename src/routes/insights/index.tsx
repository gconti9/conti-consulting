import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { getInsightsList } from "@/lib/insights/insights.functions";
import { CATEGORIES, type ArticleMeta } from "@/lib/insights/types";
import { formatDateShort } from "@/lib/insights/format";
import { Reveal } from "@/components/Reveal";
import { FeaturedArt } from "@/components/insights/FeaturedArt";
import { ArticleCTA } from "@/components/insights/ArticleCTA";
import { LOGO_URL, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OG_INSIGHTS_IMAGE, SITE_URL } from "@/lib/site";

const TITLE = "Conti Insights — IA aplicada a problemas reais de negócio";
const DESC =
  "Análises sobre IA, processos, dados, vendas e crescimento empresarial. IA aplicada a problemas reais de negócio. Sem hype.";

export const Route = createFileRoute("/insights/")({
  validateSearch: z.object({ categoria: z.string().optional() }),
  loader: () => getInsightsList(),
  head: ({ loaderData }) => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/insights` },
      { property: "og:image", content: OG_INSIGHTS_IMAGE },
      { property: "og:image:width", content: OG_IMAGE_WIDTH },
      { property: "og:image:height", content: OG_IMAGE_HEIGHT },
      { property: "og:image:alt", content: "Conti Insights — IA aplicada a problemas reais de negócio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_INSIGHTS_IMAGE },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/insights` },
      { rel: "alternate", type: "application/rss+xml", title: "Conti Insights", href: `${SITE_URL}/insights/rss.xml` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Conti Insights",
          url: `${SITE_URL}/insights`,
          description: DESC,
          inLanguage: "pt-BR",
          publisher: {
            "@type": "Organization",
            name: "Conti Consulting",
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: LOGO_URL },
          },
          blogPost: (loaderData ?? []).map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            dateModified: a.updated ?? a.date,
            url: `${SITE_URL}/insights/${a.slug}`,
            author: { "@type": "Person", name: a.author.name },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
          ],
        }),
      },
    ],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  const articles = Route.useLoaderData();
  const { categoria } = Route.useSearch();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const available = CATEGORIES.filter((c) => articles.some((a) => a.category.slug === c.slug));
  const filtered = categoria ? articles.filter((a) => a.category.slug === categoria) : articles.filter((a) => a !== featured);

  return (
    <main>
      <header className="relative pt-40 md:pt-48 pb-20 md:pb-24 px-6 md:px-14 overflow-hidden">
        <div className="absolute inset-0 hero-radial pointer-events-none" />
        <div className="relative max-w-[1240px] mx-auto">
          <span className="label-eyebrow block mb-8">Conti Insights</span>
          <h1 className="headline hero-h1-in text-[clamp(44px,7.5vw,104px)] text-ivory mb-8">
            Inteligência que<br />
            <span className="serif-italic-gold">vira operação.</span>
          </h1>
          <p className="text-muted text-[16px] md:text-[18px] leading-[1.7] max-w-xl">
            Análises sobre IA, processos, dados, vendas e crescimento empresarial.
          </p>
        </div>
      </header>

      {featured && !categoria && (
        <FeaturedArticle article={featured} edition={articles.length - articles.indexOf(featured)} />
      )}

      <section className="px-6 md:px-14 py-20 md:py-28" aria-labelledby="todas">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <h2 id="todas" className="font-serif font-light text-[clamp(28px,3.4vw,42px)] text-ivory">
              {categoria ? CATEGORIES.find((c) => c.slug === categoria)?.label ?? "Análises" : "Todas as análises"}
            </h2>
            <nav aria-label="Filtrar por categoria" className="flex flex-wrap gap-x-6 gap-y-3">
              <FilterLink label="Todas" active={!categoria} />
              {available.map((c) => (
                <FilterLink key={c.slug} label={c.label} slug={c.slug} active={categoria === c.slug} />
              ))}
            </nav>
          </div>

          {filtered.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-faint border border-border-faint">
              {filtered.map((a, i) => (
                <Reveal key={a.slug} delay={Math.min(i, 5) * 0.06} className="bg-obsidian">
                  <ArticleCard article={a} />
                </Reveal>
              ))}
              {Array.from({ length: (2 - (filtered.length % 2)) % 2 }).map((_, i) => (
                <div key={`md${i}`} aria-hidden="true" className="hidden md:block lg:hidden bg-obsidian" />
              ))}
              {Array.from({ length: (3 - (filtered.length % 3)) % 3 }).map((_, i) => (
                <div key={`lg${i}`} aria-hidden="true" className="hidden lg:block bg-obsidian" />
              ))}
            </div>
          ) : (
            <p className="text-muted">Nenhuma análise nesta categoria ainda.</p>
          )}
        </div>
      </section>

      <ArticleCTA />
    </main>
  );
}

function FilterLink({ label, slug, active }: { label: string; slug?: string; active: boolean }) {
  return (
    <Link
      to="/insights"
      search={slug ? { categoria: slug } : {}}
      resetScroll={false}
      className={`font-mono text-[10px] tracking-[0.25em] uppercase pb-1 border-b transition-colors ${
        active ? "text-gold border-gold" : "text-muted border-transparent hover:text-ivory"
      }`}
    >
      {label}
    </Link>
  );
}

function FeaturedArticle({ article, edition }: { article: ArticleMeta; edition: number }) {
  return (
    <section className="px-6 md:px-14" aria-label="Artigo em destaque">
      <Reveal className="max-w-[1240px] mx-auto">
        <Link
          to="/insights/$slug"
          params={{ slug: article.slug }}
          className="group grid md:grid-cols-2 border border-border-faint hover:border-border transition-colors duration-500"
        >
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px] hero-grid-bg bg-graphite overflow-hidden flex items-center justify-center">
            {article.cover ? (
              <img src={article.cover} alt={article.coverAlt ?? ""} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <FeaturedArt date={formatDateShort(article.date)} dateTime={article.date} edition={edition} />
            )}
          </div>
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <span className="label-eyebrow flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" aria-hidden="true" />
              Em destaque
            </span>
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold mb-6">
              {article.category.label} · {article.readingTime} min de leitura
            </div>
            <h2 className="font-serif font-light text-[clamp(30px,3.6vw,48px)] leading-[1.1] text-ivory mb-6 group-hover:text-gold-light transition-colors duration-500">
              {article.title}
            </h2>
            <p className="text-muted text-[15px] leading-[1.8] mb-10">{article.description}</p>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ivory">
              Ler análise <span className="inline-block text-gold transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: article.slug }}
      className="group relative flex flex-col h-full p-8 md:p-10 hover:bg-graphite transition-colors duration-500"
    >
      <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
      <div className="flex justify-between font-mono text-[10px] tracking-[0.22em] uppercase mb-8">
        <span className="text-gold">{article.category.label}</span>
        <span className="text-dim">{formatDateShort(article.date)}</span>
      </div>
      <h3 className="font-serif font-light text-[26px] leading-[1.2] text-ivory mb-4 group-hover:text-gold-light transition-colors duration-500">
        {article.title}
      </h3>
      <p className="text-muted text-[14px] leading-[1.75] line-clamp-3 mb-10">{article.description}</p>
      <div className="mt-auto flex justify-between font-mono text-[10px] tracking-[0.22em] uppercase">
        <span className="text-dim">{article.readingTime} min</span>
        <span className="text-ivory">
          Ler <span className="inline-block text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
