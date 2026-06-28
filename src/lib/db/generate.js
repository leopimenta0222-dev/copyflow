// Cliente da função serverless. A geração SEMPRE passa pelo /api/generate —
// a chave da Claude API nunca chega ao front-end. Sem chave no servidor, a
// função devolve um exemplo (demo: true).
export async function generate({ tipo, contexto, tom, idioma }) {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, contexto, tom, idioma }),
  })
  let data = null
  try { data = await res.json() } catch { /* resposta sem corpo */ }
  if (!res.ok) throw new Error(data?.error || 'Falha ao gerar conteúdo. Tente novamente.')
  return { variacoes: data?.variacoes || [], demo: Boolean(data?.demo) }
}
