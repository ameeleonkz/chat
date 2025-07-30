'use client'

import { useEffect, useState } from 'react'
import { initSocket } from './socket'

type Message = { author: string; text: string, id: string }

export function useSocketEvents() {
  const [messages, setMessages] = useState<Message[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = initSocket()

    const onMessage = (msg: Message) => setMessages((prev) => [...prev, msg])
    const onConnect = () => setConnected(true)
    const onDisconnect = () => setConnected(false)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('message', onMessage)

    return () => {
      socket.off('message', onMessage)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const send = (msg: Message) => {
    initSocket().emit('message', msg)
  }

  return { connected, messages, send }
}
