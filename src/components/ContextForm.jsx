import { useForm } from 'react-hook-form'
import { Sparkles } from 'lucide-react'
import { getContentTypeL } from '../lib/contentTypes'
import { useLang } from '../context/LangProvider'
import { Button, Input, Textarea, Select, Field } from './ui'

// Chaves internas fixas (persistidas); só os rótulos passam por t().
const TONS = ['profissional', 'descontraido', 'persuasivo', 'divertido']
const IDIOMAS = ['pt', 'en', 'es']

export function ContextForm({ tipo, loading, onGenerate }) {
  const { lang, t } = useLang()
  const ct = getContentTypeL(tipo, lang)
  // Ao usar a interface em inglês, o idioma de SAÍDA já vem 'en' (o usuário pode trocar).
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { tom: 'profissional', idioma: lang === 'en' ? 'en' : 'pt' },
  })

  if (!ct) return null

  const onSubmit = ({ tom, idioma, ...contexto }) => onGenerate({ contexto, tom, idioma })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {ct.campos.map((campo) => (
        <Field key={campo.name} label={campo.label + (campo.required ? ' *' : '')} error={errors[campo.name]?.message}>
          {campo.type === 'textarea' ? (
            <Textarea
              placeholder={campo.placeholder}
              {...register(campo.name, campo.required ? { required: t('form.required') } : {})}
            />
          ) : (
            <Input
              placeholder={campo.placeholder}
              {...register(campo.name, campo.required ? { required: t('form.required') } : {})}
            />
          )}
        </Field>
      ))}

      <div className="grid grid-cols-2 gap-3">
        <Field label={t('form.tone')}>
          <Select {...register('tom')}>
            {TONS.map((v) => <option key={v} value={v}>{t(`tone.${v}`)}</option>)}
          </Select>
        </Field>
        <Field label={t('form.language')}>
          <Select {...register('idioma')}>
            {IDIOMAS.map((v) => <option key={v} value={v}>{t(`idioma.${v}`)}</option>)}
          </Select>
        </Field>
      </div>

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        <Sparkles className="h-4 w-4" /> {loading ? t('form.generating') : t('form.submit')}
      </Button>
    </form>
  )
}
