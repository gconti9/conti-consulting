import { WHATSAPP_URL } from "@/lib/site";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section
      id="contato"
      className="relative py-32 md:py-44 border-t border-border-faint overflow-hidden"
    >
      <div className="absolute inset-0 hero-grid-bg opacity-50" aria-hidden />
      <div className="absolute inset-0 hero-radial" aria-hidden />

      <div className="relative max-w-[980px] mx-auto px-6 md:px-14 text-center">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="block h-px bg-gold mx-auto mb-8"
        />
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="label-eyebrow block mb-7"
        >
          05 — Convite
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="headline text-[clamp(40px,7vw,86px)] text-ivory mb-8"
        >
          Quarenta e cinco minutos
          <br />
          podem <span className="serif-italic-gold">redesenhar</span> os próximos doze meses.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-muted text-[16px] md:text-[17px] leading-[1.85] max-w-xl mx-auto mb-12"
        >
          Conversamos sobre operação, comercial e dados. Você sai com um diagnóstico
          escrito — independentemente de qualquer contratação.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="flex flex-col items-center gap-5"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-4 border border-gold text-ivory px-12 md:px-16 py-5 font-sans text-[15px] tracking-[0.05em] hover:bg-gold hover:text-obsidian transition-colors duration-500 overflow-hidden"
          >
            <span className="relative z-10">Solicitar Diagnóstico Estratégico</span>
            <svg width="16" height="12" viewBox="0 0 14 10" fill="none" className="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5">
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
            </svg>
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-dim">
            Sem pitch · Sem compromisso · Resposta em 24h úteis
          </p>
        </motion.div>
      </div>
    </section>
  );
}
