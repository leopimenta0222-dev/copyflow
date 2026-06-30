import { describe, test, expect, beforeEach } from 'vitest'
import handler from './generate.js'

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(c) { this.statusCode = c; return this },
    json(o) { this.body = o; return this },
  }
}

describe('/api/generate', () => {
  beforeEach(() => {
    // Sem chave configurada → caminho demo (estado padrão do portfólio).
    delete process.env.GROQ_API_KEY
  })

  test('sem chave: devolve fallback de exemplo (demo: true)', async () => {
    const res = mockRes()
    await handler(
      { method: 'POST', body: { tipo: 'legenda', contexto: { tema: 'coleção de inverno' }, tom: 'divertido', idioma: 'pt' } },
      res,
    )
    expect(res.statusCode).toBe(200)
    expect(res.body.demo).toBe(true)
    expect(res.body.variacoes).toHaveLength(3)
    expect(res.body.variacoes[0]).toContain('coleção de inverno')
  })

  test('método != POST → 405', async () => {
    const res = mockRes()
    await handler({ method: 'GET' }, res)
    expect(res.statusCode).toBe(405)
  })

  test('tipo ausente → 400', async () => {
    const res = mockRes()
    await handler({ method: 'POST', body: {} }, res)
    expect(res.statusCode).toBe(400)
  })
})
