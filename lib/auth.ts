import { sql } from "./db"
import { AuthPayload } from "./stackauth"

export interface User {
  id: number
  email: string
  name: string
  avatar_url?: string
  role: "user" | "admin" | "guide"
  created_at: string
}

export interface AuthSyncResult {
  user: User
  isNewUser: boolean
}

/**
 * Synchronise un utilisateur issu de Neon Auth (Stack Auth) avec ta DB.
 * - Si email existe -> retourne l'user existant
 * - Sinon -> crée un user (role: user)
 * Retourne aussi si c'est un nouvel utilisateur
 */
export async function syncUserFromAuth(payload: AuthPayload): Promise<AuthSyncResult> {
  const email = payload.email || ""
  const name = payload.name || (email ? email.split("@")[0] : "user")

  const existing = await sql<User[]>`
    SELECT id, email, name, avatar_url, role, created_at
    FROM users WHERE email = ${email}
  `
  if (existing.length > 0) {
    return { user: existing[0], isNewUser: false }
  }

  const inserted = await sql<User[]>`
    INSERT INTO users (email, name, avatar_url, role)
    VALUES (${email}, ${name}, ${payload.picture || null}, 'user')
    RETURNING id, email, name, avatar_url, role, created_at
  `
  return { user: inserted[0], isNewUser: true }
}

/** helper simple */
export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await sql<User[]>`
    SELECT id, email, name, avatar_url, role, created_at
    FROM users WHERE email = ${email}
  `
  return rows[0] || null
}
