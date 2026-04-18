import { useState } from 'react'

// Props:
//   value, onChange — controlled input: value is read from state, onChange writes back to it
//   onSubmit        — called when the user presses Enter (currently a no-op in BrowsePage —
//                     filtering happens live on every keystroke via onChange)
//   placeholder     — hint text shown when the field is empty
//   loading         — disables the field while data is loading
//   disabled        — disables the field in other contexts
function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for a product...',
  loading = false,
  disabled = false,
}) {
  // focused tracks whether the input has keyboard focus so the border can change style.
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    // Prevents the browser's default form-submit behaviour (which would reload the page).
    e.preventDefault()
    if (!disabled && !loading) onSubmit()
  }

  const wrapperClass = [
    'w-full flex items-center gap-2 bg-neutral-0 rounded-xl shadow-md px-4 py-3 border transition-all',
    disabled
      ? 'border-neutral-300 opacity-60'
      : focused
      ? 'border-primary-500 ring-2 ring-primary-100'
      : 'border-neutral-200',
  ].join(' ')

  return (
    <form onSubmit={handleSubmit} className={wrapperClass}>
      {/* Search icon */}
      <svg
        className="h-5 w-5 text-neutral-400 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled || loading}
        className="flex-1 text-base text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none disabled:cursor-not-allowed"
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-neutral-400 hover:text-neutral-600 flex-shrink-0 focus:outline-none"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  )
}

export default SearchBar
