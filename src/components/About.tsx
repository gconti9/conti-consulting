import { motion } from "framer-motion";
import { Reveal, SectionRule } from "./Reveal";
import gabriel from "@/assets/gabriel-conti.jpg";

export function About() {
  return (
    <section id="sobre" className="relative py-32 md:py-40 bg-warm-white text-obsidian border-t border-border-faint">
      <div className="max-w-[1240px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 md:gap-20 items-center">
          <div>
            <span className="block h-px w-14 bg-gold mb-5" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold-deep mb-5 block">
              Fundador
            </span>
            <Reveal>
              <h2 className="font-serif text-[clamp(36px,4.8vw,60px)] leading-[1.05] font-light text-obsidian mb-8">
                Tecnologia que só vale<br />
                se <span className="italic text-gold-deep">aparecer no balanço.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#3a3a36] mb-6 max-w-xl">
                Sou Gabriel Conti. Construí a Conti Consulting depois de uma década operando
                vendas B2B e Private Equity — anos olhando, do outro lado da mesa, para empresas
                que cresciam mais rápido do que sua organização interna.
              </p>
              <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#3a3a36] mb-10 max-w-xl">
                Com formação em Direito, Relações Internacionais, pós em Gestão e
                especialização em IA pela PUCPR, traduzo inteligência artificial para a
                linguagem que importa: DRE, margem, ciclo, previsibilidade.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-center gap-6 flex-wrap mb-10">
                {["PUCPR · IA", "10 anos B2B", "Private Equity"].map((s, i) => (
                  <div key={s} className="flex items-center gap-6">
                    {i > 0 && <span className="block w-px h-4 bg-gold/50" />}
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#666660]">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#contato"
                className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-obsidian border-b border-gold pb-2 hover:gap-5 transition-all duration-500"
              >
                Conversar com Gabriel
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" />
                </svg>
              </a>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-obsidian">
              <img
                src={gabriel}
                alt="Gabriel Conti, fundador da Conti Consulting"
                className="w-full h-full object-cover grayscale-[15%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-5 -left-5 md:-bottom-7 md:-left-7 bg-obsidian text-ivory px-6 py-5 border border-gold/40">
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold mb-1">
                Fundador & Consultor
              </div>
              <div className="font-serif text-[22px] leading-tight">Gabriel Conti</div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-gold/50 -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
