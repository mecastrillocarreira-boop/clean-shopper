import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

// Props:
//   onNavigateToSignUp — callback that switches App.jsx's authView to 'sign-up'
function SignInPage({ onNavigateToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // async/await lets us write asynchronous code (waiting for Supabase) in a
  // readable top-to-bottom style. `await` pauses until the request completes.
  const handleSubmit = async (e) => {
    e.preventDefault()   // Stops the browser from reloading the page on form submit
    setLoading(true)
    setError(null)       // Clear any previous error before retrying

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message) // Shows the error below the password field via InputField
    }
    // On success: no redirect needed — App.jsx's onAuthStateChange fires automatically
    // and switches session from null to an object, which renders the main app.
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="bg-neutral-0 rounded-xl shadow-lg p-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary-900">Clean Shopper</h1>
          <p className="text-sm text-neutral-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Your password"
            errorMessage={error ?? undefined}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Sign In
          </Button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          New to Clean Shopper?{' '}
          <button
            type="button"
            onClick={onNavigateToSignUp}
            className="text-primary-500 font-medium hover:text-primary-600"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignInPage
