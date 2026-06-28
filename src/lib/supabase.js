import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Sem as variáveis do Supabase, o app roda em "modo demo" (auth e histórico locais).
 * Com elas, vira backend real (Auth + Postgres + RLS). A geração de IA é independente:
 * passa sempre pela função /api/generate (que usa a chave da Anthropic no servidor).
 */
export const isSupabaseConfigured = Boolean(url && key)

export const supabase = isSupabaseConfigured ? createClient(url, key) : null
