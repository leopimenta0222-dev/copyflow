// Configuração dos 6 tipos de conteúdo do gerador.
// `icon` é o nome de um ícone do lucide-react (resolvido no TypePicker).
// Obs.: o lucide removeu ícones de marca (Instagram), então a legenda usa AtSign.
//
// i18n: os campos de nível superior (`label`, `descricao`, `campos`, `promptInstrucao`)
// ficam em PT — são o padrão e são usados também pela função serverless
// (`src/lib/prompts.js` lê `label` e `promptInstrucao`). As traduções em inglês
// ficam em `en:` e são aplicadas no cliente por `getContentTypes('en')`.
// NÃO renomeie os `id` (dos tipos) nem os `name` (dos campos): são chaves persistidas.
export const CONTENT_TYPES = [
  {
    id: 'descricao',
    label: 'Descrição de produto',
    icon: 'Package',
    descricao: 'Descrições que vendem.',
    campos: [
      { name: 'produto', label: 'Produto', type: 'text', placeholder: 'Ex: Tênis Velocità Pro', required: true },
      { name: 'caracteristicas', label: 'Características / benefícios', type: 'textarea', placeholder: 'Leve, respirável, amortecimento responsivo…' },
      { name: 'publico', label: 'Público-alvo', type: 'text', placeholder: 'Corredores iniciantes' },
    ],
    promptInstrucao: 'Crie descrições de produto persuasivas, destacando benefícios concretos e despertando desejo de compra.',
    en: {
      label: 'Product description',
      descricao: 'Descriptions that sell.',
      campos: [
        { name: 'produto', label: 'Product', type: 'text', placeholder: 'e.g. Velocità Pro Running Shoes', required: true },
        { name: 'caracteristicas', label: 'Features / benefits', type: 'textarea', placeholder: 'Lightweight, breathable, responsive cushioning…' },
        { name: 'publico', label: 'Target audience', type: 'text', placeholder: 'Beginner runners' },
      ],
    },
  },
  {
    id: 'legenda',
    label: 'Legenda de Instagram',
    icon: 'AtSign',
    descricao: 'Posts com hook e hashtags.',
    campos: [
      { name: 'tema', label: 'Tema do post', type: 'text', placeholder: 'Lançamento da coleção de inverno', required: true },
      { name: 'objetivo', label: 'Objetivo', type: 'text', placeholder: 'Engajar, vender, informar…' },
      { name: 'hashtags', label: 'Incluir hashtags?', type: 'text', placeholder: 'sim / não' },
    ],
    promptInstrucao: 'Escreva legendas de Instagram com um hook forte na primeira linha, emojis com moderação e um CTA claro.',
    en: {
      label: 'Instagram caption',
      descricao: 'Posts with a hook and hashtags.',
      campos: [
        { name: 'tema', label: 'Post topic', type: 'text', placeholder: 'Winter collection launch', required: true },
        { name: 'objetivo', label: 'Goal', type: 'text', placeholder: 'Engage, sell, inform…' },
        { name: 'hashtags', label: 'Include hashtags?', type: 'text', placeholder: 'yes / no' },
      ],
    },
  },
  {
    id: 'anuncio',
    label: 'Anúncio (Google/Meta)',
    icon: 'Megaphone',
    descricao: 'Texto de anúncio pago.',
    campos: [
      { name: 'oferta', label: 'Produto / oferta', type: 'text', placeholder: 'Curso de inglês em 6 meses', required: true },
      { name: 'plataforma', label: 'Plataforma', type: 'text', placeholder: 'Google ou Meta' },
      { name: 'publico', label: 'Público', type: 'text', placeholder: 'Profissionais 25–40' },
    ],
    promptInstrucao: 'Crie anúncios curtos e diretos (headline + corpo) focados em conversão.',
    en: {
      label: 'Ad (Google/Meta)',
      descricao: 'Paid ad copy.',
      campos: [
        { name: 'oferta', label: 'Product / offer', type: 'text', placeholder: 'Learn English in 6 months', required: true },
        { name: 'plataforma', label: 'Platform', type: 'text', placeholder: 'Google or Meta' },
        { name: 'publico', label: 'Audience', type: 'text', placeholder: 'Professionals 25–40' },
      ],
    },
  },
  {
    id: 'email',
    label: 'Email de vendas',
    icon: 'Mail',
    descricao: 'Assunto + corpo persuasivo.',
    campos: [
      { name: 'oferta', label: 'Produto / oferta', type: 'text', placeholder: 'Mentoria de carreira', required: true },
      { name: 'gatilho', label: 'Gatilho', type: 'text', placeholder: 'Desconto, lançamento, urgência…' },
    ],
    promptInstrucao: 'Escreva e-mails de venda com linha de assunto chamativa e corpo persuasivo, terminando com um CTA claro.',
    en: {
      label: 'Sales email',
      descricao: 'Subject line + persuasive body.',
      campos: [
        { name: 'oferta', label: 'Product / offer', type: 'text', placeholder: 'Career mentorship', required: true },
        { name: 'gatilho', label: 'Trigger', type: 'text', placeholder: 'Discount, launch, urgency…' },
      ],
    },
  },
  {
    id: 'headline',
    label: 'Headline / título',
    icon: 'Type',
    descricao: 'Títulos que chamam atenção.',
    campos: [
      { name: 'assunto', label: 'Assunto / produto', type: 'text', placeholder: 'App de finanças pessoais', required: true },
      { name: 'angulo', label: 'Ângulo', type: 'text', placeholder: 'Benefício, curiosidade, urgência…' },
    ],
    promptInstrucao: 'Crie headlines curtas e magnéticas, prontas para topo de página ou anúncio.',
    en: {
      label: 'Headline / title',
      descricao: 'Titles that grab attention.',
      campos: [
        { name: 'assunto', label: 'Subject / product', type: 'text', placeholder: 'Personal finance app', required: true },
        { name: 'angulo', label: 'Angle', type: 'text', placeholder: 'Benefit, curiosity, urgency…' },
      ],
    },
  },
  {
    id: 'bio',
    label: 'Bio / sobre',
    icon: 'User',
    descricao: 'Bio de perfil ou “sobre”.',
    campos: [
      { name: 'marca', label: 'Nome / marca', type: 'text', placeholder: 'Ana Costa — Nutricionista', required: true },
      { name: 'faz', label: 'O que faz', type: 'textarea', placeholder: 'Ajuda pessoas a comer melhor sem dietas radicais.' },
      { name: 'vibe', label: 'Vibe', type: 'text', placeholder: 'Profissional, divertida…' },
    ],
    promptInstrucao: 'Escreva bios curtas, memoráveis e alinhadas à identidade da marca.',
    en: {
      label: 'Bio / about',
      descricao: 'Profile bio or "about" text.',
      campos: [
        { name: 'marca', label: 'Name / brand', type: 'text', placeholder: 'Ana Costa — Nutritionist', required: true },
        { name: 'faz', label: 'What you do', type: 'textarea', placeholder: 'Helps people eat better without extreme diets.' },
        { name: 'vibe', label: 'Vibe', type: 'text', placeholder: 'Professional, fun…' },
      ],
    },
  },
]

export const getContentType = (id) => CONTENT_TYPES.find((t) => t.id === id)

// Versão localizada de um tipo: em 'en', sobrepõe label/descricao/campos com
// as traduções (mantendo id, icon e demais campos). Em 'pt', devolve o próprio tipo.
const localizeType = (ct, lang) => {
  if (!ct || lang !== 'en' || !ct.en) return ct
  return { ...ct, label: ct.en.label, descricao: ct.en.descricao, campos: ct.en.campos }
}

// Lista de tipos já localizada para o idioma da interface (uso no cliente).
export const getContentTypes = (lang = 'pt') => CONTENT_TYPES.map((ct) => localizeType(ct, lang))

// Um tipo localizado por id (uso no cliente).
export const getContentTypeL = (id, lang = 'pt') => localizeType(getContentType(id), lang)
