import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import postgres from 'postgres'

const JWT_SECRET = process.env.JWT_SECRET!

// Configuration de la base de données
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require'
})

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Chercher utilisateur
    const users = await sql`
      SELECT id, email, password_hash, name, role, avatar_url, first_name, last_name, hobbies, country, languages, created_at
      FROM users WHERE email = ${email.toLowerCase()}
    `

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const user = users[0]

    // Vérifier password
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Créer JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    // Créer response avec le token dans le body aussi
    const response = NextResponse.json({
      success: true,
      token: token, // Ajouter le token dans la réponse
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar_url: user.avatar_url,
        first_name: user.first_name,
        last_name: user.last_name,
        hobbies: user.hobbies,
        country: user.country,
        languages: user.languages,
        created_at: user.created_at,
        profileComplete: !!(user.first_name && user.last_name && user.country && user.languages?.length > 0),
      },
    })

    // Set cookie
    const cookieConfig = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: false, // Forcer false en développement
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    }
    
    response.cookies.set("auth-token", token, cookieConfig)

    console.log("🍪 Cookie défini pour utilisateur:", user.email)
    console.log("🎫 Token généré:", token.substring(0, 20) + "...")
    console.log("🔒 Cookie config:", cookieConfig)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
