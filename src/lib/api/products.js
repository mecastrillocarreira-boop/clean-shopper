import { supabase } from '../supabase'

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, category, description')
    .order('id')

  if (error) throw error
  return data
}
