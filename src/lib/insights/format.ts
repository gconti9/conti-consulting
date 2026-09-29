const MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];
const SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function parts(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return { y, m, day };
}

/** Deterministic (timezone-free) date formatting. */
export function formatDateLong(d: string) {
  const { y, m, day } = parts(d);
  return `${day} de ${MONTHS[m - 1]} de ${y}`;
}

export function formatDateShort(d: string) {
  const { y, m, day } = parts(d);
  return `${String(day).padStart(2, "0")} ${SHORT[m - 1]} ${y}`;
}
