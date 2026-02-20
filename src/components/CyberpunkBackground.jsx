'use client'

import { useState, useEffect } from 'react'

export default function CyberpunkBackground() {
  const [circles, setCircles] = useState([])

  useEffect(() => {
    // Генерация кружков только на клиенте
    const generated = [...Array(40)].map(() => ({
      width: 2 + Math.random() * 4,
      height: 2 + Math.random() * 4,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: 0.2 + Math.random() * 0.5,
    }))
    setCircles(generated)
  }, [])

  return (
    <div>
      {/* Динамическая мерцающая сетка */}
      <div className="absolute inset-0 pointer-events-none">
        {circles.map((c, i) => (
          <div
            key={i}
            className="absolute bg-[#51bddb] rounded-full animate-pulse"
            style={{
              width: `${c.width}px`,
              height: `${c.height}px`,
              top: c.top,
              left: c.left,
              opacity: c.opacity,
            }}
          />
        ))}
      </div>

      {/* HUD/анимированные символы */}
      <div className="absolute top-0 right-0 h-full flex flex-col justify-around items-end text-[#51bddb] text-xs font-mono opacity-50 animate-pulse">
        {['██▓▒░', '▒░▓█', '▓▒░█', '░█▒▓'].map((c, i) => (
          <span key={i} className="leading-none">{c.repeat(10)}</span>
        ))}
      </div>

      {/* Линия */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-1/4 h-0.5 bg-[#51bddb] opacity-50 animate-pulse" />
      </div>
    </div>
  )
}