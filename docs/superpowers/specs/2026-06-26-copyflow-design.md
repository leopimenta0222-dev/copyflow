# CopyFlow · Design / Spec

> SaaS de geração de conteúdo de marketing com IA (Claude API). Projeto 4 do portfólio
> freelance do Leonardo Pimenta — **o projeto diferencial** (integração de IA real).
> Data: 2026-06-26.

## 1. Objetivo
Mostrar integração de **IA real (Claude API)** num produto com login, histórico e UI
caprichada — com a chave protegida no back-end. É o que justifica cobrar mais e abre
portas pra projetos de IA.

## 2. Produto
**CopyFlow** — o usuário escolhe um tipo de conteúdo, dá um contexto curto e recebe 2–3
variações geradas pela IA. Público: donos de loja, social media, agências, e-commerce.

## 3. Identidade visual ("Mesh Aurora")
- **Base:** slate `#0d1018`; superfícies `#161b26` / `#1b2230`; bordas `#232c3d`.
- **Texto:** `#eef1f6` (principal), `#9aa6bd` (secundário), `#5d6b85` (faint).
- **Acento:** degradê **teal→violeta** `#2dd4bf`→`#7c7cff` (botões/destaques) + brilho
  **aurora** ambiente no fundo (radial gradients suaves).
- **Tipografia:** títulos **Bricolage Grotesque**; corpo **Hanken Grotesk**;
  rótulos pequenos **JetBrains Mono**. (Evitando Space Grotesk de propósito.)
- **Loading com capricho:** skeleton com shimmer + "gerando…".

## 4. Stack
- React 19 + Vite + Tailwind v4, React Router, TanStack Query, react-hook-form + zod.
- Supabase (Auth + Postgres + RLS) — login e histórico.
- **IA:** função serverless `/api/generate` (Vercel) + **@anthropic-ai/sdk**,
  modelo **claude-sonnet-4-6**. Chave **só no servidor** (`ANTHROPIC_API_KEY`).
- Camada `src/lib/db` com modo demo; funções `/api` servidas pelo middleware do Vite no dev.
- Deploy: Vercel. Repo: GitHub.

## 5. Rotas / telas
- `/` — landing curta (proposta de valor + CTA "Entrar"). Pública.
- `/entrar` — login/cadastro (Supabase Auth; demo local).
- `/app` — **gerador** (protegido).
- `/historico` — **histórico** (protegido).

## 6. O gerador
- **6 tipos:** Descrição de produto, Legenda de Instagram, Anúncio (Google/Meta),
  Email de vendas, Headline/título, Bio/sobre.
- **Formulário dinâmico por tipo** — um config (`src/lib/contentTypes.js`) mapeia
  cada tipo → campos do formulário → instruções de prompt.
- **Tom de voz** (profissional / descontraído / persuasivo / divertido) e **idioma**
  (PT / EN / ES) entram no prompt.
- **Resultado:** 2–3 cards de variação, cada um com **copiar**, **favoritar** e
  **"gerar mais / refazer"**. Skeleton durante a geração.

## 7. Integração Claude API (do jeito certo)
- O front chama `POST /api/generate` com `{ tipo, contexto, tom, idioma }`.
- A função monta **system prompt + template do tipo** (em `src/lib/prompts.js`, compartilhado),
  chama o Claude com `max_tokens` limitado, pede **N variações em saída estruturada**
  (JSON via tool use / formato delimitado), e devolve `{ variacoes: [...] }`.
- **Erros tratados** (sem chave, rate limit, falha) com mensagens amigáveis.
- **Fallback de exemplo:** sem `ANTHROPIC_API_KEY`, a função retorna variações de exemplo
  (marcadas como demo) → app sempre-no-ar. A skill `claude-api` será consultada ao codar.

## 8. Modelo de dados (Supabase — migration aplicada no deploy)
- **generations:** `id`, `user_id`, `tipo`, `input_json` jsonb, `output_json` jsonb
  (array de variações), `idioma`, `tom`, `favorito` bool default false, `criado_em`.
- **RLS:** `user_id = auth.uid()` para select/insert/update/delete (cada um só vê o seu).
- Contador de gerações = count das gerações do usuário.

## 9. Critério de "pronto" (brief)
- [ ] Loga, escolhe tipo, preenche contexto e recebe texto gerado pela IA.
- [ ] Chave da Claude API protegida no back-end (nunca no front).
- [ ] Histórico salva e lista as gerações do usuário; copiar funciona.
- [ ] Deploy Vercel + GitHub + README explicando a arquitetura.
- [ ] Funciona de verdade com a API (fallback é só pra demo sem chave).
- [ ] Extras: idioma PT/EN/ES, contador de gerações, tom de voz, favoritar.

## 10. Verificação
Modo demo (navegador): login → escolher tipo → preencher → gerar (fallback) → ver variações
→ copiar → favoritar → ver no histórico → contador. Caminho com IA real testado quando
houver `ANTHROPIC_API_KEY` (Leonardo) — local via middleware do Vite.

## 11. Deploy / handoff
GitHub + Vercel. Demo (fallback) publica sem nada. IA real: `ANTHROPIC_API_KEY` na Vercel
(criar em console.anthropic.com) + Supabase pro histórico. README detalha a arquitetura.

## 12. Fora de escopo (YAGNI)
- Streaming token-a-token (não-streaming + skeleton já entrega ótima UX).
- Planos/pagamento.
- Editor rico do texto (copiar + regenerar cobre o MVP).
