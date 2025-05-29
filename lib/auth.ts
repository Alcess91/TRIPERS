import { sql } from "./db"

export interface User {
  id: number
  email: string
  name: string
  avatar_url?: string
  role: "user" | "admin" | "guide"
  created_at: string
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "user" | "admin" | "guide" = "user",
): Promise<User> {
  // Hash simple pour Next.js (pas de bcrypt)
  const hashedPassword = btoa(password + "salt_tripers_2024")

  const result = await sql`
    INSERT INTO users (email, password_hash, name, role)
    VALUES (${email}, ${hashedPassword}, ${name}, ${role})
    RETURNING id, email, name, avatar_url, role, created_at
  `

  return result[0] as User
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const result = await sql`
    SELECT id, email, password_hash, name, avatar_url, role, created_at
    FROM users
    WHERE email = ${email}
  `

  if (result.length === 0) return null

  const user = result[0]
  const hashedPassword = btoa(password + "salt_tripers_2024")

  if (hashedPassword !== user.password_hash) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar_url: user.avatar_url,
    role: user.role,
    created_at: user.created_at,
  }
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await sql`
    SELECT id, email, name, avatar_url, role, created_at
    FROM users
    WHERE id = ${id}
  `

  return result.length > 0 ? (result[0] as User) : null
}
