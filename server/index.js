import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'
import petsRouter from './routes/pets.js'
import statsRouter from './routes/stats.js'
import notificationsRouter from './routes/notifications.js'
import blogRouter from './routes/blog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    if (req.path.startsWith('/api/') || req.path === '/') {
      console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path} ${res.statusCode} ${ms}ms`)
    }
  })
  res.setHeader('X-Powered-By', 'Patitas Conectadas')
  res.setHeader('X-API-Version', '1.0.0')
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache')
  }
  next()
})

const uploadsPath = join(__dirname, 'uploads')
if (existsSync(uploadsPath)) {
  app.use('/uploads', express.static(uploadsPath, { maxAge: '7d' }))
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString(), version: '1.0.0' })
})

app.use('/api/pets', petsRouter)
app.use('/api/stats', statsRouter)
app.use('/api/notifications', notificationsRouter)
app.use('/api/blog', blogRouter)

const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1h' }))
  app.get('/{*path}', (_, res) => res.sendFile(join(distPath, 'index.html')))
}

app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).json({ error: 'Error interno del servidor' })
})

// Only start server when running directly (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n  🐾 Patitas Conectadas v1.0.0`)
    console.log(`  http://localhost:${PORT}`)
    console.log(`  Health: http://localhost:${PORT}/api/health\n`)
  })
}

export default app
