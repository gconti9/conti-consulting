import { Link } from "@tanstack/react-router";
import type { ArticleMeta } from "@/lib/insights/types";
import { Reveal, SectionRule } from "./Reveal";
import { ArticleList } from "./insights/ArticleList";

export function InsightsSection({ articles }: { articles: ArticleMeta[] }) {
  if (!articles.length) return null;
  return (
    <section id="insights" className="relative py-32 md:py-40 border-t border-border-faint">
      <div className="max-w-[1240px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20">
          <div>
            <SectionRule />
            <span className="label-eyebrow block mb-5">Insights</span>
            <Reveal>
              <h2 className="headline text-[clamp(36px,4.8vw,60px)] text-ivory mb-6">
                Ideias para empresas<br />
                <span className="serif-italic-gold">que querem operar melhor.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted text-[15px] leading-[1.85] max-w-md mb-10">
                Análises práticas sobre IA, dados, vendas e operações.
              </p>
              <Link to="/insights" className="link-underline font-mono text-[10px] tracking-[0.25em] uppercase text-gold">
                Ver todos os insights →
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <ArticleList articles={articles.slice(0, 3)} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
