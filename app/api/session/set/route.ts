import { NextResponse } from "next/server"
import { verifyStackToken } from "@/lib/stackauth"
import { syncUserFromAuth } from "@/lib/auth"

export async function POST(req: Request) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 })

  const payload = await verifyStackToken(token)
  if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

  // Crée/retourne l'utilisateur dans ta DB
  const { user, isNewUser } = await syncUserFromAuth(payload)

  const res = NextResponse.json({ ok: true, isNewUser, user })
  res.cookies.set("stack-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  })
  return res
}
