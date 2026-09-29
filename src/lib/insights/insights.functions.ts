import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { z } from "zod";

export const getInsightsList = createServerFn({ method: "GET" }).handler(async () => {
  const { listArticleMetas } = await import("./repository.server");
  return listArticleMetas();
});

export const getInsightArticle = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ slug: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { getArticleWithRelated } = await import("./repository.server");
    const res = await getArticleWithRelated(data.slug);
    if (!res) throw notFound();
    return res;
  });
