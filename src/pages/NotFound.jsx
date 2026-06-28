import { Link } from 'react-router-dom'
import { Container, Button } from '../components/ui'

export function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--color-teal)]">erro 404</p>
      <h1 className="mt-3 font-display text-6xl font-extrabold">
        Página <span className="grad-text">perdida</span>
      </h1>
      <p className="mt-3 max-w-sm text-[var(--color-muted)]">
        Esse endereço não existe — mas a próxima copy que vende, sim.
      </p>
      <Button as={Link} to="/" className="mt-6">Voltar ao início</Button>
    </Container>
  )
}
