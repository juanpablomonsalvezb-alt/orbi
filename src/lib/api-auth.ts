import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Verify the auth token from the request and return the user ID.
 * The frontend must send the Supabase access_token in the Authorization header.
 * Returns the user ID if authenticated, null otherwise.
 */
export async function verifyAuth(request: NextRequest): Promise<string | null> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: { user } } = await supabase.auth.getUser(token)
  return user?.id || null
}

/**
 * Verify that the authenticated user owns the given empresa_id.
 * Returns true if the user is the owner, false otherwise.
 */
export async function verifyEmpresaAccess(request: NextRequest, empresaId: string): Promise<boolean> {
  const userId = await verifyAuth(request)
  if (!userId) return false

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('empresas')
    .select('id')
    .eq('id', empresaId)
    .eq('user_id', userId)
    .single()

  return !!data
}

/**
 * Verify auth and return the empresa_id for the authenticated user.
 * Useful for routes that don't receive empresa_id in the request
 * (the empresa is derived from the authenticated user).
 */
export async function getAuthEmpresa(request: NextRequest): Promise<{ userId: string; empresaId: string } | null> {
  const userId = await verifyAuth(request)
  if (!userId) return null

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('empresas')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (!data) return null
  return { userId, empresaId: data.id }
}

/**
 * Verify that a conversacion belongs to the given empresa.
 * Use after verifyEmpresaAccess to also validate conversacion ownership.
 */
export async function verifyConversacionAccess(conversacionId: string, empresaId: string): Promise<boolean> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('conversaciones')
    .select('id')
    .eq('id', conversacionId)
    .eq('empresa_id', empresaId)
    .single()

  return !!data
}
