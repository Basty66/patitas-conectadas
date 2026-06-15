import pg from 'pg'
import express from 'express'
import cors from 'cors'
import { existsSync, readFileSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
})

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Health
app.get('/api/health', async (req, res) => {
  try {
    const r = await pool.query('SELECT NOW() as time')
    res.json({ status: 'ok', db: 'connected', time: r.rows[0].time })
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message })
  }
})

// Pets
app.get('/api/pets', async (req, res) => {
  try {
    const { type, species, status, q } = req.query
    let sql = 'SELECT * FROM pets WHERE 1=1'
    const params = []; let i = 1
    if (type) { sql += ` AND type = $${i++}`; params.push(type) }
    if (species) { sql += ` AND species = $${i++}`; params.push(species) }
    if (status) { sql += ` AND status = $${i++}`; params.push(status) }
    if (q) { sql += ` AND (name ILIKE $${i} OR breed ILIKE $${i} OR description ILIKE $${i})`; params.push(`%${q}%`); i++ }
    sql += ' ORDER BY created_at DESC'
    const r = await pool.query(sql, params)
    res.json(r.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/pets/:id', async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM pets WHERE id = $1', [req.params.id])
    if (!r.rows[0]) return res.status(404).json({ error: 'No encontrado' })
    res.json(r.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// Notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 20')
    res.json(r.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/notifications/unread', async (req, res) => {
  try {
    const r = await pool.query("SELECT COUNT(*) as count FROM notifications WHERE read = 0")
    res.json({ count: parseInt(r.rows[0].count) })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.patch('/api/notifications/:id/read', async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET read = 1 WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.patch('/api/notifications/read-all', async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET read = 1 WHERE read = 0')
    res.json({ success: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// Blog
app.get('/api/blog', async (req, res) => {
  try {
    const { type } = req.query
    let sql = 'SELECT * FROM blog_posts WHERE published = 1'
    const params = []
    if (type) { sql += ' AND type = $1'; params.push(type) }
    sql += ' ORDER BY created_at DESC'
    const r = await pool.query(sql, params)
    res.json(r.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/blog/:id', async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id])
    if (!r.rows[0]) return res.status(404).json({ error: 'No encontrado' })
    res.json(r.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/blog/:id/like', async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id])
    if (!r.rows[0]) return res.status(404).json({ error: 'No encontrado' })
    await pool.query('UPDATE blog_posts SET likes = likes + 1 WHERE id = $1', [req.params.id])
    res.json({ likes: r.rows[0].likes + 1 })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// Blog comments
app.get('/api/blog/:id/comments', async (req, res) => {
  try {
    const r = await pool.query('SELECT * FROM blog_comments WHERE post_id = $1 ORDER BY created_at ASC', [req.params.id])
    res.json(r.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/blog/:id/comments', async (req, res) => {
  try {
    const { author, content } = req.body
    if (!author || !content) return res.status(400).json({ error: 'Autor y contenido requeridos' })
    const r = await pool.query('INSERT INTO blog_comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING id', [req.params.id, author, content])
    const c = await pool.query('SELECT * FROM blog_comments WHERE id = $1', [r.rows[0].id])
    res.status(201).json(c.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// Stats
app.get('/api/stats', (req, res) => {
  res.json({
    van: 305902076, tir: 178.2, pri: 20.1, inversion: 56240000,
    prestamo: 50000000, capitalPropio: 6240000, puntoEquilibrio: 12,
    flujoAcumulado: 414163379, cuotaMensual: 1660715, totalIntereses: 9785763,
    tasaDescuento: 12, horizonte: 36, ingresosMes36: 50520000,
    costosOperacionBase: 6330000, modalidad: 'Opción 1 - Desarrollo Incremental Ágil (MVP)',
    usuariosMes36: 108000, conveniosClinicas: 75, conveniosMunicipios: 29, conveniosRefugios: 32,
  })
})

// SPA - serve dist files
const distPath = join(__dirname, '..', 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
}

// Vercel handler
export default async function handler(req, res) {
  await app(req, res)
}
