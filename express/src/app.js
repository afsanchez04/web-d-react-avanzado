require('dotenv').config()
// console.log(process.env.PORT)
// console.log(process.env.NOMBRE)
// Importamos el módulo de Express
const express = require('express')
const { infoPeliculas } = require('./peliculas')

// Creamos una aplicación de Express
const app = express()

// Definimos el puerto que va a escuchar el servidor
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})

app.get('/api/peliculas/accion/titulo/:titulo/:year', (req, res) => {
  /* const titulo = req.params.titulo
  const year = req.params.year */
  const { titulo, year } = req.params
  const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo && pelicula.year === Number(year))

  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron resultados para ${titulo} en el año ${year}`)
  }

  res.send(resultados)
})

app.get('/api/peliculas/comedia/:pais', (req, res) => {
  const pais = req.params.pais
  const resultados = infoPeliculas.comedia.filter(pelicula => pelicula.pais === pais)

  if (req.query.ordenar === 'year') {
    return res.send(resultados.sort((a, b) => b.year - a.year))
  }

  res.send(resultados)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
