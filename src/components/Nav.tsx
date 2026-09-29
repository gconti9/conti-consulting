import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogoMark } from "./Logo";

type NavItem = { kind: "hash"; hash: string; label: string } | { kind: "route"; to: "/insights"; label: string };

const desktopLinks: NavItem[] = [
  { kind: "hash", hash: "problema", label: "Diagnóstico" },
  { kind: "hash", hash: "servicos", label: "Serviços" },
  { kind: "hash", hash: "metodologia", label: "Metodologia" },
  { kind: "route", to: "/insights", label: "Insights" },
  { kind: "hash", hash: "sobre", label: "Sobre" },
];
const mobileLinks: NavItem[] = [...desktopLinks, { kind: "hash", hash: "contato", label: "Contato" }];

function NavLink({
  item,
  isHome,
  className,
  activeClassName = "",
  onClick,
  children,
}: {
  item: NavItem;
  isHome: boolean;
  className: string;
  activeClassName?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (item.kind === "route") {
    return (
      <Link to={item.to} onClick={onClick} className={className} activeProps={{ className: activeClassName }}>
        {children}
      </Link>
    );
  }
  if (isHome) {
    return (
      <a href={`#${item.hash}`} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to="/" hash={item.hash} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const logoInner = (
    <>
      <LogoMark size={34} />
      <div className="flex flex-col leading-none">
        <span className="font-serif text-[20px] tracking-[0.14em] uppercase text-ivory">Conti</span>
        <span className="font-mono text-[9px] tracking-[0.32em] text-gold uppercase mt-1">Consulting</span>
      </div>
    </>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-14 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-obsidian/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {isHome ? (
          <a href="#hero" className="flex items-center gap-3.5" aria-label="Conti Consulting — início">
            {logoInner}
          </a>
        ) : (
          <Link to="/" className="flex items-center gap-3.5" aria-label="Conti Consulting — início">
            {logoInner}
          </Link>
        )}

        <ul className="hidden md:flex items-center gap-9 list-none">
          {desktopLinks.map((l) => (
            <li key={l.label}>
              <NavLink
                item={l}
                isHome={isHome}
                className="link-underline font-sans text-[13px] text-muted tracking-wide"
                activeClassName="!text-ivory"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          item={{ kind: "hash", hash: "contato", label: "Diagnóstico" }}
          isHome={isHome}
          className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory border border-gold px-5 py-3 hover:bg-gold hover:text-obsidian transition-colors duration-300"
        >
          Diagnóstico
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
        </NavLink>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block w-6 h-px bg-ivory transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-ivory transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden bg-obsidian flex flex-col items-center justify-center gap-9"
          >
            {mobileLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <NavLink
                  item={l}
                  isHome={isHome}
                  onClick={() => setOpen(false)}
                  className="font-serif text-3xl text-ivory tracking-wider hover:text-gold transition-colors"
                  activeClassName="!text-gold"
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
