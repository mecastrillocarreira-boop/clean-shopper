// statusConfig is a lookup object — instead of a chain of if/else checks,
// we just look up the status key to get the right label and colour classes.
// This is easier to extend: adding a new status means adding one object here.
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

// Outline variant strips the status colour — used in contexts where the coloured
// background would clash with the surrounding design.
const outlineWrapper = 'border border-neutral-300 text-neutral-600'
const outlineDot = 'bg-neutral-400'

// Props:
//   status   — 'clean' | 'caution' | 'not-clean' | 'unknown' (controls colour)
//   label    — optional override for the text; falls back to the status's default label
//   size     — 'sm' | 'md'
//   variant  — 'default' (coloured fill) | 'outline' (grey border, no fill)
function SafetyBadge({ status, label, size = 'md', variant = 'default' }) {
  // ?? falls back to 'unknown' config if an unrecognised status is passed.
  const config = statusConfig[status] ?? statusConfig.unknown
  // ?? means "use config.label unless a custom label was explicitly passed."
  const displayLabel = label ?? config.label

  const wrapperStyles = variant === 'outline' ? outlineWrapper : config.wrapper
  const dotStyles = variant === 'outline' ? outlineDot : config.dot

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap ${sizes[size]} ${wrapperStyles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles}`} />
      {displayLabel}
    </span>
  )
}

export default SafetyBadge
