import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { getInsightArticle } from "@/lib/insights/insights.functions";
import { formatDateLong } from "@/lib/insights/format";
import { ArticleList } from "@/components/insights/ArticleList";
import { ArticleCTA } from "@/components/insights/ArticleCTA";
import { LOGO_URL, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OG_INSIGHTS_IMAGE, SITE_URL } from "@/lib/site";
import gabriel from "@/assets/gabriel-conti.jpg";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => getInsightArticle({ data: { slug: params.slug } }),
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artigo não encontrado | Conti Insights" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    const url = `${SITE_URL}/insights/${a.slug}`;
    const image = a.cover ? (a.cover.startsWith("http") ? a.cover : `${SITE_URL}${a.cover}`) : OG_INSIGHTS_IMAGE;
    const title = `${a.title} | Conti Insights`;
    return {
      meta: [
        { title },
        { name: "description", content: a.description },
        { property: "og:title", content: title },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        ...(a.cover ? [] : [{ property: "og:image:width", content: OG_IMAGE_WIDTH }, { property: "og:image:height", content: OG_IMAGE_HEIGHT }]),
        { property: "og:image:alt", content: a.coverAlt ?? a.title },
        { property: "article:published_time", content: a.date },
        { property: "article:modified_time", content: a.updated ?? a.date },
        { property: "article:section", content: a.category.label },
        { property: "article:author", content: a.author.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: a.description },
        { name: "twitter:image", content: image },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", type: "application/rss+xml", title: "Conti Insights", href: `${SITE_URL}/insights/rss.xml` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            image,
            inLanguage: "pt-BR",
            articleSection: a.category.label,
            author: { "@type": "Person", name: a.author.name, jobTitle: a.author.role },
            publisher: {
              "@type": "Organization",
              name: "Conti Consulting",
              url: SITE_URL,
              logo: { "@type": "ImageObject", url: LOGO_URL },
            },
            datePublished: a.date,
            dateModified: a.updated ?? a.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
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
              { "@type": "ListItem", position: 3, name: a.title, item: `${SITE_URL}/insights/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 hero-grid-bg">
      <div className="max-w-xl text-center">
        <span className="label-eyebrow block mb-6">Conti Insights · 404</span>
        <h1 className="headline text-[clamp(36px,5.5vw,64px)] text-ivory mb-6">
          Esta análise <span className="serif-italic-gold">não foi encontrada.</span>
        </h1>
        <p className="text-muted mb-10">Talvez ela tenha mudado de endereço. Veja as publicações mais recentes.</p>
        <Link to="/insights" className="border border-gold px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory hover:bg-gold hover:text-obsidian transition-colors">
          Ver Insights
        </Link>
      </div>
    </main>
  );
}

function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none" aria-hidden="true">
      <div className="h-full bg-gold origin-left" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const cls =
    "font-mono text-[10px] tracking-[0.22em] uppercase border border-border-faint px-4 py-3 text-muted hover:text-ivory hover:border-gold transition-colors";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-dim mr-2">Compartilhar</span>
      <a className={cls} target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
        LinkedIn
      </a>
      <a className={cls} target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}>
        WhatsApp
      </a>
      <button
        type="button"
        className={cls}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* ignore */
          }
        }}
      >
        {copied ? "Link copiado" : "Copiar link"}
      </button>
    </div>
  );
}

function ArticlePage() {
  const { article: a, related } = Route.useLoaderData();
  const router = useRouter();
  const url = `${SITE_URL}/insights/${a.slug}`;

  const onBodyClick = (e: MouseEvent<HTMLDivElement>) => {
    const link = (e.target as HTMLElement).closest("a[data-internal]") as HTMLAnchorElement | null;
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    router.history.push(link.getAttribute("href")!);
  };

  return (
    <main>
      <ReadingProgress />
      <article>
        <header className="relative pt-36 md:pt-44 pb-14 md:pb-20 px-6 md:px-14 overflow-hidden">
          <div className="absolute inset-0 hero-radial pointer-events-none" />
          <div className="relative max-w-[680px] mx-auto">
            <nav aria-label="Breadcrumb" className="font-mono text-[10px] tracking-[0.22em] uppercase text-dim mb-10 flex flex-wrap gap-2">
              <Link to="/" className="hover:text-ivory transition-colors">Início</Link>
              <span>/</span>
              <Link to="/insights" className="hover:text-ivory transition-colors">Insights</Link>
              <span>/</span>
              <Link to="/insights" search={{ categoria: a.category.slug }} className="text-gold hover:text-gold-light transition-colors">
                {a.category.label}
              </Link>
            </nav>
            <h1 className="headline hero-h1-in text-[clamp(36px,5.6vw,64px)] text-ivory mb-8">{a.title}</h1>
            <p className="font-serif italic text-[clamp(20px,2.2vw,26px)] leading-[1.45] text-muted mb-12">{a.description}</p>
            <div className="flex items-center gap-4 border-t border-border-faint pt-8">
              <img src={gabriel} alt={a.author.name} width={48} height={48} className="w-12 h-12 object-cover grayscale" />
              <div className="flex flex-col gap-1">
                <span className="text-ivory text-[14px]">{a.author.name}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-dim">
                  {a.author.role} · <time dateTime={a.date}>{formatDateLong(a.date)}</time> · {a.readingTime} min de leitura
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-14 pb-16">
          <div
            className="insight-prose max-w-[680px] mx-auto"
            onClick={onBodyClick}
            dangerouslySetInnerHTML={{ __html: a.html }}
          />
          <div className="max-w-[680px] mx-auto mt-16 pt-10 border-t border-border-faint">
            <ShareButtons url={url} title={a.title} />
            <div className="mt-14 flex flex-col sm:flex-row gap-6 items-start bg-graphite p-6 sm:p-8">
              <img src={gabriel} alt="Gabriel Conti" width={72} height={72} className="w-[72px] h-[72px] object-cover grayscale shrink-0" />
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold block mb-3">Sobre o autor</span>
                <p className="text-muted text-[14px] leading-[1.8]">
                  <strong className="text-ivory font-normal">Gabriel Conti</strong> é fundador da Conti Consulting e atua há
                  mais de uma década com vendas B2B, operações e tecnologia, com especialização em Inteligência Artificial
                  pela PUCPR. Escreve sobre aplicação prática de IA, automação e dados em problemas reais de negócio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-6 md:px-14 py-20 md:py-28 border-t border-border-faint" aria-labelledby="continue">
          <div className="max-w-[860px] mx-auto">
            <span className="label-eyebrow block mb-4">Continue lendo</span>
            <h2 id="continue" className="font-serif font-light text-[clamp(28px,3.4vw,42px)] text-ivory mb-10">
              Outras análises
            </h2>
            <ArticleList articles={related} />
          </div>
        </section>
      )}

      <ArticleCTA />
    </main>
  );
}
