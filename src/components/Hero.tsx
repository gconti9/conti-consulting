import { WHATSAPP_URL } from "@/lib/site";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Video bg */}
      <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Gradient veils */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/55 to-obsidian" />
        <div className="absolute inset-0 hero-radial" />
        <div className="absolute inset-0 hero-grid-bg opacity-60" />
      </motion.div>

      {/* Animated gold trace */}
      <motion.div
        aria-hidden
        className="absolute z-[1] w-1 h-1 rounded-full bg-gold/60"
        animate={{
          x: ["10vw", "70vw", "60vw", "20vw", "80vw"],
          y: ["20vh", "15vh", "60vh", "70vh", "40vh"],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-4xl px-6 pt-32 pb-24"
      >
        {/* Eyebrow rail */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-12">
          <span className="hidden sm:block w-8 h-px bg-gold/60" />
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-gold text-center"
          >
            Consultoria em IA · Inteligência Operacional
          </motion.span>
          <span className="hidden sm:block w-8 h-px bg-gold/60" />
        </div>

        <h1 className="headline text-[clamp(40px,8vw,104px)] text-ivory mb-8 hero-h1-in">
          Inteligência que <span className="serif-italic-gold">aparece</span>
          <br className="hidden sm:block" /> no balanço.
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
          className="text-muted text-[16px] md:text-[17px] max-w-xl mx-auto leading-[1.8] mb-12"
        >
          Estruturamos operação, dados e processos comerciais com IA aplicada — para empresas
          de médio porte que cresceram mais rápido do que sua organização interna.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.95 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-3 border border-gold text-ivory px-12 py-[18px] font-sans text-[14px] tracking-[0.05em] hover:bg-gold hover:text-obsidian transition-colors duration-500 overflow-hidden"
          >
            <span className="relative z-10">Solicitar Diagnóstico Estratégico</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="relative z-10">
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
            </svg>
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-dim">
            45 minutos · Sem pitch · Conversa estratégica
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 flex items-center justify-center gap-6 md:gap-10 flex-wrap"
        >
          {[
            "10 anos B2B",
            "Especialização IA — PUCPR",
            "Private Equity",
          ].map((s, i) => (
            <div key={s} className="flex items-center gap-6 md:gap-10">
              {i > 0 && <span className="hidden md:block w-px h-4 bg-gold/40" />}
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
                {s}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-dim">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-12 bg-gold/70"
        />
      </motion.div>
    </section>
  );
}
