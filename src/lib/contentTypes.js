// Configuração dos 6 tipos de conteúdo do gerador.
// `icon` é o nome de um ícone do lucide-react (resolvido no TypePicker).
// Obs.: o lucide removeu ícones de marca (Instagram), então a legenda usa AtSign.
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
  },
]

export const getContentType = (id) => CONTENT_TYPES.find((t) => t.id === id)
