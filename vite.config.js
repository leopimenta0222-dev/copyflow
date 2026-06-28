import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serve as funções de /api no `npm run dev` (em produção, viram funções da Vercel).
function devApiPlugin() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next()
        const [path, qs] = req.url.split('?')
        const name = path.replace('/api/', '').replace(/\.js$/, '')
        let mod
        try {
          mod = await server.ssrLoadModule(`/api/${name}.js`)
        } catch {
          return next()
        }
        req.query = Object.fromEntries(new URLSearchParams(qs || ''))
        if (req.method === 'POST') {
          req.body = await new Promise((resolve) => {
            let data = ''
            req.on('data', (c) => (data += c))
            req.on('end', () => { try { resolve(JSON.parse(data || '{}')) } catch { resolve({}) } })
          })
        }
        res.status = (c) => { res.statusCode = c; return res }
        res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)) }
        try {
          await mod.default(req, res)
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: e.message }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return { plugins: [react(), tailwindcss(), devApiPlugin()] }
})
