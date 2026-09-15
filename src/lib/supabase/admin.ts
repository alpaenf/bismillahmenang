import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Admin client khusus server-side dengan Service Role Key (Bypass RLS)
// JANGAN PERNAH di-import dari Client Component (browser)!
export function createAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://placeholder.supabase.co'
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'placeholder-service-key'

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
