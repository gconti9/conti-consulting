import { Link } from "@tanstack/react-router";
import type { ArticleMeta } from "@/lib/insights/types";
import { formatDateShort } from "@/lib/insights/format";

/** Editorial numbered list (used in home section and "Continue lendo"). */
export function ArticleList({ articles, headingLevel = "h3" }: { articles: ArticleMeta[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="list-none border-t border-border-faint">
      {articles.map((a, i) => (
        <li key={a.slug} className="border-b border-border-faint">
          <Link
            to="/insights/$slug"
            params={{ slug: a.slug }}
            className="group grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr_auto] gap-x-4 md:gap-x-8 gap-y-2 py-8 md:py-10 items-baseline"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-dim mb-3">
                {a.category.label} · {formatDateShort(a.date)}
              </div>
              <H className="font-serif font-light text-[clamp(22px,2.6vw,32px)] leading-[1.2] text-ivory group-hover:text-gold-light transition-colors duration-500">
                {a.title}
              </H>
            </div>
            <span className="col-start-2 md:col-start-auto font-mono text-[10px] tracking-[0.25em] uppercase text-muted group-hover:text-gold transition-colors">
              {a.readingTime} min <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
