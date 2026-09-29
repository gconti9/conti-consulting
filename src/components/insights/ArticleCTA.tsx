import { WHATSAPP_URL } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function ArticleCTA() {
  return (
    <section className="relative px-6 md:px-14 py-28 md:py-36 border-t border-border-faint overflow-hidden">
      <div className="absolute inset-0 hero-radial pointer-events-none" />
      <Reveal className="relative max-w-[860px] mx-auto text-center">
        <span className="label-eyebrow block mb-8">Próximo passo</span>
        <h2 className="headline text-[clamp(30px,4.2vw,52px)] text-ivory mb-8">
          Existe um processo na sua empresa que parece custar{" "}
          <span className="serif-italic-gold">mais tempo do que deveria?</span>
        </h2>
        <p className="text-muted text-[15px] md:text-[16px] leading-[1.85] max-w-xl mx-auto mb-12">
          A Conti Consulting ajuda empresas a identificar onde IA, automação e dados podem gerar impacto real.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-4 border border-gold text-ivory px-12 py-5 text-[15px] tracking-[0.05em] hover:bg-gold hover:text-obsidian transition-colors duration-500"
        >
          Falar com a Conti
          <svg width="16" height="12" viewBox="0 0 14 10" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
