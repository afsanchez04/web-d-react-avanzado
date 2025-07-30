import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'
import './db.js'

const app = express()
const PORT = 3001

// Middleware para CORS y JSON
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body

  try {
    const response = await generateFromOllama(prompt)
    res.json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error procesando la solicitud' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})
