import { WHATSAPP_URL, EMAIL, LINKEDIN_URL } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border-faint py-14 px-6 md:px-14">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-10">
          <div className="flex items-center gap-4">
            <LogoMark size={42} />
            <div className="flex flex-col">
              <span className="font-serif text-[24px] tracking-[0.14em] uppercase text-ivory leading-none">
                Conti
              </span>
              <span className="font-mono text-[9px] tracking-[0.32em] text-gold uppercase mt-1.5">
                Consulting
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex md:items-end gap-10 md:gap-16">
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-dim mb-3">
                Direto
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline text-muted text-[13px]"
              >
                gabriel@conticonsulting.com.br
              </a>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-dim mb-3">
                WhatsApp
              </div>
              <a
                href={WHATSAPP_URL}
                className="link-underline text-muted text-[13px]"
                target="_blank"
                rel="noreferrer"
              >
                +55 75 99117·8427
              </a>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-dim mb-3">
                Editorial
              </div>
              <Link to="/insights" className="link-underline text-muted text-[13px]">
                Conti Insights
              </Link>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-dim mb-3">
                Social
              </div>
              <div className="flex gap-4">
                <a
                  href={LINKEDIN_URL}
                  className="link-underline text-muted text-[13px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/conti.consulting"
                  className="link-underline text-muted text-[13px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-faint pt-6 flex flex-col md:flex-row justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
            © {new Date().getFullYear()} Conti Consulting · Todos os direitos reservados
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
            Inteligência operacional para empresas sérias
          </span>
        </div>
      </div>
    </footer>
  );
}
