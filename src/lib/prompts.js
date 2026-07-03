// Construtor de prompt + parser de variações para a geração de conteúdo.
// Fica em src/lib (e não em /api) porque é importado tanto pela função
// serverless quanto pelos testes — é lógica pura, sem segredos.
//
// O prompt é montado INTEIRO no idioma de saída (idioma), com a diretiva de
// idioma no começo e no fim. Isso evita o modelo "desandar" pro português
// quando o pedido é em inglês/espanhol.
import { getContentType } from './contentTypes.js'

const TOM = {
  pt: { profissional: 'profissional e confiável', descontraido: 'descontraído e próximo', persuasivo: 'persuasivo e focado em conversão', divertido: 'divertido e leve' },
  en: { profissional: 'professional and trustworthy', descontraido: 'casual and friendly', persuasivo: 'persuasive and conversion-focused', divertido: 'fun and light' },
  es: { profissional: 'profesional y confiable', descontraido: 'relajado y cercano', persuasivo: 'persuasivo y orientado a la conversión', divertido: 'divertido y ligero' },
}

// Instrução de estilo por tipo, no idioma de saída. PT vem do contentTypes;
// EN/ES ficam aqui (o bloco `en` do contentTypes só tem rótulos de UI).
const INSTRUCAO_EN = {
  descricao: 'Write persuasive product descriptions that highlight concrete benefits and spark the desire to buy.',
  legenda: 'Write Instagram captions with a strong hook on the first line, emojis in moderation, and a clear CTA.',
  anuncio: 'Create short, direct ads (headline + body) focused on conversion.',
  email: 'Write sales emails with a catchy subject line and a persuasive body, ending with a clear CTA.',
  headline: 'Create short, magnetic headlines, ready for a page hero or an ad.',
  bio: 'Write short, memorable bios aligned with the brand identity.',
}
const INSTRUCAO_ES = {
  descricao: 'Crea descripciones de producto persuasivas, destacando beneficios concretos y despertando el deseo de compra.',
  legenda: 'Escribe subtítulos de Instagram con un gancho fuerte en la primera línea, emojis con moderación y un CTA claro.',
  anuncio: 'Crea anuncios cortos y directos (título + cuerpo) enfocados en la conversión.',
  email: 'Escribe correos de venta con un asunto llamativo y un cuerpo persuasivo, terminando con un CTA claro.',
  headline: 'Crea títulos cortos y magnéticos, listos para el encabezado de una página o un anuncio.',
  bio: 'Escribe biografías cortas, memorables y alineadas con la identidad de la marca.',
}

const SCAFFOLD = {
  pt: {
    lang: 'Escreva TODO o conteúdo em português do Brasil.',
    role: 'Você é um copywriter sênior especialista em marketing e conversão.',
    tone: (t) => `Use um tom ${t}.`,
    gen: (n) => `Gere exatamente ${n} variações distintas entre si, prontas para uso.`,
    json: 'Responda APENAS com um array JSON de strings — sem comentários, sem markdown, sem texto fora do array. Exemplo: ["variação 1", "variação 2", "variação 3"].',
    type: 'Tipo de conteúdo',
    ctx: 'Contexto',
    noCtx: '(sem contexto adicional)',
  },
  en: {
    lang: 'Write ALL of the content in English. Do not use any Portuguese.',
    role: 'You are a senior marketing and conversion copywriter.',
    tone: (t) => `Use a ${t} tone.`,
    gen: (n) => `Generate exactly ${n} distinct, ready-to-use variations.`,
    json: 'Reply ONLY with a JSON array of strings — no comments, no markdown, no text outside the array. Example: ["variation 1", "variation 2", "variation 3"].',
    type: 'Content type',
    ctx: 'Context',
    noCtx: '(no additional context)',
  },
  es: {
    lang: 'Escribe TODO el contenido en español. No uses portugués ni inglés.',
    role: 'Eres un copywriter sénior especialista en marketing y conversión.',
    tone: (t) => `Usa un tono ${t}.`,
    gen: (n) => `Genera exactamente ${n} variaciones distintas entre sí, listas para usar.`,
    json: 'Responde SOLO con un array JSON de strings — sin comentarios, sin markdown, sin texto fuera del array. Ejemplo: ["variación 1", "variación 2", "variación 3"].',
    type: 'Tipo de contenido',
    ctx: 'Contexto',
    noCtx: '(sin contexto adicional)',
  },
}

function instrucao(ct, tipo, idioma) {
  if (idioma === 'en') return INSTRUCAO_EN[tipo] || ct?.promptInstrucao || ''
  if (idioma === 'es') return INSTRUCAO_ES[tipo] || ct?.promptInstrucao || ''
  return ct?.promptInstrucao || ''
}

function label(ct, tipo, idioma) {
  if (idioma === 'en' && ct?.en?.label) return ct.en.label
  return ct?.label || tipo
}

export function buildMessages({ tipo, contexto, tom = 'profissional', idioma = 'pt', n = 3 }) {
  const s = SCAFFOLD[idioma] || SCAFFOLD.pt
  const toneWord = (TOM[idioma] || TOM.pt)[tom] || (TOM[idioma] || TOM.pt).profissional
  const ct = getContentType(tipo)

  const campos = Object.entries(contexto || {})
    .filter(([, v]) => String(v ?? '').trim())
    .map(([k, v]) => `- ${k}: ${String(v).trim()}`)
    .join('\n')

  const system =
    `${s.lang} ` +
    `${s.role} ${s.tone(toneWord)} ` +
    `${instrucao(ct, tipo, idioma)} ` +
    `${s.gen(n)} ` +
    `${s.json} ` +
    `${s.lang}`

  const user = `${s.type}: ${label(ct, tipo, idioma)}\n${s.ctx}:\n${campos || s.noCtx}`

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
