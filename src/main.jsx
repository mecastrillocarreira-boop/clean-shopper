import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Entry point — mounts the entire React app into the <div id="root"> in index.html.
// StrictMode is a dev-only wrapper that intentionally double-renders components
// to surface side effects early; it has no effect in production.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
