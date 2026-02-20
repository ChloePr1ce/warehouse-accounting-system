import { supabase } from '@/lib/supabaseClient'

export async function getWarehouses() {
  const { data, error } = await supabase
    .from('warehouses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createWarehouse(name: string, location: string) {
  const { data, error } = await supabase
    .from('warehouses')
    .insert([{ name, location }])
    .select()

  if (error) throw error
  return data
}

export async function deleteWarehouse(id: any) {
  const { error } = await supabase
    .from('warehouses')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function updateWarehouse(id: any, name: any, location: any) {
  const { data, error } = await supabase
    .from('warehouses')
    .update({ name, location })
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}