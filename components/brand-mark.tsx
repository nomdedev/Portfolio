export function BrandMark({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M11 46V18L22 32L33 18V46"
        stroke="#F1F5F9"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 18L53 46V18"
        stroke="#F1F5F9"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
