import { Pool } from 'pg'

// Создаём пул подключений к PostgreSQL
export const pool = new Pool({
  user: process.env.POSTGRES_USER || 'myuser',
  host: process.env.POSTGRES_HOST || 'bd',
  database: process.env.POSTGRES_DB || 'mydb',
  password: process.env.POSTGRES_PASSWORD || 'mypass',
  port: Number(process.env.POSTGRES_PORT) || 5432,
})
