import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

function SignUpPage({ onNavigateToSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="bg-neutral-0 rounded-xl shadow-lg p-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary-900">Clean Shopper</h1>
          <p className="text-sm text-neutral-500 mt-1">Create your account</p>
        </div>

        {success ? (
          <div className="text-center">
            <p className="text-base text-neutral-700 mb-6">
              Check your email to confirm your account, then sign in.
            </p>
            <Button variant="ghost" fullWidth onClick={onNavigateToSignIn}>
              Go to Sign In
            </Button>
          </div>
        ) : (
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
              placeholder="Create a password"
              errorMessage={error ?? undefined}
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Create Account
            </Button>
          </form>
        )}

        <p className="text-sm text-neutral-500 text-center mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToSignIn}
            className="text-primary-500 font-medium hover:text-primary-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
