import { cookies } from "next/headers"
import { verifyStackToken } from "./stackauth"
import { getUserByEmail, User } from "./auth"

export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get("stack-token")?.value
  if (!token) return null
  const payload = await verifyStackToken(token)
  if (!payload?.email) return null
  return await getUserByEmail(payload.email)
}
