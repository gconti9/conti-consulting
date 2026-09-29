import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 hero-grid-bg">
      <div className="absolute inset-0 hero-radial pointer-events-none" />
      <div className="relative max-w-xl text-center">
        <span className="label-eyebrow block mb-6">Erro 404</span>
        <h1 className="headline text-[clamp(40px,6vw,72px)] text-ivory mb-6">
          Esta página <span className="serif-italic-gold">não existe.</span>
        </h1>
        <p className="text-muted text-[15px] leading-[1.8] mb-10">
          O endereço pode ter mudado ou o conteúdo foi removido.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="border border-gold px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory hover:bg-gold hover:text-obsidian transition-colors">
            Voltar ao início
          </Link>
          <Link to="/insights" className="border border-border px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted hover:text-ivory hover:border-gold transition-colors">
            Ver Insights
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 hero-grid-bg">
      <div className="absolute inset-0 hero-radial pointer-events-none" />
      <div className="relative max-w-xl text-center">
        <span className="label-eyebrow block mb-6">Erro</span>
        <h1 className="headline text-[clamp(40px,6vw,72px)] text-ivory mb-6">
          Esta página <span className="serif-italic-gold">não carregou.</span>
        </h1>
        <p className="text-muted text-[15px] leading-[1.8] mb-10">
          Algo deu errado do nosso lado. Tente novamente ou volte ao início.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-gold px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory hover:bg-gold hover:text-obsidian transition-colors"
          >
            Tentar novamente
          </button>
          <a href="/" className="border border-border px-8 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted hover:text-ivory hover:border-gold transition-colors">
            Voltar ao início
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B0B0B" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Conti Consulting" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative bg-obsidian text-ivory min-h-screen overflow-hidden">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
