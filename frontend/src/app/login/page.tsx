'use client'

import { useState } from 'react'
import { useLoginMutation } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { setUser } from '@/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()

  const user = useAppSelector((state) => state.user.value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login({ username, password }).unwrap()
      Cookies.set('token', result.token) // Сохраняем токен в cookies
      dispatch(setUser(result.user.username)) // Сохраняем пользователя в Redux
      router.replace('/') // Возврат на главную
    } catch (err) {
      // обработка ошибки
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Вход</h1>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
        {error && (
          <div className="text-red-500 text-sm text-center">
            Неверное имя пользователя или пароль
          </div>
        )}
      </form>
    </div>
  )
}