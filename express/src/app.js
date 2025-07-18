// Importamos el módulo de Express
const express = require('express')

// Creamos una aplicación de Express
const app = express()

// Definimos el puerto que va a escuchar el servidor
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
