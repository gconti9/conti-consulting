export type CategorySlug = "ia-automacao" | "operacoes" | "comercial" | "dados-gestao" | "campo";

export interface Category {
  slug: CategorySlug;
  label: string;
}

export interface Author {
  name: string;
  role: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: Category;
  date: string; // YYYY-MM-DD
  updated?: string;
  author: Author;
  readingTime: number;
  featured: boolean;
  cover?: string;
  coverAlt?: string;
}

export interface Article extends ArticleMeta {
  html: string;
}

export interface InsightsSource {
  listArticles(): Promise<Article[]>;
  getArticle(slug: string): Promise<Article | null>;
}

export const CATEGORIES: Category[] = [
  { slug: "ia-automacao", label: "IA & Automação" },
  { slug: "operacoes", label: "Operações" },
  { slug: "comercial", label: "Comercial" },
  { slug: "dados-gestao", label: "Dados & Gestão" },
  { slug: "campo", label: "Campo" },
];

export const DEFAULT_AUTHOR: Author = { name: "Gabriel Conti", role: "Founder, Conti Consulting" };
