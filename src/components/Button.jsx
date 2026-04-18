// Props:
//   variant   — 'primary' (green fill) | 'secondary' (orange fill) | 'ghost' (outlined)
//   size      — 'sm' | 'md' | 'lg'
//   children  — the button label (text or elements inside the tag)
//   onClick   — click handler
//   type      — HTML button type; default 'button' prevents accidental form submission
//   disabled  — disables interaction and applies a muted visual style
//   loading   — shows a spinner and also disables the button to prevent double-submits
//   fullWidth — stretches the button to 100% of its container
function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
}) {
  // Treat loading the same as disabled so users can't click while a request is in flight.
  const isDisabled = disabled || loading

  // `base` contains styles that apply to every button regardless of variant or size.
  const base =
    'inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none'

  // Each lookup object maps a key to its Tailwind class string.
  // Separating size from variant keeps the class logic readable and easy to extend.
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Each variant has two states — normal and disabled — selected by isDisabled.
  const variants = {
    primary: isDisabled
      ? 'bg-primary-300 text-neutral-0 cursor-not-allowed opacity-60'
      : 'bg-primary-500 text-neutral-0 shadow-sm hover:bg-primary-600 active:bg-primary-700',
    secondary: isDisabled
      ? 'bg-secondary-300 text-neutral-0 cursor-not-allowed opacity-60'
      : 'bg-secondary-500 text-neutral-0 shadow-sm hover:bg-secondary-600 active:bg-secondary-700',
    ghost: isDisabled
      ? 'bg-transparent text-primary-500 border border-primary-200 opacity-40 cursor-not-allowed'
      : 'bg-transparent text-primary-500 border border-primary-200 hover:bg-primary-50 hover:border-primary-300 active:bg-primary-100',
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      // join(' ') merges the class arrays into one space-separated string for Tailwind.
      className={[
        base,
        sizes[size],
        variants[variant],
        fullWidth ? 'w-full' : '',
      ].join(' ')}
    >
      {/* Spinner is prepended inside the button label when loading is true */}
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
