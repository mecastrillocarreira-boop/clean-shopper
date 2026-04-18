import SafetyBadge from './SafetyBadge'
import CategoryTag from './CategoryTag'
import Button from './Button'

// Props:
//   productName, brand, category, safetyStatus, summary — display data
//   isSaved     — controls the Save button's toggled state (default false)
//   onSave      — callback fired when Save is clicked; also gates whether the action row renders
//   onClick     — optional; when passed, the whole card becomes clickable (detail view)
function ProductCard({
  productName,
  brand,
  category,
  safetyStatus,
  summary,
  isSaved = false,
  onSave,
  onClick,
}) {
  // hasActions is true when at least one action button is present.
  // Keeps the action row from rendering as an empty bar when no callbacks are passed.
  const hasActions = onSave

  return (
    <div
      className={[
        'bg-neutral-0 rounded-lg shadow-md p-6 flex flex-col h-full',
        // Only add pointer cursor and hover shadow if the card itself is clickable.
        onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {/* Main content — flex-1 makes this section grow to push actions to the bottom */}
      <div className="flex flex-col gap-3 flex-1">
        {/* Top row: name + brand (stacked) + safety badge */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-medium text-neutral-900">{productName}</h3>
            <span className="text-sm text-neutral-500">{brand}</span>
          </div>
          <SafetyBadge status={safetyStatus} size="sm" />
        </div>

        {/* Category tag */}
        <div>
          <CategoryTag label={category} variant="outline" />
        </div>

        {/* Summary — only rendered when the prop is present; line-clamp-2 truncates at 2 lines */}
        {summary && (
          <p className="text-sm text-neutral-600 line-clamp-2">{summary}</p>
        )}
      </div>

      {/* Action row — pinned to the bottom of the card */}
      {hasActions && (
        <div
          className="flex items-center justify-end gap-2 mt-4 pt-2 border-t border-neutral-200"
          // stopPropagation prevents button clicks from bubbling up to the card's
          // onClick handler, so clicking Save doesn't also open the detail view.
          onClick={(e) => e.stopPropagation()}
        >
          {onSave && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className={isSaved ? 'text-primary-500' : ''}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductCard
