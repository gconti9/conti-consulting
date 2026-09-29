import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listArticleMetas } = await import("@/lib/insights/repository.server");
        const articles = await listArticleMetas();
        const latest = articles[0] ? (articles[0].updated ?? articles[0].date) : undefined;
        const urls = [
          { loc: `${SITE_URL}/`, lastmod: undefined as string | undefined },
          { loc: `${SITE_URL}/insights`, lastmod: latest },
          ...articles.map((a) => ({ loc: `${SITE_URL}/insights/${a.slug}`, lastmod: a.updated ?? a.date })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
