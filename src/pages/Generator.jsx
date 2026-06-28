import { useState } from 'react'
import { Sparkles, RefreshCw, Info, Star } from 'lucide-react'
import { CONTENT_TYPES, getContentType } from '../lib/contentTypes'
import { useGenerate, useCreateGeneration, useToggleFavorite } from '../hooks/data'
import { useToast } from '../context/ToastProvider'
import { Container, Card, Button, cx } from '../components/ui'
import { TypePicker } from '../components/TypePicker'
import { ContextForm } from '../components/ContextForm'
import { VariationCard } from '../components/VariationCard'
import { Shimmer } from '../components/Shimmer'

export function Generator() {
  const [tipo, setTipo] = useState(CONTENT_TYPES[0].id)
  const [result, setResult] = useState(null) // { variacoes, demo }
  const [saved, setSaved] = useState(null)   // generation salva (id, favorito)
  const [lastInput, setLastInput] = useState(null)

  const generateMut = useGenerate()
  const createMut = useCreateGeneration()
  const toggleMut = useToggleFavorite()
  const toast = useToast()

  const ct = getContentType(tipo)

  const run = async (payload) => {
    setLastInput(payload)
    try {
      const res = await generateMut.mutateAsync({ tipo, ...payload })
      setResult(res)
      const gen = await createMut.mutateAsync({ tipo, contexto: payload.contexto, tom: payload.tom, idioma: payload.idioma, variacoes: res.variacoes })
      setSaved(gen)
    } catch (e) {
      toast.show(e.message || 'Falha ao gerar. Tente novamente.', 'error')
    }
  }

  const regenerate = () => { if (lastInput) run(lastInput) }

  const onPickType = (id) => { setTipo(id); setResult(null); setSaved(null); setLastInput(null) }

  const toggleFav = async () => {
    if (!saved) return
    const next = !saved.favorito
    setSaved((s) => ({ ...s, favorito: next })) // otimista
    try { await toggleMut.mutateAsync({ id: saved.id, favorito: next }) }
    catch { setSaved((s) => ({ ...s, favorito: !next })); toast.show('Não foi possível favoritar.', 'error') }
  }

  const loading = generateMut.isPending

  return (
    <Container className="py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Gerador</h1>
        <p className="mt-1.5 text-[var(--color-muted)]">Escolha o tipo, descreva o contexto e gere variações com IA.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* COLUNA: setup */}
        <div className="space-y-5">
          <div>
            <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">Tipo de conteúdo</p>
            <TypePicker value={tipo} onChange={onPickType} />
          </div>
          <Card className="p-5">
            <p className="mb-4 text-sm text-[var(--color-muted)]">{ct?.descricao}</p>
            <ContextForm key={tipo} tipo={tipo} loading={loading} onGenerate={run} />
          </Card>
        </div>

        {/* COLUNA: resultado */}
        <div>
          {loading ? (
            <Shimmer count={3} />
          ) : result ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold">{result.variacoes.length} variações</h2>
                <div className="flex items-center gap-2">
                  {saved && (
                    <button
                      type="button"
                      onClick={toggleFav}
                      className={cx(
                        'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                        saved.favorito
                          ? 'border-[var(--color-teal)] text-[var(--color-teal)]'
                          : 'border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]',
                      )}
                    >
                      <Star className={cx('h-3.5 w-3.5', saved.favorito && 'fill-current')} />
                      {saved.favorito ? 'Favoritada' : 'Favoritar'}
                    </button>
                  )}
                  <Button variant="subtle" size="sm" onClick={regenerate} loading={loading}>
                    <RefreshCw className="h-3.5 w-3.5" /> Gerar novamente
                  </Button>
                </div>
              </div>

              {result.demo && (
                <div className="flex items-start gap-2.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-violet)]" />
                  <span>Exemplo de demonstração. Em produção, configure a <span className="font-mono text-[var(--color-text)]">ANTHROPIC_API_KEY</span> no servidor para gerar com IA real.</span>
                </div>
              )}

              <div className="grid gap-4">
                {result.variacoes.map((text, i) => (
                  <VariationCard key={i} index={i} text={text} style={{ animationDelay: `${i * 70}ms` }} />
                ))}
              </div>
            </div>
          ) : (
            <Card className="flex min-h-[320px] flex-col items-center justify-center gap-3 border-dashed p-10 text-center">
              <span className="grad grid h-12 w-12 place-items-center rounded-xl text-[#0a0d14] opacity-90">
                <Sparkles className="h-6 w-6" />
              </span>
              <p className="font-display text-lg font-bold">Suas variações aparecem aqui</p>
              <p className="max-w-xs text-sm text-[var(--color-muted)]">Preencha o contexto ao lado e clique em <span className="text-[var(--color-text)]">Gerar conteúdo</span>.</p>
            </Card>
          )}
        </div>
      </div>
    </Container>
  )
}
