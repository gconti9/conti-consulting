import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionRule } from "./Reveal";

const items = [
  {
    title: "Inteligência Operacional",
    body: "Mapeamos os pontos cegos da operação e construímos painéis de comando: margem por SKU, capacidade real, alertas de ruptura, custo por canal. A diretoria deixa de descobrir o problema no relatório do mês seguinte.",
    tags: ["Dashboards", "BI", "Alertas"],
  },
  {
    title: "Estruturação Comercial",
    body: "Funil de vendas com método, qualificação assistida por IA, previsão de receita por estágio, governança de pipeline. O comercial vira sistema — não depende mais do humor da equipe.",
    tags: ["CRM", "Sales Ops", "Forecast"],
  },
  {
    title: "Automação de Processos",
    body: "Identificamos o que sua equipe repete todo dia e desenhamos automações sob medida — orçamentos, follow-up, conciliação, atendimento. Mais capacidade sem precisar contratar.",
    tags: ["Workflows", "RPA", "Integrações"],
  },
  {
    title: "Atendimento Inteligente",
    body: "Bots executivos para WhatsApp e site que qualificam leads, agendam, cobram e devolvem dados estruturados. Sua equipe para de ser secretária de robô.",
    tags: ["WhatsApp", "IA Conversacional", "Lead Scoring"],
  },
  {
    title: "Arquitetura de Dados",
    body: "Conectamos ERP, CRM, planilhas e canais em uma única fonte de verdade. Um número, uma versão, um lugar — para que toda decisão parta do mesmo terreno.",
    tags: ["ETL", "Data Lake", "API"],
  },
  {
    title: "Governança & Treinamento",
    body: "Implantação assistida com sprints curtos, treinamento da equipe e acompanhamento dos primeiros 90 dias. ROI medido, ajustes incluídos, sem custo adicional.",
    tags: ["Implantação", "Onboarding", "Suporte"],
  },
];

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="servicos" className="relative py-32 md:py-40 border-t border-border-faint">
      <div className="max-w-[1240px] mx-auto px-6 md:px-14">
        <div className="mb-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <SectionRule />
            <Reveal>
              <span className="label-eyebrow block mb-5">02 — O que entregamos</span>
              <h2 className="headline text-[clamp(36px,5vw,64px)] text-ivory">
                Infraestrutura
                <br />
                <span className="serif-italic-gold">de decisão.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <Reveal delay={0.15}>
              <p className="text-muted text-[16px] leading-[1.85] max-w-md">
                Não vendemos software. Entregamos uma operação que <span className="text-ivory">se governa</span>:
                dados confiáveis, processos previsíveis e decisões que não dependem da memória do dono.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-border-faint">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={it.title} delay={i * 0.05}>
                <div className="relative border-b border-border-faint group">
                  <span
                    className={`absolute left-0 top-0 w-[2px] bg-gold transition-all duration-500 ${
                      isOpen ? "h-full" : "h-0"
                    }`}
                  />
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-6 md:gap-8 py-8 md:py-10 text-left transition-all duration-300"
                    style={{ paddingLeft: isOpen ? 28 : 0 }}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-mono text-[12px] tracking-widest min-w-[40px] transition-colors ${
                        isOpen ? "text-gold" : "text-dim"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-serif text-[26px] md:text-[34px] leading-tight transition-colors ${
                        isOpen ? "text-ivory" : "text-ivory/85 group-hover:text-ivory"
                      }`}
                    >
                      {it.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0"
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 4v14M4 11h14" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="square" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="c"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-7 md:pl-[68px] pr-4 pb-10 max-w-3xl">
                          <p className="text-muted text-[15px] md:text-[16px] leading-[1.85] mb-6">
                            {it.body}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {it.tags.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold border border-border px-3 py-1.5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
