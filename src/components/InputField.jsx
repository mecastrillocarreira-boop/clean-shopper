// Props:
//   id           — links the <label> to the <input> via htmlFor/id (accessibility)
//   label        — the field label shown above the input
//   value, onChange — controlled input pattern (same as SearchBar)
//   placeholder  — hint text shown when empty
//   helperText   — subtle guidance shown below the field in the default state
//   errorMessage — error text shown below the field; when present it replaces helperText
//   disabled     — disables interaction and dims the field
//   type         — HTML input type: 'text' | 'email' | 'password' etc.
function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  type = 'text',
}) {
  // Boolean() converts any truthy/falsy value to a strict true/false.
  const hasError = Boolean(errorMessage)

  // Three visual states are encoded here: error, default/focus, disabled.
  // They're merged into one string; Tailwind applies whichever classes are present.
  const inputClasses = [
    'w-full px-4 py-3 rounded-md border shadow-sm text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none',
    hasError
      ? 'border-error-500 ring-2 ring-error-100 bg-error-100'           // Error state: red border + tint
      : 'border-neutral-200 bg-neutral-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:bg-neutral-0', // Default + focus
    disabled ? 'border-neutral-300 cursor-not-allowed opacity-60' : '',  // Disabled state
  ].join(' ')

  return (
    <div className="flex flex-col">
      {/* htmlFor must match the input's id so clicking the label focuses the field */}
      <label htmlFor={id} className="text-sm font-medium text-neutral-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
      />
      {/* Error message takes priority — helperText is hidden when an error is present */}
      {hasError && (
        <p className="text-sm text-error-500 mt-1">{errorMessage}</p>
      )}
      {!hasError && helperText && (
        <p className="text-sm text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  )
}

export default InputField
