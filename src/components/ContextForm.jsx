import { useForm } from 'react-hook-form'
import { Sparkles } from 'lucide-react'
import { getContentType } from '../lib/contentTypes'
import { Button, Input, Textarea, Select, Field } from './ui'

const TONS = [
  ['profissional', 'Profissional'],
  ['descontraido', 'Descontraído'],
  ['persuasivo', 'Persuasivo'],
  ['divertido', 'Divertido'],
]
const IDIOMAS = [
  ['pt', 'Português'],
  ['en', 'Inglês'],
  ['es', 'Espanhol'],
]

export function ContextForm({ tipo, loading, onGenerate }) {
  const ct = getContentType(tipo)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { tom: 'profissional', idioma: 'pt' },
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
              {...register(campo.name, campo.required ? { required: 'Campo obrigatório.' } : {})}
            />
          ) : (
            <Input
              placeholder={campo.placeholder}
              {...register(campo.name, campo.required ? { required: 'Campo obrigatório.' } : {})}
            />
          )}
        </Field>
      ))}

      <div className="grid grid-cols-2 gap-3">
        <Field label="Tom">
          <Select {...register('tom')}>
            {TONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
        </Field>
        <Field label="Idioma">
          <Select {...register('idioma')}>
            {IDIOMAS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
        </Field>
      </div>

      <Button type="submit" size="lg" className="w-full" loading={loading}>
        <Sparkles className="h-4 w-4" /> {loading ? 'Gerando…' : 'Gerar conteúdo'}
      </Button>
    </form>
  )
}
