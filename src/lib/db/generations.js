import { supabase, isSupabaseConfigured } from '../supabase'
import { demo } from './demo'

// Normaliza a linha do banco para o formato que a UI usa.
const normalize = (row) => ({
  id: row.id,
  tipo: row.tipo,
  contexto: row.input_json || {},
  variacoes: row.output_json?.variacoes || [],
  idioma: row.idioma || 'pt',
  tom: row.tom || 'profissional',
  favorito: Boolean(row.favorito),
  criado_em: row.criado_em,
})

export async function listGenerations() {
  if (!isSupabaseConfigured) return (await demo.listGenerations()).map(normalize)
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .order('criado_em', { ascending: false })
  if (error) throw error
  return (data ?? []).map(normalize)
}

export async function createGeneration({ tipo, contexto, tom, idioma, variacoes }) {
  if (!isSupabaseConfigured) return normalize(await demo.createGeneration({ tipo, contexto, tom, idioma, variacoes }))
  const { data: userData } = await supabase.auth.getUser()
  const row = {
    user_id: userData?.user?.id,
    tipo,
    input_json: contexto || {},
    output_json: { variacoes: variacoes || [] },
    idioma: idioma || 'pt',
    tom: tom || 'profissional',
  }
  const { data, error } = await supabase.from('generations').insert(row).select().single()
  if (error) throw error
  return normalize(data)
}

export async function toggleFavorite(id, favorito) {
  if (!isSupabaseConfigured) return normalize(await demo.toggleFavorite(id, favorito))
  const { data, error } = await supabase.from('generations').update({ favorito }).eq('id', id).select().single()
  if (error) throw error
  return normalize(data)
}

export async function countGenerations() {
  if (!isSupabaseConfigured) return demo.countGenerations()
  const { count, error } = await supabase.from('generations').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count ?? 0
}
