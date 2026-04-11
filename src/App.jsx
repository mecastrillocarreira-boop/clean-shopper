import { useState } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'

function App() {
  const [activeView, setActiveView] = useState('browse')

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activeView={activeView} onNavigate={setActiveView} />
      <BrowsePage />
    </div>
  )
}

export default App
