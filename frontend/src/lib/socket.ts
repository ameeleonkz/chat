import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3001') // ← сюда подключается к backend'у
  }
  return socket
}

export const getSocket = () => {
  if (!socket) throw new Error('Socket not initialized')
  return socket
}
