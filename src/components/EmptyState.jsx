import Button from './Button'

// Generic empty state — shown when a list or search returns no results.
// Props:
//   heading     — required; the main message (e.g. "No products found")
//   body        — optional supporting text
//   actionLabel — optional CTA button label; button only renders when BOTH
//                 actionLabel and onAction are provided
//   onAction    — callback fired when the CTA button is clicked
//   icon        — optional SVG icon rendered above the heading
function EmptyState({ heading, body, actionLabel, onAction, icon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
      {icon && (
        <div className="w-16 h-16 text-neutral-300">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold text-neutral-700">{heading}</h3>

      {body && (
        <p className="text-base text-neutral-500 max-w-sm">{body}</p>
      )}

      {/* Requiring both props prevents rendering a broken button with no handler */}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
