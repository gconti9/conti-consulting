// Lightweight markdown renderer + frontmatter parser (Worker-safe, no Node deps).

export function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inline(text: string): string {
  let s = esc(text);
  s = s.replace(/!\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy" />`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
    const internal = href.startsWith("/");
    return internal
      ? `<a href="${href}" data-internal="true">${label}</a>`
      : `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  return s;
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r/g, "").split("\n");
  const out: string[] = [];
  let i = 0;
  let firstP = true;
  const used = new Set<string>();
  const uid = (t: string) => {
    let id = slugify(t) || "secao";
    let n = 2;
    while (used.has(id)) id = `${slugify(t)}-${n++}`;
    used.add(id);
    return id;
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (/^---+\s*$/.test(line)) { out.push('<hr />'); i++; continue; }

    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      out.push(`<h${lvl} id="${uid(h[2])}">${inline(h[2])}</h${lvl}>`);
      i++; continue;
    }

    if (line.startsWith(">")) {
      const block: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        block.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const callout = block[0].match(/^\[!nota\]\s*(.*)$/i);
      if (callout) {
        const body = block.slice(1).join(" ").trim();
        out.push(
          `<aside class="insight-callout"><span class="insight-callout-label">Nota</span>${
            callout[1] ? `<strong class="insight-callout-title">${inline(callout[1])}</strong>` : ""
          }<p>${inline(body)}</p></aside>`,
        );
      } else {
        out.push(`<blockquote><p>${inline(block.join(" ").trim())}</p></blockquote>`);
      }
      continue;
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: string[] = [];
      const re = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/;
      while (i < lines.length && re.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(re, ""))}</li>`);
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    const img = line.match(/^!\[([^\]]+)\]\(([^)\s]+)\)\s*$/);
    if (img) {
      out.push(`<figure><img src="${esc(img[2])}" alt="${esc(img[1])}" loading="lazy" /><figcaption>${esc(img[1])}</figcaption></figure>`);
      i++; continue;
    }

    const para: string[] = [];
    while (
      i < lines.length && lines[i].trim() &&
      !/^(#{2,3}\s|>|---+\s*$|\s*[-*]\s+|\s*\d+\.\s+)/.test(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(`<p${firstP ? ' class="lead-drop"' : ""}>${inline(para.join(" "))}</p>`);
    firstP = false;
  }
  return out.join("\n");
}

export function countWords(md: string) {
  return md.replace(/[#>*_`[\]()!-]/g, " ").split(/\s+/).filter(Boolean).length;
}
