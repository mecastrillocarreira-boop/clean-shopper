const statusConfig = {
  clean: {
    label: 'Clean',
    wrapper: 'bg-success-100 text-success-500',
    dot: 'bg-success-500',
  },
  caution: {
    label: 'Caution',
    wrapper: 'bg-warning-100 text-warning-500',
    dot: 'bg-warning-500',
  },
  'not-clean': {
    label: 'Not Clean',
    wrapper: 'bg-error-100 text-error-500',
    dot: 'bg-error-500',
  },
  unknown: {
    label: 'Unknown',
    wrapper: 'bg-neutral-100 text-neutral-500',
    dot: 'bg-neutral-400',
  },
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

function SafetyBadge({ status, label, size = 'md' }) {
  const config = statusConfig[status] ?? statusConfig.unknown
  const displayLabel = label ?? config.label

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${sizes[size]} ${config.wrapper}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {displayLabel}
    </span>
  )
}

export default SafetyBadge
