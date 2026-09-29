import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Proof } from "@/components/Proof";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { InsightsSection } from "@/components/InsightsSection";
import { getInsightsList } from "@/lib/insights/insights.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conti Consulting — Inteligência operacional com IA para empresas de médio porte" },
      {
        name: "description",
        content:
          "Consultoria boutique em Inteligência Artificial e operação para empresas de médio porte. Estruturamos dados, processos e comercial com IA aplicada — para crescer com previsibilidade.",
      },
      { name: "keywords", content: "consultoria IA, inteligência artificial, automação operacional, consultoria operacional, CRM, processos comerciais, médio porte, Conti Consulting" },
      { property: "og:title", content: "Conti Consulting — Inteligência operacional executiva" },
      {
        property: "og:description",
        content:
          "Estruturamos operação, dados e comercial com IA aplicada — para empresas que cresceram mais rápido do que sua organização interna.",
      },
      { property: "og:url", content: "https://conticonsulting.com.br/" },
      { property: "og:image", content: "https://conticonsulting.com.br/media/og-home.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Conti Consulting — Inteligência que aparece no balanço." },
      { name: "twitter:image", content: "https://conticonsulting.com.br/media/og-home.jpg" },
      { name: "twitter:title", content: "Conti Consulting — Inteligência operacional executiva" },
      {
        name: "twitter:description",
        content:
          "Consultoria boutique em IA e operação para empresas de médio porte.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://conticonsulting.com.br/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Conti Consulting",
          url: "https://conticonsulting.com.br/",
          logo: "https://conticonsulting.com.br/media/conti-logo.png",
          description:
            "Consultoria boutique em Inteligência Artificial e operação para empresas de médio porte.",
          areaServed: "BR",
          sameAs: [
            "https://www.linkedin.com/company/conti-consulting",
            "https://instagram.com/conti.consulting",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+55-75-99117-8427",
            email: "gabriel@conticonsulting.com.br",
            contactType: "sales",
            availableLanguage: ["Portuguese"],
          },
        }),
      },
    ],
  }),
  loader: () => getInsightsList().catch(() => []),
  component: Index,
});

function Index() {
  const articles = Route.useLoaderData();
  return (
    <main>
      <Hero />
      <Problem />
      <Services />
      <Process />
      <Proof />
      <About />
      <InsightsSection articles={articles} />
      <CTA />
    </main>
  );
}
