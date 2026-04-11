import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'

function App() {
  const [activeView, setActiveView] = useState('browse')
  const [session, setSession] = useState(undefined) // undefined = still loading
  const [authView, setAuthView] = useState('sign-in')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return authView === 'sign-up' ? (
      <SignUpPage onNavigateToSignIn={() => setAuthView('sign-in')} />
    ) : (
      <SignInPage onNavigateToSignUp={() => setAuthView('sign-up')} />
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activeView={activeView} onNavigate={setActiveView} />
      <BrowsePage />
    </div>
  )
}

export default App
