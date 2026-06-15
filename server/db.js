import pg from 'pg'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '..', '.env') })

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

pool.on('error', (err) => {
  console.error('[PG] pool error:', err.message)
})

export async function query(text, params) {
  const start = Date.now()
  const result = await pool.query(text, params)
  const duration = Date.now() - start
  if (duration > 200) {
    console.log(`[PG] slow (${duration}ms):`, text.substring(0, 100))
  }
  return result
}

export async function all(text, params) {
  const result = await query(text, params)
  return result.rows
}

export async function get(text, params) {
  const result = await query(text, params)
  return result.rows[0] || null
}

export async function run(text, params) {
  const result = await query(text, params)
  return result
}

export { pool }
export default { query, all, get, run, pool }
