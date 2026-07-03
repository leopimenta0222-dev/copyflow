// Dicionário de traduções PT/EN. Sem biblioteca externa: `t(key)` faz lookup
// simples em TRANSLATIONS[lang][key], caindo na própria key se não existir.
// PT é o padrão; EN é para clientes internacionais (Upwork).
export const TRANSLATIONS = {
  pt: {
    /* ---------- Header ---------- */
    'nav.generate': 'Gerar',
    'nav.history': 'Histórico',
    'header.generations': 'gerações',
    'header.signout': 'Sair',
    'header.login': 'Entrar',
    'lang.switch': 'Idioma da interface',

    /* ---------- Landing ---------- */
    'landing.badge': 'Conteúdo de marketing com IA',
    'landing.hero.line1': 'Copy que',
    'landing.hero.highlight': 'vende',
    'landing.hero.line2': 'em segundos.',
    'landing.hero.subtitle':
      'Descrições, legendas, anúncios e e-mails escritos por IA — no seu tom, no seu idioma, com variações prontas para publicar.',
    'landing.cta.gotoGenerator': 'Ir para o gerador',
    'landing.cta.startNow': 'Começar agora',
    'landing.cta.seeWhat': 'Ver o que dá pra criar',
    'landing.types.title': 'Seis tipos de conteúdo',
    'landing.types.subtitle': 'Um gerador especializado para cada peça de marketing.',
    'landing.how.title': 'Como funciona',
    'landing.how.subtitle': 'Três passos do briefing à copy pronta.',
    'landing.step1.title': 'Escolha o tipo',
    'landing.step1.text': 'Descrição, legenda, anúncio, e-mail, headline ou bio.',
    'landing.step2.title': 'Descreva o contexto',
    'landing.step2.text': 'Produto, público e tom. Quanto mais claro, melhor a copy.',
    'landing.step3.title': 'Receba variações',
    'landing.step3.text': 'Três versões prontas para copiar, favoritar e usar.',
    'landing.final.title.a': 'Pare de encarar a',
    'landing.final.title.highlight': 'página em branco',
    'landing.final.subtitle': 'Gere sua primeira copy agora — leva menos de um minuto.',

    /* ---------- Login ---------- */
    'login.back': 'Início',
    'login.subtitle.signin': 'Entre para gerar conteúdo com IA.',
    'login.subtitle.signup': 'Crie sua conta e comece a gerar.',
    'login.tab.signin': 'Entrar',
    'login.tab.signup': 'Criar conta',
    'login.field.name': 'Nome',
    'login.field.name.placeholder': 'Seu nome',
    'login.field.email': 'E-mail',
    'login.field.email.placeholder': 'voce@email.com',
    'login.field.password': 'Senha',
    'login.submit.signin': 'Entrar',
    'login.submit.signup': 'Criar conta',
    'login.demo.hint': 'Conta de demonstração já preenchida:',
    'login.error.email': 'E-mail inválido.',
    'login.error.password': 'Mínimo de 6 caracteres.',
    'login.toast.welcome': 'Bem-vindo de volta!',
    'login.toast.created': 'Conta criada com sucesso!',
    'login.toast.failed': 'Não foi possível continuar.',

    /* ---------- Generator ---------- */
    'gen.title': 'Gerador',
    'gen.subtitle': 'Escolha o tipo, descreva o contexto e gere variações com IA.',
    'gen.type.label': 'Tipo de conteúdo',
    'gen.variations.count': 'variações',
    'gen.favorited': 'Favoritada',
    'gen.favorite': 'Favoritar',
    'gen.regenerate': 'Gerar novamente',
    'gen.demo.banner.a': 'Exemplo de demonstração. Em produção, configure a',
    'gen.demo.banner.b': 'no servidor para gerar com IA real.',
    'gen.empty.title': 'Suas variações aparecem aqui',
    'gen.empty.text.a': 'Preencha o contexto ao lado e clique em',
    'gen.empty.text.b': 'Gerar conteúdo',
    'gen.empty.text.period': '.',
    'gen.toast.favFailed': 'Não foi possível favoritar.',
    'gen.toast.genFailed': 'Falha ao gerar. Tente novamente.',

    /* ---------- ContextForm ---------- */
    'form.tone': 'Tom',
    'form.language': 'Idioma',
    'form.submit': 'Gerar conteúdo',
    'form.generating': 'Gerando…',
    'form.required': 'Campo obrigatório.',

    /* Tones */
    'tone.profissional': 'Profissional',
    'tone.descontraido': 'Descontraído',
    'tone.persuasivo': 'Persuasivo',
    'tone.divertido': 'Divertido',

    /* Output languages */
    'idioma.pt': 'Português',
    'idioma.en': 'Inglês',
    'idioma.es': 'Espanhol',

    /* ---------- Shimmer ---------- */
    'shimmer.generating': 'Gerando variações com IA…',

    /* ---------- VariationCard ---------- */
    'variation.label': 'Variação',
    'variation.copy': 'Copiar',
    'variation.copied': 'Copiado',
    'variation.favorite': 'Favoritar',
    'variation.unfavorite': 'Remover dos favoritos',
    'variation.toast.copied': 'Copiado para a área de transferência!',
    'variation.toast.copyFailed': 'Não foi possível copiar.',

    /* ---------- History ---------- */
    'history.title': 'Histórico',
    'history.subtitle': 'Tudo o que você já gerou — revisite, copie e favorite.',
    'history.loading': 'Carregando histórico…',
    'history.empty.title': 'Nada por aqui ainda',
    'history.empty.text': 'Suas gerações vão aparecer nesta lista assim que você criar a primeira.',
    'history.empty.action': 'Gerar conteúdo',
    'history.filter.all': 'Todos',
    'history.filter.favorites': '★ Favoritos',
    'history.filter.empty.title': 'Nenhuma geração neste filtro',
    'history.filter.empty.text': 'Tente outro filtro ou favorite algumas gerações.',

    /* ---------- NotFound ---------- */
    'notfound.error': 'erro 404',
    'notfound.title.a': 'Página',
    'notfound.title.highlight': 'perdida',
    'notfound.text': 'Esse endereço não existe — mas a próxima copy que vende, sim.',
    'notfound.back': 'Voltar ao início',

    /* ---------- ui / shared ---------- */
    'ui.loading': 'Carregando…',
  },

  en: {
    /* ---------- Header ---------- */
    'nav.generate': 'Generate',
    'nav.history': 'History',
    'header.generations': 'generations',
    'header.signout': 'Sign out',
    'header.login': 'Log in',
    'lang.switch': 'Interface language',

    /* ---------- Landing ---------- */
    'landing.badge': 'AI-powered marketing content',
    'landing.hero.line1': 'Copy that',
    'landing.hero.highlight': 'sells',
    'landing.hero.line2': 'in seconds.',
    'landing.hero.subtitle':
      'Product descriptions, captions, ads, and emails written by AI — in your voice, in your language, with variations ready to publish.',
    'landing.cta.gotoGenerator': 'Go to the generator',
    'landing.cta.startNow': 'Get started',
    'landing.cta.seeWhat': 'See what you can create',
    'landing.types.title': 'Six content types',
    'landing.types.subtitle': 'A specialized generator for every marketing asset.',
    'landing.how.title': 'How it works',
    'landing.how.subtitle': 'Three steps from brief to finished copy.',
    'landing.step1.title': 'Pick the type',
    'landing.step1.text': 'Description, caption, ad, email, headline, or bio.',
    'landing.step2.title': 'Describe the context',
    'landing.step2.text': 'Product, audience, and tone. The clearer, the better the copy.',
    'landing.step3.title': 'Get variations',
    'landing.step3.text': 'Three versions ready to copy, favorite, and use.',
    'landing.final.title.a': 'Stop staring at the',
    'landing.final.title.highlight': 'blank page',
    'landing.final.subtitle': 'Generate your first copy now — it takes less than a minute.',

    /* ---------- Login ---------- */
    'login.back': 'Home',
    'login.subtitle.signin': 'Log in to generate content with AI.',
    'login.subtitle.signup': 'Create your account and start generating.',
    'login.tab.signin': 'Log in',
    'login.tab.signup': 'Sign up',
    'login.field.name': 'Name',
    'login.field.name.placeholder': 'Your name',
    'login.field.email': 'Email',
    'login.field.email.placeholder': 'you@email.com',
    'login.field.password': 'Password',
    'login.submit.signin': 'Log in',
    'login.submit.signup': 'Sign up',
    'login.demo.hint': 'Demo account already filled in:',
    'login.error.email': 'Invalid email.',
    'login.error.password': 'Minimum 6 characters.',
    'login.toast.welcome': 'Welcome back!',
    'login.toast.created': 'Account created successfully!',
    'login.toast.failed': 'Could not continue.',

    /* ---------- Generator ---------- */
    'gen.title': 'Generator',
    'gen.subtitle': 'Pick a type, describe the context, and generate variations with AI.',
    'gen.type.label': 'Content type',
    'gen.variations.count': 'variations',
    'gen.favorited': 'Favorited',
    'gen.favorite': 'Favorite',
    'gen.regenerate': 'Generate again',
    'gen.demo.banner.a': 'Demo example. In production, set',
    'gen.demo.banner.b': 'on the server to generate with real AI.',
    'gen.empty.title': 'Your variations show up here',
    'gen.empty.text.a': 'Fill in the context on the left and click',
    'gen.empty.text.b': 'Generate content',
    'gen.empty.text.period': '.',
    'gen.toast.favFailed': 'Could not favorite.',
    'gen.toast.genFailed': 'Generation failed. Please try again.',

    /* ---------- ContextForm ---------- */
    'form.tone': 'Tone',
    'form.language': 'Language',
    'form.submit': 'Generate content',
    'form.generating': 'Generating…',
    'form.required': 'Required field.',

    /* Tones */
    'tone.profissional': 'Professional',
    'tone.descontraido': 'Casual',
    'tone.persuasivo': 'Persuasive',
    'tone.divertido': 'Playful',

    /* Output languages */
    'idioma.pt': 'Portuguese',
    'idioma.en': 'English',
    'idioma.es': 'Spanish',

    /* ---------- Shimmer ---------- */
    'shimmer.generating': 'Generating variations with AI…',

    /* ---------- VariationCard ---------- */
    'variation.label': 'Variation',
    'variation.copy': 'Copy',
    'variation.copied': 'Copied',
    'variation.favorite': 'Favorite',
    'variation.unfavorite': 'Remove from favorites',
    'variation.toast.copied': 'Copied to clipboard!',
    'variation.toast.copyFailed': 'Could not copy.',

    /* ---------- History ---------- */
    'history.title': 'History',
    'history.subtitle': 'Everything you have generated — revisit, copy, and favorite.',
    'history.loading': 'Loading history…',
    'history.empty.title': 'Nothing here yet',
    'history.empty.text': 'Your generations will show up in this list as soon as you create your first one.',
    'history.empty.action': 'Generate content',
    'history.filter.all': 'All',
    'history.filter.favorites': '★ Favorites',
    'history.filter.empty.title': 'No generations in this filter',
    'history.filter.empty.text': 'Try another filter or favorite some generations.',

    /* ---------- NotFound ---------- */
    'notfound.error': 'error 404',
    'notfound.title.a': 'Page',
    'notfound.title.highlight': 'not found',
    'notfound.text': "This address doesn't exist — but your next high-converting copy does.",
    'notfound.back': 'Back to home',

    /* ---------- ui / shared ---------- */
    'ui.loading': 'Loading…',
  },
}
