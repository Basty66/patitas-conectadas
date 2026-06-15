import { execSync } from 'child_process'
import { writeFileSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const url = 'postgresql://neondb_owner:npg_sgfc06jlaRCO@ep-bitter-unit-atgtkruo-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
// Write URL without trailing newline
const tmpFile = join(__dirname, 'db_url_clean.tmp')
writeFileSync(tmpFile, url, 'utf-8')

const result = execSync(`vercel env add DATABASE_URL production --force --yes < "${tmpFile}"`, {
  cwd: join(__dirname, '..'),
  encoding: 'utf-8'
})
console.log(result)

unlinkSync(tmpFile)
