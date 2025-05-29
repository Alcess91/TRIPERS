import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getUserById } from "@/lib/auth"

export async function GET() {
  try {
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 })
    }

    // Décoder le token simple
    const decoded = JSON.parse(atob(token))

    // Vérifier que le token n'est pas trop ancien (7 jours)
    const tokenAge = Date.now() - decoded.timestamp
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 jours en millisecondes

    if (tokenAge > maxAge) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 })
    }

    const user = await getUserById(decoded.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
