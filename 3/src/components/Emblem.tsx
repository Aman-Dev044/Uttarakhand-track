// Char Dham emblem: Kedarnath temple cut out of a glacier peak, with the alpine sun.
// Kept free of "use client" so the navbar logo and the generated apple icon share the same artwork.
const shikhara = "M30.3 19.6H33.7L35.2 24.4H35.8L37.1 29.4H37.7L39 34.4H39.6L40.4 38H23.6L24.4 34.4H25L26.3 29.4H26.9L28.2 24.4H28.8Z";
const kalash = "M30.7 17.9C30.9 16.3 31.4 15.3 32 14.8 32.6 15.3 33.1 16.3 33.3 17.9Z";

export function Emblem({ className, size }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <rect width="64" height="64" fill="#f7f9fb" />
      <path d="M38 53 49 33l11 20Z" fill="#d3dde6" />
      <path d="M4 53 30 10l26 43Z" fill="#0f1720" />
      <path d="m30 10 7.4 12.2-4.1-1.6-3.3 2.8-3.3-2.8-4.1 1.6Z" fill="#6f9fc4" />
      <g transform="matrix(.56 0 0 .56 14.1 23.3)">
        <path d="M32 7v8" stroke="#f7f9fb" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M32.6 7 40 9.4 32.6 11.8Z" fill="#e0482f" />
        <path d={kalash} fill="#f7f9fb" />
        <rect x="28.8" y="17.7" width="6.4" height="1.9" rx=".95" fill="#f7f9fb" />
        <path d={shikhara} fill="#f7f9fb" />
        <path d="M18.5 41.5 32 34l13.5 7.5Z" fill="#f7f9fb" stroke="#0f1720" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M21 41.5h22v11H21Z" fill="#f7f9fb" />
        <path d="M29.6 52.5v-5a2.4 2.4 0 0 1 4.8 0v5Z" fill="#0f1720" />
      </g>
      <circle cx="50.5" cy="14" r="4.3" fill="#e0482f" />
    </svg>
  );
}
