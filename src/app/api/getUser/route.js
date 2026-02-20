import { createServerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(req) {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { req, res: {} }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ user: null, role: null }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    return new Response(JSON.stringify({ user, role: profile?.role || null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error in /api/getUser:', err)
    return new Response(JSON.stringify({ user: null, role: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
