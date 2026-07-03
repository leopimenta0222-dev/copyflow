import { Link } from 'react-router-dom'
import { useLang } from '../context/LangProvider'
import { Container, Button } from '../components/ui'

export function NotFound() {
  const { t } = useLang()
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--color-teal)]">{t('notfound.error')}</p>
      <h1 className="mt-3 font-display text-6xl font-extrabold">
        {t('notfound.title.a')} <span className="grad-text">{t('notfound.title.highlight')}</span>
      </h1>
      <p className="mt-3 max-w-sm text-[var(--color-muted)]">
        {t('notfound.text')}
      </p>
      <Button as={Link} to="/" className="mt-6">{t('notfound.back')}</Button>
    </Container>
  )
}
