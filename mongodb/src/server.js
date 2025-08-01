import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/users.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json())
app.use('/api', router) 

app.get('/', (req, res) => {
  res.send("Hola Atlas")
})
//connect() pide una uri o llave que conecte con la base de datos
mongoose
.connect(process.env.MONGODB_KEY)
.then( () => console.log("Conectado a Mongo DB Atlas") )
.catch( error => console.log(error) )

app.listen(PORT, () => {
  console.log("Aplicación corriendo en puerto",PORT)
})