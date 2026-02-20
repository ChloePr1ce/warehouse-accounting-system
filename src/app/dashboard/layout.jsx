'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Клиент Supabase для фронта
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Supabase getSession error:', error)
        router.push('/login')
        return
      }

      if (!session) {
        router.push('/login')
      } else {
        setSession(session)
      }

      setLoading(false)
    }

    checkSession()
  }, [router])

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 50 }}>Loading...</div>
  }

  return (
    <div>
      {children}
    </div>
  )
}