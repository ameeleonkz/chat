import next from 'next'
import http from 'http'
import { Server } from 'socket.io'
import { setupSocket } from './lib/socket'
import client from 'prom-client'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()

// Создаём отдельный HTTP сервер для метрик
const metricsServer = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', client.register.contentType)
    res.end(await client.register.metrics())
  } else {
    res.statusCode = 404
    res.end('Not found')
  }
})
metricsServer.listen(9100) // порт для метрик

app.prepare()
  .then(() => {
    const server = http.createServer((req, res) => handle(req, res))
    const io = new Server(server, {
      cors: { origin: '*' }
    })

    setupSocket(io)

    const PORT = process.env.PORT || 3001
    server.listen(PORT, () => {
      console.log(`🚀 Backend+Next.js running on http://backend:${PORT}`)
      console.log(`📊 Prometheus metrics on http://backend:9100/metrics`)
    })
  })
  .catch((e) => {
    console.error(e)
  })