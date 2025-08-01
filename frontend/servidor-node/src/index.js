const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hola mundo desde Node.js')
})

const PORT = 3000

server.listen(PORT, () => {
  console.log('Servidor ejecutandose en el port http://localhost:3000')
})
