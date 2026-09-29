export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="39" height="39" stroke="#B8965A" strokeWidth="1" />
      <polyline points="10,10 10,30 30,30" stroke="#B8965A" strokeWidth="1.5" fill="none" strokeLinecap="square" />
      <line x1="10" y1="30" x2="30" y2="10" stroke="#F4F2EE" strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="2.5" fill="#B8965A" />
    </svg>
  );
}
