import { Loader2 } from 'lucide-react'

export const cx = (...parts) => parts.filter(Boolean).join(' ')

export function Container({ className, children }) {
  return <div className={cx('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>
}

const BTN_VARIANTS = {
  // Botão principal: degradê teal→violeta com brilho. Texto quase-preto pra contraste.
  grad: 'grad text-[#0a0d14] font-semibold hover:brightness-110 shadow-[var(--shadow-glow)]',
  outline: 'border border-[var(--color-line-strong)] text-[var(--color-text)] hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]',
  ghost: 'text-[var(--color-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]',
  subtle: 'bg-[var(--color-surface-2)] text-[var(--color-text)] border border-[var(--color-line)] hover:brightness-125',
  danger: 'border border-red-500/40 text-red-400 hover:bg-red-500/10',
}
const BTN_SIZES = { sm: 'h-9 px-4 text-sm', md: 'h-11 px-5 text-sm', lg: 'h-13 px-7 text-base' }

export function Button({ as: Tag = 'button', variant = 'grad', size = 'md', loading = false, className, children, disabled, ...props }) {
  return (
    <Tag
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-150 active:scale-[.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
        'disabled:pointer-events-none disabled:opacity-50',
        BTN_VARIANTS[variant], BTN_SIZES[size], className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Tag>
  )
}

export function Card({ as: Tag = 'div', className, children, ...props }) {
  return <Tag className={cx('rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]', className)} {...props}>{children}</Tag>
}

const BADGE = {
  accent: 'bg-[var(--color-teal)]/15 text-[var(--color-teal)]',
  violet: 'bg-[var(--color-violet)]/15 text-[var(--color-violet)]',
  ok: 'bg-emerald-500/15 text-emerald-400',
  neutral: 'bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-line)]',
}
export function Badge({ tone = 'neutral', children, className }) {
  return <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', BADGE[tone] || BADGE.neutral, className)}>{children}</span>
}

export const Spinner = ({ className }) => <Loader2 className={cx('h-5 w-5 animate-spin text-[var(--color-teal)]', className)} />
export function Loading({ label = 'Carregando…' }) {
  return <div className="flex flex-col items-center justify-center gap-3 py-16 text-[var(--color-muted)]"><Spinner className="h-7 w-7" /><span className="text-sm">{label}</span></div>
}

const FIELD = 'w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-4 text-[var(--color-text)] placeholder:text-[var(--color-faint)] transition-colors focus:border-[var(--color-teal)] focus:outline-none focus:ring-1 focus:ring-[var(--color-teal)]'
export const Input = ({ className, ...props }) => <input className={cx(FIELD, 'h-12', className)} {...props} />
export const Textarea = ({ className, ...props }) => <textarea className={cx(FIELD, 'min-h-[96px] py-3 leading-relaxed', className)} {...props} />
export const Select = ({ className, children, ...props }) => <select className={cx(FIELD, 'h-12 appearance-none', className)} {...props}>{children}</select>

export function Field({ label, error, hint, children, className }) {
  return (
    <label className={cx('block', className)}>
      {label && <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">{label}</span>}
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-[var(--color-faint)]">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  )
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--color-line)] py-16 text-center">
      {Icon && <Icon className="h-9 w-9 text-[var(--color-faint)]" />}
      {title && <p className="font-semibold">{title}</p>}
      {text && <p className="max-w-xs text-sm text-[var(--color-muted)]">{text}</p>}
      {action}
    </div>
  )
}
