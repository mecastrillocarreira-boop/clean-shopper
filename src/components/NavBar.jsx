const NAV_ITEMS = [
  { id: 'browse',      label: 'Browse'        },
  { id: 'library',     label: 'Library'       },
  { id: 'list',        label: 'Shopping List' },
  { id: 'preferences', label: 'Preferences'   },
]

export default function NavBar({ activeView, onNavigate, onSignOut }) {
  return (
    <nav className="w-full bg-neutral-0 border-b border-neutral-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-primary-900">Clean Shopper</span>
      <ul className="flex items-center gap-6">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeView === id
          return (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                    : 'text-neutral-500 hover:text-primary-500'
                }`}
              >
                {label}
              </button>
            </li>
          )
        })}
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
