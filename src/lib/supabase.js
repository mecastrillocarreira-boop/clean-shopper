import { createClient } from '@supabase/supabase-js'

// import.meta.env reads values from the .env file at the project root.
// VITE_ prefix is required — Vite only exposes variables with that prefix to the browser.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Creates a single shared Supabase client used everywhere in the app.
// The anon key is safe to expose in the browser — Supabase Row Level Security
// controls what this key can actually read or write in the database.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
