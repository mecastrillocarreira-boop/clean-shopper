const variantStyles = {
  category: 'bg-accent-100 text-accent-800',
  certification: 'bg-primary-100 text-primary-800',
}

function CategoryTag({ label, variant = 'category', onRemove }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 opacity-60 hover:opacity-100 focus:outline-none"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  )
}

export default CategoryTag
