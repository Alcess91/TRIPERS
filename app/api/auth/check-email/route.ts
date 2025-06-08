import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requis" }, { status: 400 })
    }

    // Normaliser l'email
    const cleanEmail = email.trim().toLowerCase()

    try {
      // Vérifier si l'email existe
      const existingUser = await sql`
        SELECT id FROM users 
        WHERE LOWER(TRIM(email)) = ${cleanEmail}
        LIMIT 1
      `

      return NextResponse.json({
        exists: existingUser.length > 0,
      })
    } catch (dbError) {
      console.error("Database error during email check:", dbError)
      // En cas d'erreur DB, on assume que l'email n'existe pas pour ne pas bloquer l'inscription
      return NextResponse.json({
        exists: false,
      })
    }
  } catch (error) {
    console.error("Email check error:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification" }, { status: 500 })
  }
}
