'use client'

import { useEffect, useState } from 'react'
import { initSocket } from './socket'

export function useSocketEvents() {
  const [messages, setMessages] = useState<string[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = initSocket()

    const onMessage = (msg: string) => setMessages((prev) => [...prev, msg])
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

  const send = (msg: string) => {
    initSocket().emit('message', msg)
  }

  return { connected, messages, send }
}
