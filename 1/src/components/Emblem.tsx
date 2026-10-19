// Char Dham emblem: Kedarnath temple in saffron against the snow peaks of the Garhwal range.
// Kept free of "use client" so the navbar logo and the generated apple icon share the same artwork.
const shikhara = "M30.3 19.6H33.7L35.2 24.4H35.8L37.1 29.4H37.7L39 34.4H39.6L40.4 38H23.6L24.4 34.4H25L26.3 29.4H26.9L28.2 24.4H28.8Z";
const kalash = "M30.7 17.9C30.9 16.3 31.4 15.3 32 14.8 32.6 15.3 33.1 16.3 33.3 17.9Z";

export function Emblem({ className, id = "emblem", size }: { className?: string; id?: string; size?: number }) {
  const saffron = `url(#${id}-saffron)`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-saffron`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc58a" />
          <stop offset="1" stopColor="#f0782a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="#0a1714" />
      <circle cx="32" cy="30" r="19" fill="#f0782a" fillOpacity=".16" />
      <path d="M-2 46 12 27l6 7 8-12 6 8 7-11 7 10 5-5 16 22v18H-2Z" fill="#1b4a3f" />
      <path d="m12 27 2.8 3.8-2.4-1-2.2 1.6Zm27-8 3 4.3-2.8-1.1-2.3 1.5Zm12 10 2.8 3.9-2.4-.9-2.2 1.3Z" fill="#f6f2ea" />
      <path d="M-2 52h68v14H-2Z" fill="#10302a" />
      <path d="M32 7v8" stroke="#ffb169" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32.6 7.4 39 9.4 32.6 11.4Z" fill="#ffb169" />
      <path d={kalash} fill={saffron} />
      <rect x="28.8" y="17.7" width="6.4" height="1.9" rx=".95" fill={saffron} />
      <path d={shikhara} fill={saffron} />
      <path d="M18.5 41.5 32 34l13.5 7.5Z" fill={saffron} stroke="#0a1714" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M21 41.5h22V48H21Z" fill="#f0782a" />
      <path d="M17 48h30v2.5H17Z" fill="#f6f2ea" fillOpacity=".9" />
      <path d="M14.5 50.5h35V53h-35Z" fill="#f6f2ea" fillOpacity=".55" />
      <path d="M29.8 48v-3a2.2 2.2 0 0 1 4.4 0v3Z" fill="#0a1714" />
    </svg>
  );
}
