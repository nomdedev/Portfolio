export function BrandMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <rect width="48" height="48" rx="12" fill="#0b1220" />
      <path
        d="M9 33V15l7 9 7-9v18"
        stroke="#f1f5f9"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 33V15l11 18V15"
        stroke="#34d399"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="15" r="3.4" fill="#34d399" />
    </svg>
  )
}
