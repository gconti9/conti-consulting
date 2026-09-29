import { motion, useReducedMotion } from "framer-motion";

const GOLD = "#B8965A";

export function FeaturedArt({ date, dateTime, edition }: { date: string; dateTime: string; edition: number }) {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <>
      <div className="absolute inset-0 hero-radial" />
      <span className="absolute top-6 left-6 md:top-8 md:left-8 font-mono text-[10px] tracking-[0.3em] uppercase text-gold">
        Conti Insights
      </span>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
        className="relative w-[58%] max-w-[300px] max-h-[58%] h-auto transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      >
        <motion.rect x="0.5" y="0.5" width="199" height="199" stroke={GOLD} strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" {...draw(0)} />
        <motion.path d="M50 50 L50 150 L150 150" stroke={GOLD} strokeWidth={1} vectorEffect="non-scaling-stroke" {...draw(0.3)} />
        <motion.path d="M50 150 L150 50" stroke={GOLD} strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" {...draw(0.6)} />
        <circle cx="150" cy="150" r="3" fill={GOLD} />
      </svg>
      <time dateTime={dateTime} className="absolute bottom-6 left-6 md:bottom-8 md:left-8 font-mono text-[10px] tracking-[0.25em] uppercase text-dim">
        {date}
      </time>
      <span className="absolute bottom-4 right-6 md:bottom-6 md:right-8 font-serif italic text-[clamp(40px,4vw,54px)] leading-none text-ivory/90">
        Nº {String(edition).padStart(2, "0")}
      </span>
    </>
  );
}
