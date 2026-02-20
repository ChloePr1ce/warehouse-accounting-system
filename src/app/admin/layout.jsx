import { redirect } from 'next/navigation'
import { cookies as nextCookies } from 'next/headers'
import { createServerClient } from '@supabase/auth-helpers-nextjs'

export default async function AdminLayout({ children }) {
  const cookieStore = nextCookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => {
          const cookie = cookieStore.get(name)
          return cookie ? cookie.value : undefined
        },
        set: (name, value, options) => cookieStore.set(name, value, options),
        remove: (name, options) => cookieStore.delete(name, options),
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.role !== 'admin') {
    redirect('/auth/login')
  }

  return <>{children}</>
}
