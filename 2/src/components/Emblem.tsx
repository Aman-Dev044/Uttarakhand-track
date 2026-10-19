// Char Dham emblem: an inked passport stamp of Kedarnath, with the four dhams marked on the route below.
// Kept free of "use client" so the navbar logo and the generated apple icon share the same artwork.
const shikhara = "M30.3 19.6H33.7L35.2 24.4H35.8L37.1 29.4H37.7L39 34.4H39.6L40.4 38H23.6L24.4 34.4H25L26.3 29.4H26.9L28.2 24.4H28.8Z";
const kalash = "M30.7 17.9C30.9 16.3 31.4 15.3 32 14.8 32.6 15.3 33.1 16.3 33.3 17.9Z";

export function Emblem({ className, size }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <rect width="64" height="64" fill="#f4efe4" />
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="#1c1a16" strokeWidth="1.6" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#1c1a16" strokeWidth=".9" strokeDasharray="2.2 1.8" />
      <g fill="none" stroke="#1c1a16" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M11.5 41 18 31l4 5 3.5-4.5" />
        <path d="M38.5 31.5 42 26l4.5 6 2.5-2.5 4 7" />
      </g>
      <g fill="#f4efe4" stroke="#1c1a16" strokeWidth="1.4" strokeLinejoin="round">
        <path d={shikhara} />
        <rect x="28.8" y="17.7" width="6.4" height="1.9" rx=".95" />
        <path d="M18.5 41.5 32 34l13.5 7.5Z" />
        <path d="M21 41.5h22V47H21Z" />
        <path d="M17 47h30" />
      </g>
      <path d="M27.4 26.9h9.2M25.8 31.9h12.4" stroke="#1c1a16" strokeWidth=".7" />
      <path d={kalash} fill="#1c1a16" />
      <path d="M32 9v6" stroke="#1c1a16" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M32.5 9.2 38.6 11.1 32.5 13Z" fill="#c8402a" />
      <path d="M30.2 47v-2.4a1.8 1.8 0 0 1 3.6 0V47Z" fill="#c8402a" />
      <path
        d="M13.5 48.6c5.5 2 11 2.8 18.5 2.8s13-.8 18.5-2.8"
        fill="none"
        stroke="#c8402a"
        strokeWidth="1.2"
        strokeDasharray="1.4 1.9"
        strokeLinecap="round"
      />
      <g fill="#c8402a">
        <circle cx="13.5" cy="48.6" r="1.9" />
        <circle cx="25.6" cy="51.1" r="1.9" />
        <circle cx="38.4" cy="51.1" r="1.9" />
        <circle cx="50.5" cy="48.6" r="1.9" />
      </g>
    </svg>
  );
}
