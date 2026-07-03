import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Wand2, PenLine, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { useLang } from '../context/LangProvider'
import { getContentTypes } from '../lib/contentTypes'
import { typeIcon } from '../lib/icons'
import { Container, Button, Card } from '../components/ui'

export function Landing() {
  const { session } = useAuth()
  const { lang, t } = useLang()
  const ctaTo = session ? '/app' : '/entrar'
  const contentTypes = getContentTypes(lang)

  const STEPS = [
    { icon: Wand2, title: t('landing.step1.title'), text: t('landing.step1.text') },
    { icon: PenLine, title: t('landing.step2.title'), text: t('landing.step2.text') },
    { icon: Zap, title: t('landing.step3.title'), text: t('landing.step3.text') },
  ]

  return (
    <div>
      {/* HERO */}
      <Container className="relative overflow-hidden py-20 sm:py-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs text-[var(--color-muted)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-teal)]" />
            {t('landing.badge')}
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            {t('landing.hero.line1')} <span className="grad-text">{t('landing.hero.highlight')}</span>,<br />{t('landing.hero.line2')}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-muted)]">
            {t('landing.hero.subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button as={Link} to={ctaTo} size="lg">
              {session ? t('landing.cta.gotoGenerator') : t('landing.cta.startNow')} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#tipos" variant="outline" size="lg">{t('landing.cta.seeWhat')}</Button>
          </div>
        </div>
      </Container>

      {/* TIPOS */}
      <Container id="tipos" className="py-12 sm:py-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('landing.types.title')}</h2>
          <p className="mt-2 text-[var(--color-muted)]">{t('landing.types.subtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contentTypes.map((ct, i) => {
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
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('landing.how.title')}</h2>
          <p className="mt-2 text-[var(--color-muted)]">{t('landing.how.subtitle')}</p>
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
            {t('landing.final.title.a')} <span className="grad-text">{t('landing.final.title.highlight')}</span>.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[var(--color-muted)]">
            {t('landing.final.subtitle')}
          </p>
          <Button as={Link} to={ctaTo} size="lg" className="relative mt-7">
            {t('landing.cta.startNow')} <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </Container>
    </div>
  )
}
