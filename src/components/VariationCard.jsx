import { useState } from 'react'
import { Copy, Check, Star } from 'lucide-react'
import { useToast } from '../context/ToastProvider'
import { Card, cx } from './ui'

export function VariationCard({ text, index, favorito, onToggleFavorite, style }) {
  const toast = useToast()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.show('Copiado para a área de transferência!')
      setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.show('Não foi possível copiar.', 'error')
    }
  }

  return (
    <Card className="reveal flex flex-col gap-3 p-5" style={style}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-faint)]">
          <span className="grad h-2 w-2 rounded-full" /> Variação {typeof index === 'number' ? index + 1 : ''}
        </span>
        <div className="flex items-center gap-1">
          {onToggleFavorite && (
            <button
              type="button"
              onClick={onToggleFavorite}
              title={favorito ? 'Remover dos favoritos' : 'Favoritar'}
              className={cx(
                'grid h-8 w-8 place-items-center rounded-lg transition-colors',
                favorito ? 'text-[var(--color-teal)]' : 'text-[var(--color-faint)] hover:text-[var(--color-text)]',
              )}
            >
              <Star className={cx('h-4 w-4', favorito && 'fill-current')} />
            </button>
          )}
          <button
            type="button"
            onClick={copy}
            title="Copiar"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-2)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-teal)] hover:text-[var(--color-teal)]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-text)]">{text}</p>
    </Card>
  )
}
