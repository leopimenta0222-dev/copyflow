// Função serverless de geração de conteúdo.
//
// A chave da IA vive SÓ aqui (no servidor), nunca no front-end — é o ponto
// central da arquitetura do CopyFlow. Usa a Groq (gratuita, modelo Llama 3.3 70B)
// via API compatível com OpenAI. Sem a chave — ou se a IA falhar/atingir o limite —
// devolve um fallback de exemplo (HTTP 200, `demo: true`), pro link do portfólio
// ficar sempre no ar.
import { buildMessages, parseVariations } from '../src/lib/prompts.js'
import { demoGenerate } from '../src/lib/demoContent.js'

const N = 3
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const { tipo, contexto, tom, idioma } = req.body || {}
  if (!tipo) {
    return res.status(400).json({ error: 'Tipo de conteúdo ausente.' })
  }

  // Qualquer caminho de falha cai aqui: exemplo realista, sempre 200.
  const fallback = () =>
    res.status(200).json({ variacoes: demoGenerate({ tipo, contexto, tom, idioma, n: N }), demo: true })

  const key = process.env.GROQ_API_KEY
  if (!key) return fallback()

  try {
    const { system, user, n } = buildMessages({ tipo, contexto, tom, idioma, n: N })
    const r = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        temperature: 0.9,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    })
    // Erro/limite de uso → cai no exemplo (o link nunca mostra erro).
    if (!r.ok) return fallback()
    const data = await r.json()
    const text = data?.choices?.[0]?.message?.content || ''
    const variacoes = parseVariations(text, n)
    if (!variacoes.length) return fallback()
    return res.status(200).json({ variacoes, demo: false })
  } catch {
    return fallback()
  }
}
