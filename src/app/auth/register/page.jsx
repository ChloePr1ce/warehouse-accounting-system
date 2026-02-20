'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CyberpunkBackground from '@/components/CyberpunkBackground'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert('Ошибка регистрации: ' + error.message)
      setLoading(false)
      return
    }

    const user = data.user

    if (!user) {
      alert('Не удалось создать пользователя')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: user.id, email: user.email, role: 'user' }])

    if (insertError) {
      alert('Ошибка при создании записи в users: ' + insertError.message)
    } else {
      alert('Регистрация успешна!')
    }

    router.push('/auth/login') 

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

    {/* Форма регистрации */}
    <div className="relative z-10 w-96 p-10 bg-black/70 border border-[#51bddb] rounded-xl flex flex-col gap-6 shadow-lg">
      <h1 className="text-3xl font-bold text-[#51bddb] text-center mb-4">Регистрация</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-md bg-black border border-[#51bddb] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-md bg-black border border-[#51bddb] text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="mt-2 bg-[#51bddb] hover:bg-yellow-400 text-black font-bold py-2 rounded-md transition-colors duration-300"
      >
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>

      <div className="text-[#51bddb] text-center mt-4 text-sm">
        Уже есть аккаунт?{' '}
        <span
          className="text-yellow-400 hover:underline cursor-pointer"
          onClick={() => router.push('/auth/login')}
        >
          Войти
        </span>
      </div>
    </div>
  </div>
 )
}