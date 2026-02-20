'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import CyberpunkBackground from '@/components/CyberpunkBackground'

// Клиент Supabase для фронта
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Киберпанк фон */}
      <CyberpunkBackground />

      {/* Название проекта */}
      <div className="relative z-10 flex flex-col items-center mb-10">
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_12px_rgba(255,255,0,0,8)] mb-2">
          Spider
        </h1>
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_12px_rgba(255,255,0,0.8)]">
          Warehouse Control
        </h1>
      </div>

      

      <div className="relative z-10 w-96 p-10 bg-black/70 border border-[#51bddb] rounded-xl flex flex-col gap-6 shadow-lg">
        <h1 className="text-3xl font-bold text-[#51bddb] text-center mb-4">Вход</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 rounded-md bg-black border border-[#51bddb] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="px-4 py-2 rounded-md bg-black border border-[#51bddb] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-2 bg-[#51bddb] hover:bg-yellow-400 text-black font-bold py-2 rounded-md transition-colors duration-300"
        >
          {loading ? 'Logging in...' : 'Войти'}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-[#51bddb] text-sm text-center mt-2">
          Нет аккаунта?{' '}
          <span
            className="text-yellow-400 cursor-pointer hover:underline"
            onClick={() => router.push('/auth/register')}
          >
            Зарегистрироваться
          </span>
        </p>
      </div>
    </div>
  )
}