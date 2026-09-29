import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function rfc822(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, day, 9));
  return `${DAYS[dt.getUTCDay()]}, ${String(day).padStart(2, "0")} ${MON[m - 1]} ${y} 09:00:00 GMT`;
}

export const Route = createFileRoute("/insights/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { listArticleMetas } = await import("@/lib/insights/repository.server");
        const articles = await listArticleMetas();
        const items = articles
          .map(
            (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/insights/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${a.slug}</guid>
      <description>${esc(a.description)}</description>
      <category>${esc(a.category.label)}</category>
      <author>gabriel@conticonsulting.com.br (${esc(a.author.name)})</author>
      <pubDate>${rfc822(a.date)}</pubDate>
    </item>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Conti Insights</title>
    <link>${SITE_URL}/insights</link>
    <atom:link href="${SITE_URL}/insights/rss.xml" rel="self" type="application/rss+xml" />
    <description>IA aplicada a problemas reais de negócio. Sem hype.</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
