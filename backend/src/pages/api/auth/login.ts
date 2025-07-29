import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '@/lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Добавляем CORS-заголовки только в development
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' })
  }

  try {
    // Получаем пользователя из базы по username
    const result = await pool.query(
      'SELECT id, username, password_hash FROM users WHERE username = $1',
      [username]
    )
    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const user = result.rows[0]
    // Проверяем пароль
    console.log(password, user.password_hash)
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Генерируем JWT-токен
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      token,
      user: { id: user.id, username: user.username }
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Internal server error' })
  }
}