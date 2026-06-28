import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Wand2, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { useToast } from '../context/ToastProvider'
import { Button, Input, Field, cx } from '../components/ui'

const schema = z.object({
  nome: z.string().optional(),
  email: z.string().email('E-mail inválido.'),
  senha: z.string().min(6, 'Mínimo de 6 caracteres.'),
})

export function Login() {
  const [mode, setMode] = useState('entrar') // 'entrar' | 'cadastro'
  const { signIn, signUp } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/app'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'dono@copyflow.com', senha: 'copyflow123', nome: '' },
  })

  const onSubmit = async (values) => {
    try {
      if (mode === 'entrar') await signIn(values.email, values.senha)
      else await signUp({ email: values.email, senha: values.senha, nome: values.nome })
      toast.show(mode === 'entrar' ? 'Bem-vindo de volta!' : 'Conta criada com sucesso!')
      navigate(from, { replace: true })
    } catch (e) {
      toast.show(e.message || 'Não foi possível continuar.', 'error')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <Link to="/" className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
        <ArrowLeft className="h-4 w-4" /> Início
      </Link>

      <div className="reveal w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grad mb-4 grid h-12 w-12 place-items-center rounded-xl text-[#0a0d14] shadow-[var(--shadow-glow)]">
            <Wand2 className="h-6 w-6" />
          </span>
          <h1 className="font-display text-3xl font-extrabold">
            Copy<span className="grad-text">Flow</span>
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            {mode === 'entrar' ? 'Entre para gerar conteúdo com IA.' : 'Crie sua conta e comece a gerar.'}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
          {[['entrar', 'Entrar'], ['cadastro', 'Criar conta']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={cx(
                'h-9 rounded-lg text-sm font-medium transition-colors',
                mode === key ? 'grad text-[#0a0d14]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'cadastro' && (
            <Field label="Nome" error={errors.nome?.message}>
              <Input placeholder="Seu nome" {...register('nome')} />
            </Field>
          )}
          <Field label="E-mail" error={errors.email?.message}>
            <Input type="email" placeholder="voce@email.com" {...register('email')} />
          </Field>
          <Field label="Senha" error={errors.senha?.message}>
            <Input type="password" placeholder="••••••••" {...register('senha')} />
          </Field>
          <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
            {mode === 'entrar' ? 'Entrar' : 'Criar conta'}
          </Button>
        </form>

        <p className="mt-5 rounded-xl border border-dashed border-[var(--color-line)] bg-[var(--color-surface)]/50 px-4 py-3 text-center text-xs text-[var(--color-muted)]">
          Conta de demonstração já preenchida:<br />
          <span className="font-mono text-[var(--color-text)]">dono@copyflow.com</span> · <span className="font-mono text-[var(--color-text)]">copyflow123</span>
        </p>
      </div>
    </div>
  )
}
