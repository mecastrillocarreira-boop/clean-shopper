import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'

const SAMPLE_PRODUCTS = [
  {
    id: 'clean',
    productName: "Dr. Bronner's Pure Castile Soap",
    brand: "Dr. Bronner's",
    category: 'Body Wash',
    safetyStatus: 'clean',
    summary: 'Organic, fair trade, no synthetic preservatives or detergents. All ingredients score 1–2 on EWG.',
  },
  {
    id: 'caution',
    productName: 'Neutrogena Hydro Boost Gel Cream',
    brand: 'Neutrogena',
    category: 'Moisturizer',
    safetyStatus: 'caution',
    summary: 'Contains hyaluronic acid and glycerin but includes fragrance and PEGs that may be irritating for sensitive skin.',
  },
  {
    id: 'not-clean',
    productName: 'Febreze Fabric Refresher',
    brand: 'Febreze',
    category: 'Household',
    safetyStatus: 'not-clean',
    summary: 'Contains undisclosed fragrance ingredients and BHT. Multiple components score 6–8 on EWG for developmental toxicity.',
  },
  {
    id: 'unknown',
    productName: 'Acme Daily Face Lotion SPF 30',
    brand: 'Acme Co.',
    category: 'Sunscreen',
    safetyStatus: 'unknown',
    summary: null,
  },
]

function App() {
  const [activeView, setActiveView] = useState('search')
  const [savedIds, setSavedIds] = useState(new Set())
  const [listIds, setListIds] = useState(new Set())

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

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activeView={activeView} onNavigate={setActiveView} />
      <div className="p-8">
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              productName={product.productName}
              brand={product.brand}
              category={product.category}
              safetyStatus={product.safetyStatus}
              summary={product.summary}
              isSaved={savedIds.has(product.id)}
              isInList={listIds.has(product.id)}
              onSave={() => toggleSaved(product.id)}
              onAddToList={() => toggleList(product.id)}
              onClick={() => console.log('open detail', product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
