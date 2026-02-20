'use client'

import { useRouter } from 'next/navigation'
import CyberpunkBackground from '@/components/CyberpunkBackground'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      <CyberpunkBackground />
      {/* Главная панель */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Заголовок */}
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_12px_rgba(255,255,0,0.8)] mb-8">
          Spider
        </h1>
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_12px_rgba(255,255,0,0.8)] mb-8">
          Warehouse Control
        </h1>

        {/* Подзаголовок */}
        <p className="text-[#51bddb] text-lg mb-12">
          Удобный инструмент для учёта и управления складскими помещениями
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => router.push('/auth/login')}
            className="px-8 py-4 bg-[#51bddb]/20 border border-[#51bddb] text-[#51bddb] rounded-lg hover:bg-[#51bddb]/40 hover:text-black transition-all duration-300 font-bold shadow-neon"
          >
            Войти
          </button>

          <button
            onClick={() => router.push('/auth/register')}
            className="px-8 py-4 bg-yellow-400/20 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400/40 hover:text-black transition-all duration-300 font-bold shadow-neon"
          >
            Регистрация
          </button>
          

        </div>
      </div>
    </div>
  )
}