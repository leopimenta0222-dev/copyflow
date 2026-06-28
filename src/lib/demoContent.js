// Fallback de exemplo usado quando não há ANTHROPIC_API_KEY no servidor.
// Mantém o link do portfólio sempre no ar: gera variações plausíveis a partir
// do contexto que o usuário digitou, para parecer uma geração real.

const pick = (ctx, ...keys) => {
  for (const k of keys) {
    const v = String(ctx?.[k] ?? '').trim()
    if (v) return v
  }
  return ''
}

const GERADORES = {
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

export function demoGenerate({ tipo, contexto, n = 3 } = {}) {
  const gerar = GERADORES[tipo]
  const base = gerar
    ? gerar(contexto || {})
    : ['Exemplo de conteúdo gerado. Configure a chave da API para resultados reais com IA.']
  return base.slice(0, n)
}
