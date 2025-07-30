'use client'

import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setUser } from '@/features/user/userSlice'
import { useSocketEvents } from '@/lib/useSocket'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import Header from '@/components/Header'
import { v4 as uuidv4 } from 'uuid'

type JwtPayload = {
  id: number
  username: string
  exp?: number
}

export default function HomePage() {
  const count = useAppSelector((state) => state.counter.value)
  const user = useAppSelector((state) => state.user.value)
  const isUserLoaded = useAppSelector((state) => state.user.isLoaded)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { connected, messages, send } = useSocketEvents()
  const [input, setInput] = useState('')
  const [pendingMessages, setPendingMessages] = useState<{id: string, text: string}[]>([])
  const messagesEndRef = useRef<HTMLUListElement>(null)

  // Восстанавливаем пользователя из токена только один раз
  useEffect(() => {
      const token = Cookies.get('token')
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token)
          if (decoded?.username) {
            dispatch(setUser(decoded.username))
          }
        } catch (e) {
          Cookies.remove('token')
          dispatch(setUser(""))
        }
      } else {
        dispatch(setUser(""))
      }
  }, [])

  // После попытки восстановления пользователя решаем, что делать
  useEffect(() => {
    if (isUserLoaded && !user) {
      router.replace('/login')
    }
  }, [user, router, isUserLoaded])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
    if (messages.length && pendingMessages.length) {
      setPendingMessages((pending) =>
        pending.filter(pm => !messages.some(m => m.id === pm.id))
      )
    }
  }, [messages])

  // Пока не завершили попытку восстановления — ничего не показываем
  if (!user) {
    return null // или <Spinner />
  }

  const handleSend = () => {
    if (input.trim()) {
      const id = uuidv4()
      send({ id, author: user, text: input })
      setPendingMessages((prev) => [...prev, { id, text: input }])
      setInput('')
    }
  }

  return (
    <main className="min-h-screen flex flex-col max-h-screen">
      <Header />
      <div className="h-20" /> {/* отступ под фиксированную шапку */}

      <section style={{ maxHeight: '80vh' }} className="flex-1 flex flex-col items-center w-full">
        <p className={connected ? 'text-green-600' : 'text-red-600'}>
          {connected ? 'Connected' : 'Disconnected'}
        </p>

        <div className="flex flex-col w-full max-w-2xl flex-1 border rounded p-2 bg-white min-h-0">
          <ul
            ref={messagesEndRef}
            className="flex-1 overflow-y-auto"
          >
            {/* Все сообщения с сервера */}
            {messages.map((m, i) => (
              <li
                key={m.id || i}
                className={`border-b py-1 ${m.author === user ? 'text-right font-bold' : ''}`}
              >
                {m.author}: {m.text}
              </li>
            ))}
            {/* Ваши неотмодерированные сообщения — теперь внизу */}
            {pendingMessages.map((m) => (
              <li key={m.id} className="border-b py-1 text-right text-gray-400 italic">
                {user}: {m.text} <span className="text-xs">(отправлено...)</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 w-full max-w-2xl mt-4 px-16">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend()
              }
            }}
            className="border px-2 py-1 flex-1"
            placeholder="Enter message"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded">
            Send
          </button>
        </div>

        <div className="h-10" /> {/* отступ снизу */}
      </section>
    </main>
  );
}
