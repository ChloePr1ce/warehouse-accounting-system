import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase' // если у тебя есть типы

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)