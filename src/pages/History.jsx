import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronDown, Star, Wand2, History as HistoryIcon } from 'lucide-react'
import { getContentTypes, getContentTypeL } from '../lib/contentTypes'
import { typeIcon } from '../lib/icons'
import { useGenerations, useToggleFavorite } from '../hooks/data'
import { useLang } from '../context/LangProvider'
import { Container, Card, Button, Badge, Loading, EmptyState, cx } from '../components/ui'
import { VariationCard } from '../components/VariationCard'

// Data localizada: PT usa locale ptBR e o literal "de"; EN usa o padrão (en-US).
const formatDate = (iso, lang) =>
  lang === 'en'
    ? format(new Date(iso), 'MMM d, HH:mm')
    : format(new Date(iso), "d 'de' MMM, HH:mm", { locale: ptBR })

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'border-[var(--color-teal)] bg-[var(--color-surface-2)] text-[var(--color-teal)]'
          : 'border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]',
      )}
    >
      {children}
    </button>
  )
}

function GenerationRow({ gen, onToggleFav }) {
  const [open, setOpen] = useState(false)
  const { lang, t } = useLang()
  const ct = getContentTypeL(gen.tipo, lang)
  const Icon = typeIcon(ct?.icon)

  return (
    <Card className="overflow-hidden">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 p-4 text-left">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-2)] text-[var(--color-teal)]">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold">{ct?.label || gen.tipo}</span>
            <Badge tone="neutral">{gen.variacoes.length} {t('gen.variations.count')}</Badge>
          </div>
          <p className="mt-0.5 truncate text-xs text-[var(--color-faint)]">
            {formatDate(gen.criado_em, lang)} · {t(`tone.${gen.tom}`)} · {t(`idioma.${gen.idioma}`)}
          </p>
        </div>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => { e.stopPropagation(); onToggleFav(gen) }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onToggleFav(gen) } }}
          title={gen.favorito ? t('variation.unfavorite') : t('variation.favorite')}
          className={cx(
            'grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg transition-colors',
            gen.favorito ? 'text-[var(--color-teal)]' : 'text-[var(--color-faint)] hover:text-[var(--color-text)]',
          )}
        >
          <Star className={cx('h-4 w-4', gen.favorito && 'fill-current')} />
        </span>
        <ChevronDown className={cx('h-4 w-4 shrink-0 text-[var(--color-faint)] transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-bg)]/40 p-4">
          <div className="grid gap-3">
            {gen.variacoes.map((text, i) => (
              <VariationCard key={i} index={i} text={text} />
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export function History() {
  const [filter, setFilter] = useState('todos')
  const { data: generations, isLoading } = useGenerations()
  const toggleMut = useToggleFavorite()
  const { lang, t } = useLang()

  const onToggleFav = (gen) => toggleMut.mutate({ id: gen.id, favorito: !gen.favorito })

  const list = (generations || []).filter((g) => {
    if (filter === 'todos') return true
    if (filter === 'favoritos') return g.favorito
    return g.tipo === filter
  })

  const usedTypes = getContentTypes(lang).filter((ct) => (generations || []).some((g) => g.tipo === ct.id))

  return (
    <Container className="py-8 sm:py-12">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('history.title')}</h1>
        <p className="mt-1.5 text-[var(--color-muted)]">{t('history.subtitle')}</p>
      </div>

      {isLoading ? (
        <Loading label={t('history.loading')} />
      ) : !generations?.length ? (
        <EmptyState
          icon={HistoryIcon}
          title={t('history.empty.title')}
          text={t('history.empty.text')}
          action={<Button as={Link} to="/app" className="mt-1"><Wand2 className="h-4 w-4" /> {t('history.empty.action')}</Button>}
        />
      ) : (
        <>
          <div className="mb-5 flex flex-wrap gap-2">
            <Chip active={filter === 'todos'} onClick={() => setFilter('todos')}>{t('history.filter.all')}</Chip>
            <Chip active={filter === 'favoritos'} onClick={() => setFilter('favoritos')}>{t('history.filter.favorites')}</Chip>
            {usedTypes.map((ct) => (
              <Chip key={ct.id} active={filter === ct.id} onClick={() => setFilter(ct.id)}>{ct.label}</Chip>
            ))}
          </div>

          {list.length ? (
            <div className="space-y-3">
              {list.map((gen) => <GenerationRow key={gen.id} gen={gen} onToggleFav={onToggleFav} />)}
            </div>
          ) : (
            <EmptyState icon={Star} title={t('history.filter.empty.title')} text={t('history.filter.empty.text')} />
          )}
        </>
      )}
    </Container>
  )
}
