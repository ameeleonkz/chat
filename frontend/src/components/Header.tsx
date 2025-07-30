'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'

export default function Header() {
  const user = useAppSelector((state) => state.user.value)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 px-8 flex justify-between items-center shadow mb-8">
      <span>
        <Link
          href="/"
          className={`underline transition hover:text-yellow-300 ${pathname === '/' ? 'font-bold text-yellow-300' : ''}`}
        >
          На главную
        </Link>
      </span>
      <span className="flex items-center gap-6">
        <Link
          href="/counter"
          className={`underline transition hover:text-yellow-300 ${pathname === '/counter' ? 'font-bold text-yellow-300' : ''}`}
        >
          Счётчик
        </Link>
        <span>
          Пользователь: <span className="font-mono">{user}</span>
        </span>
      </span>
    </header>
  )
}