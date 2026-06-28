// Backend "demo" — usado quando o Supabase não está configurado.
// Guarda histórico e sessão no localStorage. Conta-demo: dono@copyflow.com / copyflow123.
const LS_GENERATIONS = 'cf.demo.generations'
const LS_SESSION = 'cf.demo.session'
const LS_ACCOUNTS = 'cf.demo.accounts'

const DEMO_EMAIL = 'dono@copyflow.com'
const DEMO_SENHA = 'copyflow123'

const uid = () => globalThis.crypto?.randomUUID?.() ?? 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
const read = (k, fb) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : fb } catch { return fb } }
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }
const daysAgo = (d) => { const t = new Date(); t.setDate(t.getDate() - d); t.setHours(10 + (d % 8), (d * 7) % 60, 0, 0); return t.toISOString() }

// Algumas gerações de exemplo, pra a tela de histórico não nascer vazia.
const SEED = [
  {
    tipo: 'legenda', tom: 'divertido', idioma: 'pt', favorito: true, criado_em: daysAgo(1),
    input_json: { tema: 'lançamento da coleção de inverno', objetivo: 'engajar', hashtags: 'sim' },
    output_json: { variacoes: [
      'Para tudo: a coleção de inverno chegou. ✨\n\nA gente caprichou em cada peça pensando em você — e o frio nunca foi tão estiloso. Comenta aqui sua favorita! 👇\n\n#inverno #novacolecao #vempraca #estilo',
      'Você pediu, a gente ouviu. 🧣\n\nColeção de inverno disponível agora — conforto e atitude no mesmo look. Salva esse post! 📌\n\n#inverno #moda #lancamento',
      'Chegou a estação dos looks que abraçam. 🤎\n\nNova coleção de inverno no ar. Qual peça vai ser a sua? 👀\n\n#inverno #novacolecao #ootd',
    ] },
  },
  {
    tipo: 'descricao', tom: 'persuasivo', idioma: 'pt', favorito: false, criado_em: daysAgo(2),
    input_json: { produto: 'Caneca Térmica 500ml', caracteristicas: 'mantém a temperatura por 12h, aço inox, livre de BPA', publico: 'quem trabalha em home office' },
    output_json: { variacoes: [
      'Conheça a Caneca Térmica 500ml: mantém a temperatura por 12h, aço inox, livre de BPA. Pensada para quem trabalha em home office. Seu café quente do primeiro ao último gole — sem desculpas para levantar da mesa.',
      'Caneca Térmica 500ml não é só mais uma caneca. É 12 horas de temperatura perfeita em aço inox livre de BPA. Garanta a sua antes que esgote.',
      'Por que a Caneca Térmica 500ml? Porque ela une tecnologia térmica de 12h com um design que combina com a sua mesa. Clique e sinta a diferença no primeiro gole.',
    ] },
  },
  {
    tipo: 'headline', tom: 'profissional', idioma: 'pt', favorito: true, criado_em: daysAgo(4),
    input_json: { assunto: 'app de finanças pessoais', angulo: 'simplicidade' },
    output_json: { variacoes: [
      'App de finanças pessoais: tudo o que você precisa, em um só lugar — simplicidade',
      'A forma mais simples de começar com app de finanças pessoais — simplicidade',
      'Pare de adiar. App de finanças pessoais ficou fácil — simplicidade',
    ] },
  },
  {
    tipo: 'email', tom: 'persuasivo', idioma: 'pt', favorito: false, criado_em: daysAgo(6),
    input_json: { oferta: 'mentoria de carreira', gatilho: 'últimas vagas' },
    output_json: { variacoes: [
      'Assunto: Isso aqui é pra você 👀\n\nOi! Separei algo especial: mentoria de carreira (últimas vagas). Em poucos minutos você entende por que tantas pessoas já estão aproveitando — e como começar agora mesmo.\n\nClique no botão abaixo enquanto a condição está de pé.',
      'Assunto: mentoria de carreira — última chamada\n\nNão quero que você perca isso. A mentoria de carreira está com uma condição que não vai durar (últimas vagas).\n\nLeva 2 minutos para garantir. Bora?',
      'Assunto: Resolvi te escrever pessoalmente\n\nSe você vinha esperando o momento certo para a mentoria de carreira, ele chegou (últimas vagas). Reuni tudo o que você precisa saber em uma página só.\n\nDá uma olhada — acho que vai gostar.',
    ] },
  },
]

function loadGenerations() {
  let g = read(LS_GENERATIONS, null)
  if (!g) {
    g = SEED.map((s) => ({ id: uid(), user_id: 'demo', ...s }))
    write(LS_GENERATIONS, g)
  }
  return g
}
const saveGenerations = (g) => write(LS_GENERATIONS, g)

function loadAccounts() {
  let a = read(LS_ACCOUNTS, null)
  if (!a) { a = [{ email: DEMO_EMAIL, senha: DEMO_SENHA, nome: 'Dono CopyFlow' }]; write(LS_ACCOUNTS, a) }
  return a
}

export const demo = {
  // ---- auth ----
  signIn: async (email, senha) => {
    const e = String(email || '').trim().toLowerCase()
    const found = loadAccounts().find((a) => a.email === e && a.senha === senha)
    if (!found) throw new Error(`E-mail ou senha inválidos. (demo: ${DEMO_EMAIL} / ${DEMO_SENHA})`)
    const session = { user: { email: found.email, nome: found.nome }, demo: true }
    write(LS_SESSION, session)
    return session
  },
  signUp: async ({ email, senha, nome }) => {
    const e = String(email || '').trim().toLowerCase()
    if (!e || !senha) throw new Error('Preencha e-mail e senha.')
    const accounts = loadAccounts()
    if (accounts.some((a) => a.email === e)) throw new Error('Já existe uma conta com esse e-mail.')
    const account = { email: e, senha, nome: nome?.trim() || e.split('@')[0] }
    write(LS_ACCOUNTS, [...accounts, account])
    const session = { user: { email: account.email, nome: account.nome }, demo: true }
    write(LS_SESSION, session)
    return session
  },
  signOut: async () => write(LS_SESSION, null),
  getSession: async () => read(LS_SESSION, null),

  // ---- gerações ----
  listGenerations: async () => loadGenerations().slice().sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em)),
  createGeneration: async (gen) => {
    const row = {
      id: uid(), user_id: 'demo',
      tipo: gen.tipo,
      input_json: gen.contexto || {},
      output_json: { variacoes: gen.variacoes || [] },
      idioma: gen.idioma || 'pt', tom: gen.tom || 'profissional',
      favorito: false, criado_em: new Date().toISOString(),
    }
    saveGenerations([row, ...loadGenerations()])
    return row
  },
  toggleFavorite: async (id, favorito) => {
    const next = loadGenerations().map((g) => (g.id === id ? { ...g, favorito } : g))
    saveGenerations(next)
    return next.find((g) => g.id === id)
  },
  countGenerations: async () => loadGenerations().length,
}
