import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = "user" } = await request.json()

    const user = await createUser(email, password, name, role)

    // Créer un token simple pour Next.js (pas de JWT dans ce contexte)
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        timestamp: Date.now(),
      }),
    )

    // Définir le cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 jours
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Email already exists or invalid data" }, { status: 400 })
  }
}
