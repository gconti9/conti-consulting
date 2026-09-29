import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionRule } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Imersão silenciosa na operação. Entrevistas curtas, observação dos dados, mapeamento dos fluxos críticos. Sem reuniões longas, sem interrupção.",
  },
  {
    n: "02",
    title: "Estruturação",
    desc: "Desenho da arquitetura: o que será mensurado, automatizado, integrado. Priorização por impacto financeiro e velocidade de retorno.",
  },
  {
    n: "03",
    title: "Automação",
    desc: "Implantação em sprints de duas semanas. Validação contínua. Sua equipe acompanha cada entrega — não recebe um sistema de surpresa no fim.",
  },
  {
    n: "04",
    title: "Previsibilidade",
    desc: "Os indicadores começam a falar antes do problema. Margem, ruptura, conversão e capacidade param de ser revelações mensais.",
  },
  {
    n: "05",
    title: "Escala",
    desc: "Com a operação se governando, abrimos espaço para crescimento sem refundar a empresa a cada salto. Ajustes finos incluídos por 90 dias.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="metodologia" className="relative py-32 md:py-40 border-t border-border-faint">
      <div className="max-w-[1240px] mx-auto px-6 md:px-14">
        <div className="mb-24 max-w-3xl">
          <SectionRule />
          <Reveal>
            <span className="label-eyebrow block mb-5">03 — Metodologia</span>
            <h2 className="headline text-[clamp(36px,5vw,64px)] text-ivory">
              Cinco movimentos.
              <br />
              <span className="serif-italic-gold">Zero improviso.</span>
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative grid md:grid-cols-[120px_1fr] gap-x-12">
          {/* Vertical track */}
          <div className="hidden md:block relative">
            <div className="sticky top-32">
              <div className="relative w-px h-[60vh] bg-border-faint mx-auto">
                <motion.div
                  style={{ height: lineH }}
                  className="absolute top-0 left-0 w-px bg-gold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1 md:space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 * i }}
                className="relative grid md:grid-cols-[80px_1fr] gap-6 md:gap-10 py-10 border-b border-border-faint last:border-b-0 group"
              >
                <div className="flex md:flex-col items-center md:items-start gap-4">
                  <div className="relative w-12 h-12 border border-gold rounded-full flex items-center justify-center bg-obsidian transition-transform group-hover:scale-110 duration-500">
                    <span className="font-mono text-[12px] text-gold">{s.n}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-[28px] md:text-[36px] text-ivory leading-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-muted text-[15px] md:text-[16px] leading-[1.85] max-w-2xl">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
