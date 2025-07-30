import next from 'next'
import http from 'http'
import { Server } from 'socket.io'
import { setupSocket } from './lib/socket'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()

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
    })
  })
  .catch((e) => {
    console.error(e)
  })