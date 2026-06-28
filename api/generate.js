// Função serverless de geração de conteúdo.
//
// A chave da Claude API vive SÓ aqui (no servidor), nunca no front-end — é o
// ponto central da arquitetura do CopyFlow. Sem a chave configurada, devolve um
// fallback de exemplo (HTTP 200, `demo: true`) para o link do portfólio ficar
// sempre no ar.
import Anthropic from '@anthropic-ai/sdk'
import { buildMessages, parseVariations } from '../src/lib/prompts.js'
import { demoGenerate } from '../src/lib/demoContent.js'

const N = 3

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const { tipo, contexto, tom, idioma } = req.body || {}
  if (!tipo) {
    return res.status(400).json({ error: 'Tipo de conteúdo ausente.' })
  }

  const key = process.env.ANTHROPIC_API_KEY
  // Sem chave → modo demo (exemplo realista, sem chamar a API).
  if (!key) {
    return res.status(200).json({ variacoes: demoGenerate({ tipo, contexto, tom, idioma, n: N }), demo: true })
  }

  try {
    const anthropic = new Anthropic({ apiKey: key })
    const { system, user, n } = buildMessages({ tipo, contexto, tom, idioma, n: N })
    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      messages: [{ role: 'user', content: user }],
    })
    const text = (msg.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    const variacoes = parseVariations(text, n)
    // Se o modelo recusar ou devolver algo inesperado, cai no exemplo.
    if (!variacoes.length) {
      return res.status(200).json({ variacoes: demoGenerate({ tipo, contexto, tom, idioma, n }), demo: true })
    }
    return res.status(200).json({ variacoes, demo: false })
  } catch (e) {
    return res.status(500).json({ error: e?.message || 'Falha ao gerar conteúdo.' })
  }
}
