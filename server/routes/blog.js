import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `blog_${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { type } = req.query
    let sql = 'SELECT * FROM blog_posts WHERE published = 1'
    const params = []
    if (type) { sql += ' AND type = $1'; params.push(type) }
    sql += ' ORDER BY created_at DESC'
    const posts = await db.all(sql, params)
    res.json(posts)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await db.get('SELECT * FROM blog_posts WHERE id = $1', [req.params.id])
    if (!post) return res.status(404).json({ error: 'No encontrado' })
    res.json(post)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author, type } = req.body
    if (!title || !content) return res.status(400).json({ error: 'Título y contenido requeridos' })
    const image = req.file ? `/uploads/${req.file.filename}` : null
    const result = await db.run(
      'INSERT INTO blog_posts (title, content, author, type, image) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [title, content, author || 'Equipo Patitas', type || 'article', image]
    )
    res.status(201).json({ id: result.rows[0].id, message: 'Post creado' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/:id/like', async (req, res) => {
  try {
    const post = await db.get('SELECT * FROM blog_posts WHERE id = $1', [req.params.id])
    if (!post) return res.status(404).json({ error: 'No encontrado' })
    await db.run('UPDATE blog_posts SET likes = likes + 1 WHERE id = $1', [req.params.id])
    res.json({ likes: post.likes + 1 })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await db.all('SELECT * FROM blog_comments WHERE post_id = $1 ORDER BY created_at ASC', [req.params.id])
    res.json(comments)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/:id/comments', async (req, res) => {
  try {
    const { author, content } = req.body
    if (!author || !content) return res.status(400).json({ error: 'Autor y contenido requeridos' })
    const result = await db.run(
      'INSERT INTO blog_comments (post_id, author, content) VALUES ($1, $2, $3) RETURNING id',
      [req.params.id, author, content]
    )
    const comment = await db.get('SELECT * FROM blog_comments WHERE id = $1', [result.rows[0].id])
    res.status(201).json(comment)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
