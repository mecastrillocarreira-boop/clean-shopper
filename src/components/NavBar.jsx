// NAV_ITEMS is defined outside the component so it's created once, not on every render.
// Each object's `id` matches the activeView values used in App.jsx.
const NAV_ITEMS = [
  { id: 'browse',      label: 'Browse'        },
  { id: 'library',     label: 'Library'       },
  { id: 'list',        label: 'Shopping List' },
  { id: 'preferences', label: 'Preferences'   },
]

// Props:
//   activeView  — which screen is currently shown (controls the active tab style)
//   onNavigate  — callback that changes the active screen when a tab is clicked
//   onSignOut   — optional; when passed, renders the Sign Out button
export default function NavBar({ activeView, onNavigate, onSignOut }) {
  return (
    <nav className="w-full bg-neutral-0 border-b border-neutral-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-primary-900">Clean Shopper</span>
      <ul className="flex items-center gap-6">
        {/* Loop over NAV_ITEMS to render one tab button per screen.
            isActive compares the item's id against the current activeView. */}
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeView === id
          return (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-500 border-b-2 border-primary-500 pb-1' // Active: green underline
                    : 'text-neutral-500 hover:text-primary-500'              // Default: grey, green on hover
                }`}
              >
                {label}
              </button>
            </li>
          )
        })}
        {/* onSignOut is only passed when a session exists, so this button
            only renders for authenticated users. */}
        {onSignOut && (
          <li>
            <button
              onClick={onSignOut}
              className="text-sm font-medium text-neutral-400 hover:text-error-500 transition-colors"
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
