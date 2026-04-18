import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'

// App is the root component — the top of the component tree. Every other screen
// and component lives inside it. Think of it as the "frame" that holds the whole app.
function App() {
  // activeView tracks which main screen is shown (browse / library / list / preferences).
  const [activeView, setActiveView] = useState('browse')
  // session has three meaningful values — this is the auth state machine:
  //   undefined → Supabase hasn't replied yet (still loading)
  //   null      → no active session (user is signed out)
  //   object    → a valid session (user is signed in)
  const [session, setSession] = useState(undefined)
  // authView switches between the two unauthenticated screens.
  const [authView, setAuthView] = useState('sign-in')

  // On mount, this effect does two things:
  // 1. Reads any existing session from Supabase (restores login after page reload).
  // 2. Subscribes to auth changes (sign-in / sign-out) so the UI updates automatically.
  // The cleanup function (return) tears down the listener when the component unmounts.
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

  // State 1: Loading — Supabase hasn't confirmed auth status yet. Show a spinner
  // rather than flashing the sign-in screen for users who are already signed in.
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
      </div>
    )
  }

  // State 2: Unauthenticated — no session, so show auth screens only.
  // authView toggles between sign-in and sign-up within this branch.
  if (!session) {
    return authView === 'sign-up' ? (
      <SignUpPage onNavigateToSignIn={() => setAuthView('sign-in')} />
    ) : (
      <SignInPage onNavigateToSignUp={() => setAuthView('sign-up')} />
    )
  }

  // State 3: Authenticated — render the full app shell.
  const handleSignOut = () => supabase.auth.signOut()
  // After sign-out, onAuthStateChange fires above and sets session to null,
  // which triggers State 2 automatically — no manual navigation needed.

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activeView={activeView} onNavigate={setActiveView} onSignOut={handleSignOut} />
      <BrowsePage />
    </div>
  )
}

export default App
