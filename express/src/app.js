// 1. Importar express CommonJS
/* const express = require('express')
require('dotenv').config() */

// Importar express y dotenv con ESModules
import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
// 2. Crear la aplicación de express
const app = express()
const PORT = process.env.PORT

// Función que lee la info de db.json
const readData = () => {
  try {
    const data = fs.readFileSync('./src/db.json')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}

// Función que escribe dentro de db.json
const writeData = (data) => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
  // return JSON.stringify(data)
}

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/peliculas', (req, res) => {
  const data = readData()
  res.json(data)
})

app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = readData().accion.find(pelicula => pelicula.id === id)
  res.json(result)
})

app.use(express.json())

app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body
  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }
  data.accion.push(newMovie)
  writeData(data)
  res.json(newMovie)
})

app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body

  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion[peliculaIndex] = {
    ...data.accion[peliculaIndex],
    ...body
  }
  writeData(data)
  res.json({ message: 'Pelicula actualizada correctamente' })
})

app.delete('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion.splice(peliculaIndex, 1)
  writeData(data)
  res.json({ message: 'Pelicula eliminada correctamente' })
})

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT)
})
