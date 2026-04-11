import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import { fetchProducts } from '../../lib/api/products'

function BrowsePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [savedIds, setSavedIds] = useState(new Set())
  const [listIds, setListIds] = useState(new Set())

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const toggleSaved = (id) =>
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleList = (id) =>
    setListIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const categories = ['All', ...new Set(products.map((p) => p.category))]

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">Browse Products</h1>
        <p className="text-base text-neutral-500 mt-1">
          Search results and AI safety assessments appear here.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map((cat) => {
          const isActive = cat === activeCategory
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-500 text-neutral-0'
                  : 'bg-neutral-0 text-neutral-500 border border-neutral-200 hover:border-primary-300 hover:text-primary-500',
              ].join(' ')}
            >
              {cat}
            </button>
          )
        })}
        {!loading && (
          <span className="text-sm text-neutral-400 ml-2">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </span>
        )}
      </div>

      {/* Error state */}
      {error && (
        <p className="text-sm text-error-500">Failed to load products: {error}</p>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-neutral-100 animate-pulse rounded-lg h-56" />
            ))
          : filtered.map((product) => (
              <ProductCard
                key={product.id}
                productName={product.name}
                brand={product.brand}
                category={product.category}
                safetyStatus="unknown"
                summary={product.description}
                isSaved={savedIds.has(product.id)}
                isInList={listIds.has(product.id)}
                onSave={() => toggleSaved(product.id)}
                onAddToList={() => toggleList(product.id)}
                onClick={() => console.log('open detail', product.id)}
              />
            ))}
      </div>
    </div>
  )
}

export default BrowsePage
