import SafetyBadge from './SafetyBadge'
import CategoryTag from './CategoryTag'
import Button from './Button'

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
  const hasActions = onSave

  return (
    <div
      className={[
        'bg-neutral-0 rounded-lg shadow-md p-6 flex flex-col h-full',
        onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {/* Main content — grows to fill available height */}
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

        {/* Summary */}
        {summary && (
          <p className="text-sm text-neutral-600 line-clamp-2">{summary}</p>
        )}
      </div>

      {/* Action row */}
      {hasActions && (
        <div
          className="flex items-center justify-end gap-2 mt-4 pt-2 border-t border-neutral-200"
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
