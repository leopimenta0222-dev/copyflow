import { getContentTypes } from '../lib/contentTypes'
import { useLang } from '../context/LangProvider'
import { typeIcon } from '../lib/icons'
import { cx } from './ui'

export function TypePicker({ value, onChange }) {
  const { lang } = useLang()
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {getContentTypes(lang).map((ct) => {
        const Icon = typeIcon(ct.icon)
        const active = value === ct.id
        return (
          <button
            key={ct.id}
            type="button"
            onClick={() => onChange(ct.id)}
            aria-pressed={active}
            className={cx(
              'group flex flex-col items-start gap-2.5 rounded-xl border p-4 text-left transition-all',
              active
                ? 'border-[var(--color-teal)] bg-[var(--color-surface-2)] shadow-[var(--shadow-glow)]'
                : 'border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-line-strong)]',
            )}
          >
            <span className={cx(
              'grid h-9 w-9 place-items-center rounded-lg transition-colors',
              active ? 'grad text-[#0a0d14]' : 'border border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-teal)]',
            )}>
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold leading-tight">{ct.label}</span>
          </button>
        )
      })}
    </div>
  )
}
