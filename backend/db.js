import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import { fileURLToPath } from 'url'

// Rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '..')
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const defaulData = { messages: [] }

const db = new Low(adapter, defaulData)

await db.read()

await db.write()

/* console.log('Ruta:', __filename)
console.log('Ruta:', import.meta.url) */
export default db
