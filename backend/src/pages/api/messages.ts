import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Вернуть список сообщений (заглушка)
    res.status(200).json(['Привет!', 'Как дела?'])
  } else {
    res.status(405).end()
  }
}