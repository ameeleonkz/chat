'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { increment, decrement } from '@/features/counter/counterSlice'
import Header from '@/components/Header'

export default function CounterPage() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Header />
      <section className="flex flex-col items-center gap-4 mt-8">
        <h1 className="text-3xl font-bold">Count: {count}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            -
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            +
          </button>
        </div>
      </section>
    </div>
  )
}