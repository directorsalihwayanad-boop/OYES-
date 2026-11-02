import { createClient } from '@supabase/supabase-js'

// The publishable (anon) key is designed to be public; access is enforced by RLS policies.
// Env vars override these defaults when set (e.g. for a staging project).
const url = import.meta.env.VITE_SUPABASE_URL || 'https://gnxmiqmfwrwnivlkvspy.supabase.co'
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ST5zYe5tRD2QTu6adwmpCQ_xheB9oc1'

export const isConfigured = Boolean(url && key)
export const supabase = isConfigured ? createClient(url, key) : null
