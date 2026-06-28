import { supabase, isSupabaseConfigured } from '../supabase'
import { demo } from './demo'

export async function signIn(email, senha) {
  if (!isSupabaseConfigured) return demo.signIn(email, senha)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
  if (error) throw new Error('E-mail ou senha inválidos.')
  return data.session
}

export async function signUp({ email, senha, nome }) {
  if (!isSupabaseConfigured) return demo.signUp({ email, senha, nome })
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: { data: { nome: nome?.trim() || undefined } },
  })
  if (error) throw new Error(error.message || 'Não foi possível criar a conta.')
  return data.session
}

export async function signOut() {
  if (!isSupabaseConfigured) return demo.signOut()
  await supabase.auth.signOut()
}

export async function getSession() {
  if (!isSupabaseConfigured) return demo.getSession()
  const { data } = await supabase.auth.getSession()
  return data.session ?? null
}

export function onAuthChange(callback) {
  if (!isSupabaseConfigured) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_e, session) => callback(session))
  return () => data.subscription.unsubscribe()
}
