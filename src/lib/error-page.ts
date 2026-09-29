export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Esta página não carregou | Conti Consulting</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      body { font: 300 15px/1.7 "DM Sans", system-ui, -apple-system, sans-serif; background: #0B0B0B; color: #F4F2EE; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2rem; }
      .eyebrow { font: 10px/1 ui-monospace, "DM Mono", monospace; letter-spacing: 0.3em; text-transform: uppercase; color: #C9A668; display: block; margin-bottom: 1.5rem; }
      h1 { font: 300 clamp(36px, 6vw, 60px)/1.05 "Cormorant Garamond", Georgia, serif; margin: 0 0 1.25rem; }
      h1 em { color: #C9A668; }
      p { color: #A3A39A; margin: 0 0 2.5rem; }
      .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 1rem 2rem; font: 10px/1 ui-monospace, "DM Mono", monospace; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; text-decoration: none; background: transparent; border-radius: 0; }
      .primary { border: 1px solid #C9A668; color: #F4F2EE; }
      .primary:hover { background: #C9A668; color: #0B0B0B; }
      .secondary { border: 1px solid rgba(184,150,90,0.18); color: #A3A39A; }
      .secondary:hover { border-color: #C9A668; color: #F4F2EE; }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="eyebrow">Erro</span>
      <h1>Esta página <em>não carregou.</em></h1>
      <p>Algo deu errado do nosso lado. Tente novamente ou volte ao início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar novamente</button>
        <a class="secondary" href="/">Voltar ao início</a>
      </div>
    </div>
  </body>
</html>`;
}
