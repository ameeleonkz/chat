'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { increment, decrement } from '@/features/counter/counterSlice'
import { useSocketEvents } from '@/lib/useSocket'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const count = useAppSelector((state) => state.counter.value)
  const user = useAppSelector((state) => state.user.value)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { connected, messages, send } = useSocketEvents()
  const [input, setInput] = useState('')

  // Редиректим на /login, если не залогинен
  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [user, router])

  if (!user) {
    return null // Можно добавить спиннер или заглушку
  }

  const handleSend = () => {
    if (input.trim()) {
      send(input)
      setInput('')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <section>
        <h1 className="text-3xl font-bold">Count: {count}</h1>
        <div className="flex gap-2">
          <button onClick={() => dispatch(decrement())}>-</button>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
      </section>
      <section>
        <h1 className="text-xl font-bold">WebSocket Demo</h1>
        <p className={connected ? 'text-green-600' : 'text-red-600'}>
          {connected ? 'Connected' : 'Disconnected'}
        </p>

        <ul className="w-full max-w-md border rounded p-2">
          {messages.map((m, i) => (
            <li key={i} className="border-b py-1">{m}</li>
          ))}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-2 py-1"
            placeholder="Enter message"
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded">
            Send
          </button>
        </div>
      </section>
    </main>
  );
}
