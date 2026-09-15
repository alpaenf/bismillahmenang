import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Admin client khusus server-side dengan Service Role Key (Bypass RLS)
// JANGAN PERNAH di-import dari Client Component (browser)!
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase URL atau Service Role Key belum dikonfigurasi di environment variable.')
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
