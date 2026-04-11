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
  isInList = false,
  onSave,
  onAddToList,
  onClick,
}) {
  const hasActions = onSave || onAddToList

  return (
    <div
      className={[
        'bg-neutral-0 rounded-lg shadow-md p-6 flex flex-col gap-3',
        onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {/* Top row: name + safety badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-medium text-neutral-900">{productName}</h3>
        <SafetyBadge status={safetyStatus} size="sm" />
      </div>

      {/* Brand + category tag */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-500">{brand}</span>
        <CategoryTag label={category} variant="category" />
      </div>

      {/* Summary */}
      {summary && (
        <p className="text-sm text-neutral-600 line-clamp-2">{summary}</p>
      )}

      {/* Action row */}
      {hasActions && (
        <div
          className="flex items-center gap-2 pt-2 border-t border-neutral-200"
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
          {onAddToList && (
            <Button variant="secondary" size="sm" onClick={onAddToList}>
              {isInList ? 'In List' : 'Add to List'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductCard
