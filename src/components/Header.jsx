import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Sparkles, LogOut, Wand2, History } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { useLang } from '../context/LangProvider'
import { useGenerationCount } from '../hooks/data'
import { Container, Button, cx } from './ui'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="grad grid h-8 w-8 place-items-center rounded-lg text-[#0a0d14] shadow-[var(--shadow-glow)] transition-transform group-hover:rotate-12">
        <Wand2 className="h-4 w-4" />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        Copy<span className="grad-text">Flow</span>
      </span>
    </Link>
  )
}

// Alternador PT | EN da interface. Persiste via LangProvider (localStorage).
function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div
      role="group"
      aria-label={t('lang.switch')}
      className="inline-flex items-center rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-0.5 text-xs font-semibold"
    >
      {['pt', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cx(
            'rounded-md px-2 py-1 uppercase tracking-wide transition-colors',
            lang === code ? 'grad text-[#0a0d14]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

const linkCls = ({ isActive }) =>
  cx(
    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
    isActive ? 'bg-[var(--color-surface-2)] text-[var(--color-text)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]',
  )

export function Header() {
  const { session, signOut } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()
  const { data: count } = useGenerationCount()

  const onSignOut = async () => { await signOut(); navigate('/') }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        {session ? (
          <>
            <nav className="flex items-center gap-1">
              <NavLink to="/app" className={linkCls}><Wand2 className="h-4 w-4" /> {t('nav.generate')}</NavLink>
              <NavLink to="/historico" className={linkCls}><History className="h-4 w-4" /> {t('nav.history')}</NavLink>
            </nav>
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-muted)] sm:inline-flex">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-teal)]" />
                <span className="font-mono font-medium text-[var(--color-text)]">{count ?? 0}</span> {t('header.generations')}
              </span>
              <LangSwitch />
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">{t('header.signout')}</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <LangSwitch />
            <Button as={Link} to="/entrar" size="sm">{t('header.login')}</Button>
          </div>
        )}
      </Container>
    </header>
  )
}
