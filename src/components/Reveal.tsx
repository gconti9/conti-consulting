import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "p" | "h1" | "h2" | "h3";
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({ children, delay = 0, y = 28, x = 0, className, as = "div", ...rest }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function SectionRule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className="block h-px bg-gold mb-5"
    />
  );
}
