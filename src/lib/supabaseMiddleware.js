import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function getUser(request) {
  const response = NextResponse.next()
  const supabase = createServerClient({ req: request, res: response })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { user, response }
}