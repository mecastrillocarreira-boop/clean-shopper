import { supabase } from '../supabase'

// All database queries live here, not in components — this keeps data-fetching
// logic in one place and components focused on display only.

// Fetches the full product list from the Supabase `products` table.
// Only the fields actually used in the UI are selected (not `*`) to avoid
// pulling down unused data.
// `throw error` re-throws Supabase errors so callers (e.g. BrowsePage) can
// catch them and show appropriate error states to the user.
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, category, description')
    .order('id')

  if (error) throw error
  return data
}
