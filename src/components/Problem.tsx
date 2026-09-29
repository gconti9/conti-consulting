import { Reveal, SectionRule } from "./Reveal";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Operação invisível",
    body: "Vendas crescem, mas você não sabe onde a margem se perde. O DRE chega 30 dias depois das decisões.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 26V8m6 18V14m6 12V4m6 22V12m6 14V18" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    title: "Processos no WhatsApp",
    body: "A operação roda na cabeça das pessoas. Cada saída é um buraco. Cada nova contratação, um retreinamento do zero.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="5" width="26" height="19" stroke="#B8965A" strokeWidth="1.2" />
        <path d="M9 28l5-4h7" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="square" />
        <circle cx="16" cy="14" r="4" stroke="#B8965A" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Comercial sem método",
    body: "Cada vendedor tem seu jeito. Funil é planilha. Previsão de receita é palpite. Crescimento depende do humor da equipe.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="5" stroke="#B8965A" strokeWidth="1.2" />
        <path d="M16 3v3m0 20v3M3 16h3m20 0h3M6 6l2 2m16 16l2 2M6 26l2-2m16-16l2-2" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    title: "Decisões por intuição",
    body: "Reuniões longas, dados conflitantes, planilhas manuais. A diretoria decide com a melhor versão da memória — não dos números.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="6" width="26" height="20" stroke="#B8965A" strokeWidth="1.2" />
        <path d="M8 20l5-6 4 3 7-9" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="square" fill="none" />
      </svg>
    ),
  },
  {
    title: "Tecnologia desconectada",
    body: "ERP de um lado, CRM de outro, planilhas no meio. Ninguém olha o mesmo número — porque ninguém tem o mesmo número.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="8" cy="8" r="3" stroke="#B8965A" strokeWidth="1.2" />
        <circle cx="24" cy="8" r="3" stroke="#B8965A" strokeWidth="1.2" />
        <circle cx="8" cy="24" r="3" stroke="#B8965A" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="3" stroke="#B8965A" strokeWidth="1.2" />
        <path d="M11 8h10M8 11v10M24 11v10M11 24h10" stroke="#B8965A" strokeWidth="0.8" strokeDasharray="2 3" />
      </svg>
    ),
  },
  {
    title: "Dependência do dono",
    body: "Se você sair por 15 dias, a empresa trava. Não é uma operação — é um cargo executivo que você inventou para si mesmo.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="11" r="5" stroke="#B8965A" strokeWidth="1.2" />
        <path d="M5 28c1.5-6 6-9 11-9s9.5 3 11 9" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="square" />
      </svg>
    ),
  },
];

export function Problem() {
  return (
    <section id="problema" className="relative py-32 md:py-40 border-t border-border-faint">
      <div className="max-w-[1240px] mx-auto px-6 md:px-14">
        <div className="mb-20 max-w-3xl">
          <SectionRule />
          <Reveal>
            <span className="label-eyebrow block mb-5">01 — Diagnóstico</span>
            <h2 className="headline text-[clamp(36px,5.2vw,68px)] text-ivory">
              A empresa cresceu.<br />
              A organização <span className="serif-italic-gold">não acompanhou.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-faint border border-border-faint">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative bg-graphite p-9 md:p-10 transition-colors duration-300 hover:bg-slate"
            >
              <span className="absolute left-0 top-0 h-0 w-[2px] bg-gold transition-all duration-500 group-hover:h-full" />
              <div className="mb-7">{c.icon}</div>
              <h3 className="font-serif text-[24px] text-ivory mb-3 leading-tight">{c.title}</h3>
              <p className="text-muted text-[14px] leading-[1.85]">{c.body}</p>
              <span className="absolute bottom-5 right-5 font-mono text-[10px] text-dim tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-20 text-center font-serif italic text-[22px] md:text-[26px] text-gold max-w-2xl mx-auto">
            "Esses problemas não se resolvem com mais esforço.
            Resolvem-se com estrutura."
          </p>
        </Reveal>
      </div>
    </section>
  );
}
