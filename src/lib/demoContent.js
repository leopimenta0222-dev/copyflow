// Fallback de exemplo usado quando não há GROQ_API_KEY no servidor.
// Mantém o link do portfólio sempre no ar: gera variações plausíveis a partir
// do contexto que o usuário digitou, para parecer uma geração real.
//
// i18n: escolhe o conjunto de geradores pelo `idioma` de SAÍDA pedido
// (pt/en/es → PT usa PT; en usa EN; es cai no PT por ora).

const pick = (ctx, ...keys) => {
  for (const k of keys) {
    const v = String(ctx?.[k] ?? '').trim()
    if (v) return v
  }
  return ''
}

const GERADORES_PT = {
  descricao(ctx) {
    const produto = pick(ctx, 'produto') || 'este produto'
    const benef = pick(ctx, 'caracteristicas') || 'qualidade superior e acabamento impecável'
    const publico = pick(ctx, 'publico')
    const paraQuem = publico ? ` Pensado para ${publico.toLowerCase()}.` : ''
    return [
      `Conheça o ${produto}: ${benef.toLowerCase()}.${paraQuem} Cada detalhe foi desenhado para entregar a experiência que você procura — e fazer você se perguntar como vivia sem ele.`,
      `${produto} não é só mais uma opção. É ${benef.toLowerCase()} reunido em um só lugar.${paraQuem} Garanta o seu antes que esgote.`,
      `Por que escolher o ${produto}? Porque ele combina ${benef.toLowerCase()} com um design que fala por você.${paraQuem} Clique e descubra a diferença na prática.`,
    ]
  },
  legenda(ctx) {
    const tema = pick(ctx, 'tema') || 'a novidade que você esperava'
    const objetivo = pick(ctx, 'objetivo')
    const querHashtag = /sim|s|yes|true|1/i.test(pick(ctx, 'hashtags'))
    const tags = querHashtag ? '\n\n#novidade #lançamento #vempraca #ofertaespecial' : ''
    const cta = objetivo ? ` Comenta aqui se você também quer ${objetivo.toLowerCase()}! 👇` : ' Salva esse post pra não esquecer. 📌'
    return [
      `Para tudo: ${tema} acabou de chegar. ✨\n\nA gente caprichou em cada detalhe pensando em você — e o resultado ficou melhor do que a gente imaginava.${cta}${tags}`,
      `Você pediu, a gente ouviu. 🙌\n\n${tema} já está disponível e promete virar seu novo favorito.${cta}${tags}`,
      `Isso aqui é pra quem não tem medo de se destacar. 🔥\n\n${tema} chegou pra mudar o jogo.${cta}${tags}`,
    ]
  },
  anuncio(ctx) {
    const oferta = pick(ctx, 'oferta') || 'nossa oferta'
    const publico = pick(ctx, 'publico')
    const alvo = publico ? `Feito para ${publico.toLowerCase()}. ` : ''
    return [
      `${oferta} com condição especial 🚀\n${alvo}Comece hoje e veja resultado já na primeira semana. Vagas limitadas — clique e garanta a sua.`,
      `Cansado de adiar? ${oferta} é o empurrão que faltava.\n${alvo}Sem complicação, sem letras miúdas. Saiba mais agora.`,
      `${oferta} 🔥 A oportunidade que você não pode deixar passar.\n${alvo}Aproveite a condição de lançamento antes que acabe.`,
    ]
  },
  email(ctx) {
    const oferta = pick(ctx, 'oferta') || 'nossa novidade'
    const gatilho = pick(ctx, 'gatilho')
    const urgencia = gatilho ? ` (${gatilho})` : ''
    return [
      `Assunto: Isso aqui é pra você 👀\n\nOi! Separei algo especial: ${oferta}${urgencia}. Em poucos minutos você entende por que tantas pessoas já estão aproveitando — e como começar agora mesmo.\n\nClique no botão abaixo enquanto a condição está de pé.`,
      `Assunto: ${oferta} — última chamada\n\nNão quero que você perca isso. ${oferta} está com uma condição que não vai durar${urgencia ? ` ${urgencia}` : ''}.\n\nLeva 2 minutos para garantir. Bora?`,
      `Assunto: Resolvi te escrever pessoalmente\n\nSe você vinha esperando o momento certo para ${oferta.toLowerCase()}, ele chegou${urgencia}. Reuni tudo o que você precisa saber em uma página só.\n\nDá uma olhada — acho que vai gostar.`,
    ]
  },
  headline(ctx) {
    const assunto = pick(ctx, 'assunto') || 'a solução que você procura'
    const angulo = pick(ctx, 'angulo')
    const tail = angulo ? ` — ${angulo.toLowerCase()}` : ''
    return [
      `${assunto}: tudo o que você precisa, em um só lugar${tail}`,
      `A forma mais simples de começar com ${assunto.toLowerCase()}${tail}`,
      `Pare de adiar. ${assunto} ficou fácil${tail}`,
    ]
  },
  bio(ctx) {
    const marca = pick(ctx, 'marca') || 'Sua marca'
    const faz = pick(ctx, 'faz') || 'transforma ideias em resultado'
    const vibe = pick(ctx, 'vibe')
    const tom = vibe ? ` ${vibe}.` : ''
    return [
      `${marca} ✦ ${faz}.${tom} Vem fazer parte. 👇`,
      `${marca} — ${faz.toLowerCase()}.${tom} Conteúdo novo toda semana.`,
      `Aqui é ${marca}. A gente ${faz.toLowerCase()}.${tom} Bora juntos? 🚀`,
    ]
  },
}

const GERADORES_EN = {
  descricao(ctx) {
    const produto = pick(ctx, 'produto') || 'this product'
    const benef = pick(ctx, 'caracteristicas') || 'superior quality and flawless finish'
    const publico = pick(ctx, 'publico')
    const paraQuem = publico ? ` Built for ${publico.toLowerCase()}.` : ''
    return [
      `Meet the ${produto}: ${benef.toLowerCase()}.${paraQuem} Every detail is designed to deliver the experience you're after — and leave you wondering how you managed without it.`,
      `The ${produto} isn't just another option. It's ${benef.toLowerCase()}, all in one place.${paraQuem} Grab yours before it sells out.`,
      `Why choose the ${produto}? Because it pairs ${benef.toLowerCase()} with a design that speaks for you.${paraQuem} Click and feel the difference for yourself.`,
    ]
  },
  legenda(ctx) {
    const tema = pick(ctx, 'tema') || "the drop you've been waiting for"
    const objetivo = pick(ctx, 'objetivo')
    const querHashtag = /sim|s|yes|true|1/i.test(pick(ctx, 'hashtags'))
    const tags = querHashtag ? '\n\n#new #launch #musthave #specialoffer' : ''
    const cta = objetivo ? ` Comment below if you want to ${objetivo.toLowerCase()} too! 👇` : " Save this post so you don't forget. 📌"
    return [
      `Stop everything: ${tema} just landed. ✨\n\nWe sweated every detail with you in mind — and it turned out even better than we imagined.${cta}${tags}`,
      `You asked, we listened. 🙌\n\n${tema} is available now and about to become your new favorite.${cta}${tags}`,
      `This one's for anyone who isn't afraid to stand out. 🔥\n\n${tema} is here to change the game.${cta}${tags}`,
    ]
  },
  anuncio(ctx) {
    const oferta = pick(ctx, 'oferta') || 'our offer'
    const publico = pick(ctx, 'publico')
    const alvo = publico ? `Made for ${publico.toLowerCase()}. ` : ''
    return [
      `${oferta} at a special price 🚀\n${alvo}Start today and see results in the very first week. Limited spots — click and claim yours.`,
      `Tired of putting it off? ${oferta} is the push you needed.\n${alvo}No hassle, no fine print. Learn more now.`,
      `${oferta} 🔥 The opportunity you can't afford to miss.\n${alvo}Take advantage of the launch price before it's gone.`,
    ]
  },
  email(ctx) {
    const oferta = pick(ctx, 'oferta') || 'our latest release'
    const gatilho = pick(ctx, 'gatilho')
    const urgencia = gatilho ? ` (${gatilho})` : ''
    return [
      `Subject: This one's for you 👀\n\nHey! I set something special aside: ${oferta}${urgencia}. In just a few minutes you'll see why so many people are already jumping in — and how to start right now.\n\nClick the button below while the deal is still on.`,
      `Subject: ${oferta} — last call\n\nI don't want you to miss this. ${oferta} comes with a deal that won't last${urgencia ? ` ${urgencia}` : ''}.\n\nIt takes 2 minutes to lock in. Ready?`,
      `Subject: I decided to write to you personally\n\nIf you've been waiting for the right moment for ${oferta.toLowerCase()}, it's here${urgencia}. I've gathered everything you need to know on a single page.\n\nTake a look — I think you'll like it.`,
    ]
  },
  headline(ctx) {
    const assunto = pick(ctx, 'assunto') || "the solution you're looking for"
    const angulo = pick(ctx, 'angulo')
    const tail = angulo ? ` — ${angulo.toLowerCase()}` : ''
    return [
      `${assunto}: everything you need, all in one place${tail}`,
      `The simplest way to get started with ${assunto.toLowerCase()}${tail}`,
      `Stop putting it off. ${assunto} just got easy${tail}`,
    ]
  },
  bio(ctx) {
    const marca = pick(ctx, 'marca') || 'Your brand'
    const faz = pick(ctx, 'faz') || 'turns ideas into results'
    const vibe = pick(ctx, 'vibe')
    const tom = vibe ? ` ${vibe}.` : ''
    return [
      `${marca} ✦ ${faz}.${tom} Come be part of it. 👇`,
      `${marca} — ${faz.toLowerCase()}.${tom} New content every week.`,
      `This is ${marca}. We ${faz.toLowerCase()}.${tom} Let's do this together? 🚀`,
    ]
  },
}

export function demoGenerate({ tipo, contexto, idioma = 'pt', n = 3 } = {}) {
  const set = idioma === 'en' ? GERADORES_EN : GERADORES_PT
  const gerar = set[tipo]
  const fallbackMsg =
    idioma === 'en'
      ? 'Example generated content. Set the API key for real AI results.'
      : 'Exemplo de conteúdo gerado. Configure a chave da API para resultados reais com IA.'
  const base = gerar ? gerar(contexto || {}) : [fallbackMsg]
  return base.slice(0, n)
}
