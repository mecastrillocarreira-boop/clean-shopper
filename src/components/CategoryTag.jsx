// Colour lookup per variant — same lookup-object pattern used in SafetyBadge.
const variantStyles = {
  category:    'bg-accent-100 text-accent-800',       // Purple tint — used for product categories
  certification: 'bg-primary-100 text-primary-800',   // Green tint — used for certifications
  outline:     'border border-neutral-300 text-neutral-600', // No fill — used on cards
}

// Props:
//   label    — the text shown inside the pill
//   variant  — controls the colour style (see lookup above)
//   onRemove — optional; when passed, renders a × button that calls this callback on click
function CategoryTag({ label, variant = 'category', onRemove }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
      {/* Remove button only renders when an onRemove callback is provided */}
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
