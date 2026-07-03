import { useMemo, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Wand2, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { useToast } from '../context/ToastProvider'
import { useLang } from '../context/LangProvider'
import { Button, Input, Field, cx } from '../components/ui'

// Alternador PT | EN compacto (o Login não usa o Header global).
function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div
      role="group"
      aria-label={t('lang.switch')}
      className="absolute right-5 top-5 inline-flex items-center rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-0.5 text-xs font-semibold"
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

export function Login() {
  const [mode, setMode] = useState('entrar') // 'entrar' | 'cadastro'
  const { signIn, signUp } = useAuth()
  const toast = useToast()
  const { t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/app'

  const schema = useMemo(
    () =>
      z.object({
        nome: z.string().optional(),
        email: z.string().email(t('login.error.email')),
        senha: z.string().min(6, t('login.error.password')),
      }),
    [t],
  )

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'dono@copyflow.com', senha: 'copyflow123', nome: '' },
  })

  const onSubmit = async (values) => {
    try {
      if (mode === 'entrar') await signIn(values.email, values.senha)
      else await signUp({ email: values.email, senha: values.senha, nome: values.nome })
      toast.show(mode === 'entrar' ? t('login.toast.welcome') : t('login.toast.created'))
      navigate(from, { replace: true })
    } catch (e) {
      toast.show(e.message || t('login.toast.failed'), 'error')
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <Link to="/" className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
        <ArrowLeft className="h-4 w-4" /> {t('login.back')}
      </Link>
      <LangSwitch />

      <div className="reveal w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grad mb-4 grid h-12 w-12 place-items-center rounded-xl text-[#0a0d14] shadow-[var(--shadow-glow)]">
            <Wand2 className="h-6 w-6" />
          </span>
          <h1 className="font-display text-3xl font-extrabold">
            Copy<span className="grad-text">Flow</span>
          </h1>
          <p className="mt-1.5 text-sm text-[var(--color-muted)]">
            {mode === 'entrar' ? t('login.subtitle.signin') : t('login.subtitle.signup')}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
          {[['entrar', t('login.tab.signin')], ['cadastro', t('login.tab.signup')]].map(([key, label]) => (
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
            <Field label={t('login.field.name')} error={errors.nome?.message}>
              <Input placeholder={t('login.field.name.placeholder')} {...register('nome')} />
            </Field>
          )}
          <Field label={t('login.field.email')} error={errors.email?.message}>
            <Input type="email" placeholder={t('login.field.email.placeholder')} {...register('email')} />
          </Field>
          <Field label={t('login.field.password')} error={errors.senha?.message}>
            <Input type="password" placeholder="••••••••" {...register('senha')} />
          </Field>
          <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
            {mode === 'entrar' ? t('login.submit.signin') : t('login.submit.signup')}
          </Button>
        </form>

        <p className="mt-5 rounded-xl border border-dashed border-[var(--color-line)] bg-[var(--color-surface)]/50 px-4 py-3 text-center text-xs text-[var(--color-muted)]">
          {t('login.demo.hint')}<br />
          <span className="font-mono text-[var(--color-text)]">dono@copyflow.com</span> · <span className="font-mono text-[var(--color-text)]">copyflow123</span>
        </p>
      </div>
    </div>
  )
}
