import { Server, Socket } from 'socket.io'

export function setupSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('🔌 client connected')

    socket.on('message', (msg) => {
      console.log('📨', msg)
      io.emit('message', msg)
    })

    // Здесь можно добавить другие события
  })
}