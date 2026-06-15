import { Router } from 'express'
import multer from 'multer'
import { existsSync, mkdirSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import db from '../db.js'
import { extractColors, findMatches } from '../imageUtils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uploadsDir = join(__dirname, '..', 'uploads')
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname)),
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { type, species, status, q } = req.query
    let sql = 'SELECT * FROM pets WHERE 1=1'
    const params = []
    let idx = 1
    if (type) { sql += ` AND type = $${idx++}`; params.push(type) }
    if (species) { sql += ` AND species = $${idx++}`; params.push(species) }
    if (status) { sql += ` AND status = $${idx++}`; params.push(status) }
    if (q) { sql += ` AND (name ILIKE $${idx} OR breed ILIKE $${idx} OR description ILIKE $${idx})`; params.push(`%${q}%`); idx++ }
    sql += ' ORDER BY created_at DESC'
    const pets = await db.all(sql, params)
    res.json(pets)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const pet = await db.get('SELECT * FROM pets WHERE id = $1', [req.params.id])
    if (!pet) return res.status(404).json({ error: 'No encontrado' })
    res.json(pet)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { type, species, name, breed, color, size, gender, age, description, contact_name, phone, email, address } = req.body
    if (!type || !contact_name) return res.status(400).json({ error: 'Faltan campos requeridos' })

    let photoPath = null
    let colorsJson = null

    if (req.file) {
      photoPath = '/uploads/' + req.file.filename
      try {
        const colors = await extractColors(req.file.path)
        colorsJson = JSON.stringify(colors)
      } catch (e) {
        console.log('Error extrayendo colores:', e.message)
      }
    }

    const result = await db.run(`
      INSERT INTO pets (type, species, name, breed, color, size, gender, age, description, contact_name, phone, email, address, photo, colors)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id
    `, [type, species || 'dog', name || null, breed || null, color || null, size || null, gender || null, age || null, description || null, contact_name, phone || null, email || null, address || null, photoPath, colorsJson])

    const petId = result.rows[0].id
    let matchCount = 0

    if (type === 'found') {
      const lostPets = await db.all("SELECT * FROM pets WHERE type = 'lost' AND status = 'active'", [])
      const allColors = colorsJson ? JSON.parse(colorsJson) : []
      const newPet = { species, breed, color, size, colors: allColors }
      const matches = findMatches(newPet, lostPets)
      const good = matches.filter(m => m.score >= 50)
      matchCount = good.length
      for (const m of good) {
        await db.run(`INSERT INTO notifications (type, title, message, pet_id, match_score) VALUES ('match', $1, $2, $3, $4)`,
          ['Posible coincidencia encontrada', `Se encontró una mascota similar: ${m.score}% de coincidencia`, m.pet.id, m.score])
      }
    } else if (type === 'lost') {
      const foundPets = await db.all("SELECT * FROM pets WHERE type = 'found' AND status = 'active'", [])
      const allColors = colorsJson ? JSON.parse(colorsJson) : []
      const newPet = { species, breed, color, size, colors: allColors }
      const matches = findMatches(newPet, foundPets)
      const good = matches.filter(m => m.score >= 50)
      matchCount = good.length
      for (const m of good) {
        await db.run(`INSERT INTO notifications (type, title, message, pet_id, match_score) VALUES ('match', $1, $2, $3, $4)`,
          ['Posible coincidencia encontrada', `"${req.body.name || 'Una mascota'}" coincide ${m.score}% con una encontrada`, m.pet.id, m.score])
      }
    }

    res.status(201).json({ id: petId, message: 'Reporte creado exitosamente', photo: photoPath, matches: matchCount })
  } catch (e) {
    res.status(500).json({ error: 'Error al procesar: ' + e.message })
  }
})

router.get('/:id/matches', async (req, res) => {
  try {
    const found = await db.get('SELECT * FROM pets WHERE id = $1 AND type = $2', [req.params.id, 'found'])
    if (!found) return res.status(404).json({ error: 'Mascota encontrada no encontrada' })

    const lostPets = await db.all("SELECT * FROM pets WHERE type = 'lost' AND status = 'active'", [])
    const matches = findMatches(found, lostPets)

    res.json({ found, matches, total: matches.length })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.patch('/:id/resolve', async (req, res) => {
  try {
    const pet = await db.get('SELECT * FROM pets WHERE id = $1', [req.params.id])
    if (!pet) return res.status(404).json({ error: 'No encontrado' })
    await db.run("UPDATE pets SET status = 'resolved' WHERE id = $1", [req.params.id])
    res.json({ message: 'Marcado como resuelto' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
