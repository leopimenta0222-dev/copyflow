import { Sparkles } from 'lucide-react'
import { useLang } from '../context/LangProvider'
import { Card } from './ui'

const Bar = ({ w = 'w-full' }) => (
  <div className={`shimmer h-3 rounded-full bg-[var(--color-surface-2)] ${w}`} />
)

// Skeleton mostrado enquanto a geração roda — n cards "materializando".
export function Shimmer({ count = 3 }) {
  const { t } = useLang()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Sparkles className="h-4 w-4 animate-pulse text-[var(--color-teal)]" />
        <span>{t('shimmer.generating')}</span>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="reveal space-y-3 p-5" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-2">
              <span className="grad h-5 w-5 rounded-md opacity-70" />
              <Bar w="w-24" />
            </div>
            <Bar />
            <Bar w="w-[92%]" />
            <Bar w="w-[78%]" />
          </Card>
        ))}
      </div>
    </div>
  )
}
