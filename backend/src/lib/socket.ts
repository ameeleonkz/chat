import { Server, Socket } from 'socket.io'
import axios from 'axios'

export function setupSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('🔌 client connected')

    socket.on('message', async (msg) => {
      console.log('📨', msg)
      try {
        // Отправляем текст на модерацию
        const response = await axios.post('http://moderator:4000/filter', { text: msg.text })
        const moderatedText = response.data.text
        // Эмитим отмодерированное сообщение с тем же id
        io.emit('message', { ...msg, text: moderatedText })
      } catch (error) {
        console.error('Ошибка модерации:', error)
        // Можно эмитить оригинальное сообщение или ничего не отправлять
      }
    })

    // Здесь можно добавить другие события
  })
}