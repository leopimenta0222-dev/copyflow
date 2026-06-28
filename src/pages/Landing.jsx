import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Wand2, PenLine, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { CONTENT_TYPES } from '../lib/contentTypes'
import { typeIcon } from '../lib/icons'
import { Container, Button, Card } from '../components/ui'

const STEPS = [
  { icon: Wand2, title: 'Escolha o tipo', text: 'Descrição, legenda, anúncio, e-mail, headline ou bio.' },
  { icon: PenLine, title: 'Descreva o contexto', text: 'Produto, público e tom. Quanto mais claro, melhor a copy.' },
  { icon: Zap, title: 'Receba variações', text: 'Três versões prontas para copiar, favoritar e usar.' },
]

export function Landing() {
  const { session } = useAuth()
  const ctaTo = session ? '/app' : '/entrar'

  return (
    <div>
      {/* HERO */}
      <Container className="relative overflow-hidden py-20 sm:py-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs text-[var(--color-muted)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-teal)]" />
            Conteúdo de marketing com IA
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Copy que <span className="grad-text">vende</span>,<br />em segundos.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-muted)]">
            Descrições, legendas, anúncios e e-mails escritos por IA — no seu tom, no seu idioma, com variações prontas para publicar.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to={ctaTo} size="lg">
              {session ? 'Ir para o gerador' : 'Começar agora'} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#tipos" variant="outline" size="lg">Ver o que dá pra criar</Button>
          </div>
        </div>
      </Container>

      {/* TIPOS */}
      <Container id="tipos" className="py-12 sm:py-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Seis tipos de conteúdo</h2>
          <p className="mt-2 text-[var(--color-muted)]">Um gerador especializado para cada peça de marketing.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT_TYPES.map((ct, i) => {
            const Icon = typeIcon(ct.icon)
            return (
              <Card key={ct.id} className="reveal group p-5 transition-colors hover:border-[var(--color-line-strong)]" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-teal)] transition-colors group-hover:border-[var(--color-teal)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{ct.label}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{ct.descricao}</p>
              </Card>
            )
          })}
        </div>
      </Container>

      {/* COMO FUNCIONA */}
      <Container className="py-12 sm:py-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Como funciona</h2>
          <p className="mt-2 text-[var(--color-muted)]">Três passos do briefing à copy pronta.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Card key={s.title} className="reveal relative p-6" style={{ animationDelay: `${i * 70}ms` }}>
              <span className="absolute right-5 top-5 font-mono text-sm text-[var(--color-faint)]">0{i + 1}</span>
              <span className="grad grid h-10 w-10 place-items-center rounded-lg text-[#0a0d14]">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--color-muted)]">{s.text}</p>
            </Card>
          ))}
        </div>
      </Container>

      {/* CTA FINAL */}
      <Container className="py-16">
        <Card className="relative overflow-hidden p-10 text-center sm:p-14">
          <div className="grad pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[80%] opacity-20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-extrabold sm:text-4xl">
            Pare de encarar a <span className="grad-text">página em branco</span>.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[var(--color-muted)]">
            Gere sua primeira copy agora — leva menos de um minuto.
          </p>
          <Button as={Link} to={ctaTo} size="lg" className="relative mt-7">
            Começar agora <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </Container>
    </div>
  )
}
