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
  const hasError = Boolean(errorMessage)

  const inputClasses = [
    'w-full px-4 py-3 rounded-md border shadow-sm text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none',
    hasError
      ? 'border-error-500 ring-2 ring-error-100 bg-error-100'
      : 'border-neutral-200 bg-neutral-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:bg-neutral-0',
    disabled ? 'border-neutral-300 cursor-not-allowed opacity-60' : '',
  ].join(' ')

  return (
    <div className="flex flex-col">
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
