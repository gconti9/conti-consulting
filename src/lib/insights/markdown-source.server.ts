import { CATEGORIES, DEFAULT_AUTHOR, type Article, type Category, type InsightsSource } from "./types";
import { countWords, parseFrontmatter, renderMarkdown } from "./markdown.server";

const files = import.meta.glob("/content/insights/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function resolveCategory(v: string | undefined): Category | null {
  return CATEGORIES.find((c) => c.slug === v || c.label.toLowerCase() === (v ?? "").toLowerCase()) ?? null;
}

function isValidDate(v: string | undefined): v is string {
  return !!v && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
}

let cache: Article[] | null = null;

function load(): Article[] {
  if (cache) return cache;
  const list: Article[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const file = path.split("/").pop()!;
    const slug = file.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    if (data.draft === "true") continue;
    const category = resolveCategory(data.category);
    if (!category) {
      console.warn(`[insights] ${file}: categoria inválida ("${data.category ?? ""}") — artigo ignorado.`);
      continue;
    }
    if (!isValidDate(data.date)) {
      console.warn(`[insights] ${file}: data ausente ou inválida ("${data.date ?? ""}") — artigo ignorado.`);
      continue;
    }
    const rt = Number(data.readingTime);
    list.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      category,
      date: data.date,
      updated: data.updated || undefined,
      author: data.author ? { ...DEFAULT_AUTHOR, name: data.author } : DEFAULT_AUTHOR,
      readingTime: rt > 0 ? rt : Math.max(1, Math.round(countWords(body) / 220)),
      featured: data.featured === "true",
      cover: data.cover || undefined,
      coverAlt: data.coverAlt || undefined,
      html: renderMarkdown(body),
    });
  }
  list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cache = list;
  return list;
}

export const markdownSource: InsightsSource = {
  async listArticles() {
    return load();
  },
  async getArticle(slug) {
    return load().find((a) => a.slug === slug) ?? null;
  },
};
