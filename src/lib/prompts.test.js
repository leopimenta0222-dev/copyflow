import { describe, test, expect } from 'vitest'
import { buildMessages, parseVariations } from './prompts'

describe('buildMessages', () => {
  test('inclui o contexto do usuário na mensagem', () => {
    const { user } = buildMessages({ tipo: 'descricao', contexto: { produto: 'Tênis X' }, tom: 'persuasivo' })
    expect(user).toContain('Tênis X')
  })

  test('reflete o idioma escolhido no system prompt', () => {
    const { system } = buildMessages({ tipo: 'descricao', contexto: { produto: 'Tênis X' }, idioma: 'en' })
    expect(system.toLowerCase()).toContain('inglês')
  })

  test('pede exatamente n variações', () => {
    const { system, n } = buildMessages({ tipo: 'headline', contexto: { assunto: 'App' }, n: 2 })
    expect(n).toBe(2)
    expect(system).toContain('2 variações')
  })

  test('ignora campos de contexto vazios', () => {
    const { user } = buildMessages({ tipo: 'descricao', contexto: { produto: 'Tênis X', publico: '   ' } })
    expect(user).toContain('produto')
    expect(user).not.toContain('publico')
  })
})

describe('parseVariations', () => {
  test('lê um array JSON embutido no texto', () => {
    expect(parseVariations('blá ["a","b","c"] fim', 3)).toEqual(['a', 'b', 'c'])
  })

  test('fallback: separa por lista numerada', () => {
    expect(parseVariations('1) um\n2) dois', 2)).toEqual(['um', 'dois'])
  })

  test('limita ao número pedido', () => {
    expect(parseVariations('["a","b","c","d"]', 2)).toEqual(['a', 'b'])
  })

  test('texto vazio retorna lista vazia', () => {
    expect(parseVariations('', 3)).toEqual([])
  })
})
