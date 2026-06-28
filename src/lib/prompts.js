// Construtor de prompt + parser de variações para a geração de conteúdo.
// Fica em src/lib (e não em /api) porque é importado tanto pela função
// serverless quanto pelos testes — é lógica pura, sem segredos.
import { getContentType } from './contentTypes'

const TOM = {
  profissional: 'profissional e confiável',
  descontraido: 'descontraído e próximo',
  persuasivo: 'persuasivo e focado em conversão',
  divertido: 'divertido e leve',
}

const IDIOMA = {
  pt: 'português do Brasil',
  en: 'inglês',
  es: 'espanhol',
}

export function buildMessages({ tipo, contexto, tom = 'profissional', idioma = 'pt', n = 3 }) {
  const ct = getContentType(tipo)
  const campos = Object.entries(contexto || {})
    .filter(([, v]) => String(v ?? '').trim())
    .map(([k, v]) => `- ${k}: ${String(v).trim()}`)
    .join('\n')

  const system =
    `Você é um copywriter sênior especialista em marketing e conversão. ` +
    `Escreva em ${IDIOMA[idioma] || IDIOMA.pt}, com tom ${TOM[tom] || TOM.profissional}. ` +
    `${ct?.promptInstrucao || ''} ` +
    `Gere exatamente ${n} variações distintas entre si, prontas para uso. ` +
    `Responda APENAS com um array JSON de strings (sem comentários, sem markdown, sem texto fora do array). ` +
    `Exemplo de formato: ["variação 1", "variação 2", "variação 3"]`

  const user = `Tipo de conteúdo: ${ct?.label || tipo}\nContexto:\n${campos || '(sem contexto adicional)'}`

  return { system, user, n }
}

export function parseVariations(text, n = 3) {
  if (!text) return []
  // Caminho feliz: um array JSON em algum ponto do texto.
  try {
    const m = text.match(/\[[\s\S]*\]/)
    if (m) {
      const arr = JSON.parse(m[0])
      if (Array.isArray(arr)) {
        return arr.map((s) => String(s).trim()).filter(Boolean).slice(0, n)
      }
    }
  } catch {
    /* cai no fallback abaixo */
  }
  // Fallback: separa por lista numerada ("1)" / "2.") ou por linhas de "---".
  return text
    .split(/\n(?:-{3,}|\d+[).]\s*)/)
    .map((s) => s.replace(/^\d+[).]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, n)
}
