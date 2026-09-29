import { motion } from "framer-motion";
import { Reveal, SectionRule } from "./Reveal";

function Spark() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-14" fill="none" preserveAspectRatio="none">
      <motion.path
        d="M0 45 L20 38 L40 42 L60 30 L80 33 L100 22 L120 26 L140 14 L160 18 L180 10 L200 6"
        stroke="#B8965A"
        strokeWidth="1.2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M0 45 L20 38 L40 42 L60 30 L80 33 L100 22 L120 26 L140 14 L160 18 L180 10 L200 6 L200 60 L0 60 Z"
        fill="url(#g)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.4 }}
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8965A" />
          <stop offset="100%" stopColor="#B8965A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MockDashboard() {
  return (
    <div className="bg-graphite border border-border-faint p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
            Painel Operacional · Live
          </span>
        </div>
        <span className="font-mono text-[10px] text-dim">Q3 / 2025</span>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border-faint mb-px">
        {[
          { l: "Margem", v: "31.4%", d: "+4.2 p.p." },
          { l: "Ruptura", v: "1.8%", d: "−6.1 p.p." },
          { l: "Ciclo", v: "9d", d: "−42%" },
        ].map((m) => (
          <div key={m.l} className="bg-obsidian p-5">
            <div className="font-mono text-[9px] tracking-widest uppercase text-dim mb-2">
              {m.l}
            </div>
            <div className="font-serif text-[28px] text-ivory leading-none mb-2">{m.v}</div>
            <div className="font-mono text-[10px] text-gold">{m.d}</div>
          </div>
        ))}
      </div>

      <div className="bg-obsidian p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-widest uppercase text-dim">
            Receita projetada · 12s
          </span>
          <span className="font-mono text-[10px] text-gold">R$ 4.82M</span>
        </div>
        <Spark />
      </div>
    </div>
  );
}

const outcomes = [
  { kpi: "−42%", label: "no tempo médio do ciclo de vendas" },
  { kpi: "+31%", label: "de margem visível por SKU" },
  { kpi: "−6.1pp", label: "em ruptura crítica de estoque" },
  { kpi: "3.2×", label: "capacidade comercial sem nova contratação" },
];

export function Proof() {
  return (
    <section id="resultados" className="relative py-32 md:py-40 border-t border-border-faint overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <SectionRule />
            <Reveal>
              <span className="label-eyebrow block mb-5">04 — Resultados</span>
              <h2 className="headline text-[clamp(36px,4.6vw,58px)] text-ivory mb-8">
                O painel
                <br />
                <span className="serif-italic-gold">não mente.</span>
              </h2>
              <p className="text-muted text-[15px] leading-[1.85] mb-10 max-w-md">
                Antes da Conti, decisões eram feitas com a melhor versão da memória.
                Depois, com o número certo, no momento certo, na tela certa.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-px bg-border-faint border border-border-faint">
              {outcomes.map((o, i) => (
                <motion.div
                  key={o.kpi}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-obsidian p-6"
                >
                  <div className="font-serif text-[40px] text-gold leading-none mb-2">{o.kpi}</div>
                  <div className="text-muted text-[12px] leading-snug">{o.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 md:pl-8">
            <Reveal delay={0.15}>
              <MockDashboard />
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 border-l-2 border-gold pl-6 max-w-xl">
                <p className="font-serif italic text-[20px] md:text-[22px] text-ivory leading-snug mb-3">
                  "Em 60 dias paramos de discutir os números — passamos a discutir as decisões.
                  É outra empresa."
                </p>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-dim">
                  Diretor — Distribuidora · 180 colaboradores
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
