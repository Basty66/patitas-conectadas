import { Router } from 'express'
import db from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const notifications = await db.all('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 20', [])
    res.json(notifications)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/unread', async (req, res) => {
  try {
    const row = await db.get("SELECT COUNT(*) as count FROM notifications WHERE read = 0", [])
    res.json({ count: row ? parseInt(row.count) : 0 })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.patch('/:id/read', async (req, res) => {
  try {
    await db.run('UPDATE notifications SET read = 1 WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.patch('/read-all', async (req, res) => {
  try {
    await db.run('UPDATE notifications SET read = 1 WHERE read = 0', [])
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
