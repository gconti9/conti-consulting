// Single access point to Insights content. Swap the source here to migrate (e.g. to a database).
import type { Article, ArticleMeta, InsightsSource } from "./types";
import { markdownSource } from "./markdown-source.server";

const source: InsightsSource = markdownSource;

export function toMeta(a: Article): ArticleMeta {
  const { html: _html, ...meta } = a;
  return meta;
}

export async function listArticleMetas(): Promise<ArticleMeta[]> {
  return (await source.listArticles()).map(toMeta);
}

export async function getArticleWithRelated(slug: string) {
  const all = await source.listArticles();
  const article = all.find((a) => a.slug === slug);
  if (!article) return null;
  const others = all.filter((a) => a.slug !== slug);
  const same = others.filter((a) => a.category.slug === article.category.slug);
  const rest = others.filter((a) => a.category.slug !== article.category.slug);
  const related = [...same, ...rest].slice(0, 3).map(toMeta);
  return { article, related };
}

export async function listFullArticles() {
  return source.listArticles();
}
