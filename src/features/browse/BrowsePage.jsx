// ─── Imports ────────────────────────────────────────────────────────────────
// React hooks used to manage page state and run code at the right moment.
// UI building blocks and the data-fetching function for products.
import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import SearchBar from '../../components/SearchBar'
import EmptyState from '../../components/EmptyState'
import { fetchProducts } from '../../lib/api/products'

function BrowsePage() {

  // ─── Page State ─────────────────────────────────────────────────────────────
  // useState() gives the page "memory" — a value the page tracks and re-renders
  // when it changes. Each piece of state below maps to a UI condition you'd
  // design for.

  const [products, setProducts] = useState([])      // The full list of products fetched from the database
  const [loading, setLoading] = useState(true)      // True while the API call is in flight → shows skeletons
  const [error, setError] = useState(null)          // Holds an error message if the fetch fails → shows error text
  const [searchQuery, setSearchQuery] = useState('') // The current value typed into the search bar
  const [activeCategory, setActiveCategory] = useState('All') // Which category filter pill is selected
  const [savedIds, setSavedIds] = useState(new Set()) // Set of product IDs the user has saved (a Set avoids duplicates)
  const [listIds, setListIds] = useState(new Set())   // Set of product IDs added to the shopping list

  // ─── Data Fetching ───────────────────────────────────────────────────────────
  // useEffect(() => { ... }, []) runs once when the page first mounts (loads).
  // The empty [] at the end means "only run this once, not on every re-render."
  // Think of it as the "on page load" trigger in a prototype.
  useEffect(() => {
    fetchProducts()
      .then(setProducts)                          // On success: store the products in state
      .catch((err) => setError(err.message))      // On failure: store the error message in state
      .finally(() => setLoading(false))           // Either way: mark loading as done
  }, [])

  // ─── Toggle Handlers ────────────────────────────────────────────────────────
  // These functions flip a product between saved/unsaved (or listed/unlisted).
  // "prev" is the current Set; we clone it (new Set(prev)) so React detects
  // the change and re-renders. This pattern is standard for toggling items.

  const toggleSaved = (id) =>
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id) // If already saved → remove; if not → add
      return next
    })

  const toggleList = (id) =>
    setListIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  // ─── Derived Data ────────────────────────────────────────────────────────────
  // These values are computed from state on every render — not stored separately.
  // Think of them as "calculated fields" that stay in sync automatically.

  // Build the category pill list from the actual data: ["All", "Shampoo", "Cleaner", ...]
  // new Set() removes duplicates; spread (...) converts the Set back to an array.
  const categories = ['All', ...new Set(products.map((p) => p.category))]

  // Apply both filters in sequence: category first, then search query.
  // The result is the list that gets rendered in the product grid.
  const filtered = products
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => {
      const q = searchQuery.trim().toLowerCase()
      if (!q) return true // No search query → show everything
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) // The ?. means "only check if description exists"
      )
    })

  // ─── Render (what the user sees) ────────────────────────────────────────────
  // Everything inside `return ( )` is JSX — a mix of HTML-like markup and JS.
  // Conditional rendering ( && ) works like: "if this is true, show this block."
  // The page has four mutually exclusive display states:
  //   1. Error    → fetch failed
  //   2. Loading  → skeletons while data arrives
  //   3. Empty    → fetch succeeded but no results match the filters
  //   4. Grid     → results to show
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Browse Products</h1>
        <p className="text-base text-neutral-500 mt-1">
          Find home and personal care products and see their ingredient safety assessment.
        </p>
      </div>

      {/* Search input — two-way bound: value reads from state, onChange writes back to it */}
      <div className="mb-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={() => {}}
          placeholder="Search by product name, brand, or ingredient..."
          disabled={loading} // Disabled while loading so users can't search before data arrives
        />
      </div>

      {/* Category filter pills — one button per category; active pill gets primary color */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map((cat) => {
          const isActive = cat === activeCategory
          return (
            <button
              key={cat}                                    // key helps React track list items efficiently
              onClick={() => setActiveCategory(cat)}      // Clicking a pill updates the filter
              className={[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-500 text-neutral-0'       // Active state: filled green pill
                  : 'bg-neutral-0 text-neutral-500 border border-neutral-200 hover:border-primary-300 hover:text-primary-500', // Inactive: outlined pill
              ].join(' ')}
            >
              {cat}
            </button>
          )
        })}

        {/* Result count — only shown once loading is complete */}
        {!loading && (
          <span className="text-sm text-neutral-400 ml-2">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </span>
        )}
      </div>

      {/* ── State 1: Error ───────────────────────────────────────────────────── */}
      {error && (
        <p className="text-sm text-error-500">Failed to load products: {error}</p>
      )}

      {/* ── State 2: Loading ─────────────────────────────────────────────────── */}
      {/* Renders 6 skeleton cards (grey animated blocks) as placeholders.
          Array.from({ length: 6 }) creates an empty array of 6 slots to map over. */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-neutral-100 animate-pulse rounded-lg h-56" />
          ))}
        </div>
      )}

      {/* ── State 3: No results ──────────────────────────────────────────────── */}
      {/* The body message is different depending on whether a search term caused the
          empty state (search-driven) or the category is simply empty (browse-driven). */}
      {!loading && filtered.length === 0 && (
        <EmptyState
          heading="No products found"
          body={
            searchQuery.trim()
              ? `No results for "${searchQuery}". Try a different name, brand, or ingredient.`
              : 'No products in this category yet.'
          }
        />
      )}

      {/* ── State 4: Product grid ────────────────────────────────────────────── */}
      {/* Responsive grid: 1 column on mobile → 2 on tablet → 3 on desktop.
          Each ProductCard gets the data and handlers it needs as props. */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.name}
              brand={product.brand}
              category={product.category}
              safetyStatus="unknown"                        // AI assessment not implemented yet
              summary={product.description}
              isSaved={savedIds.has(product.id)}            // True if this product's ID is in the saved set
              isInList={listIds.has(product.id)}
              onSave={() => toggleSaved(product.id)}        // Passes a click handler into the card
              onAddToList={() => toggleList(product.id)}
              onClick={() => console.log('open detail', product.id)} // Placeholder: will open detail view
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default BrowsePage // Makes this component available to import elsewhere (e.g. the app router)
