// Char Dham emblem: a golden Kedarnath temple inside a brass bead ring on maroon, lit by a diya glow.
// Kept free of "use client" so the navbar logo and the generated apple icon share the same artwork.
const shikhara = "M30.3 19.6H33.7L35.2 24.4H35.8L37.1 29.4H37.7L39 34.4H39.6L40.4 38H23.6L24.4 34.4H25L26.3 29.4H26.9L28.2 24.4H28.8Z";
const kalash = "M30.7 17.9C30.9 16.3 31.4 15.3 32 14.8 32.6 15.3 33.1 16.3 33.3 17.9Z";

export function Emblem({ className, id = "emblem", size }: { className?: string; id?: string; size?: number }) {
  const gold = `url(#${id}-gold)`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset=".55" stopColor="#e2bd72" />
          <stop offset="1" stopColor="#b4873a" />
        </linearGradient>
        <radialGradient id={`${id}-maroon`} cx=".5" cy=".42" r=".7">
          <stop offset="0" stopColor="#8a1d33" />
          <stop offset="1" stopColor="#3d0b16" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill={`url(#${id}-maroon)`} />
      <circle cx="32" cy="32" r="27.4" fill="none" stroke="#e2bd72" strokeWidth="1.2" />
      <circle
        cx="32"
        cy="32"
        r="24.6"
        fill="none"
        stroke="#e2bd72"
        strokeOpacity=".75"
        strokeWidth="1.5"
        strokeDasharray=".1 3.22"
        strokeLinecap="round"
      />
      <circle cx="32" cy="27" r="12" fill="#f6a723" fillOpacity=".2" />
      <path
        d="M10.5 45 18 33.5l4.5 5.5 3.5-4M53.5 45 46 33.5 41.5 39 38 35"
        fill="none"
        stroke="#e2bd72"
        strokeOpacity=".5"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M32 7.5v7.5" stroke="#e2bd72" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M32.6 7.8 39 9.8 32.6 11.8Z" fill="#e46f1b" />
      <path d={kalash} fill={gold} />
      <rect x="28.8" y="17.7" width="6.4" height="1.9" rx=".95" fill={gold} />
      <path d={shikhara} fill={gold} />
      <path d="M18.5 41.5 32 34l13.5 7.5Z" fill={gold} stroke="#5a1222" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M21 41.5h22V48H21Z" fill="#c99a4b" />
      <path d="M17 48h30v2.5H17Z" fill="#e2bd72" />
      <path d="M29.8 48v-3a2.2 2.2 0 0 1 4.4 0v3Z" fill="#3d0b16" />
      <circle cx="32" cy="40" r=".9" fill="#3d0b16" />
    </svg>
  );
}
