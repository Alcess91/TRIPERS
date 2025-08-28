import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import postgres from 'postgres'

const JWT_SECRET = process.env.JWT_SECRET!

// Configuration de la base de données
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require'
})

function isProfileComplete(user: any): boolean {
  return !!(user.first_name && user.last_name && user.country && user.languages?.length > 0)
}

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 /api/auth/me - Debug cookies:")
    const allCookies = request.cookies.getAll()
    console.log("📋 Tous les cookies:", allCookies)
    
    // Essayer d'abord le cookie
    let token = request.cookies.get("auth-token")?.value
    console.log("🎫 Token cookie:", token ? `${token.substring(0, 20)}...` : "AUCUN")
    
    // Si pas de cookie, essayer l'Authorization header
    if (!token) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
        console.log("🎫 Token Authorization header:", token ? `${token.substring(0, 20)}...` : "AUCUN")
      }
    }

    if (!token) {
      console.log("❌ Pas de token, retour 401")
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
      console.log("✅ Token décodé:", { userId: decoded.userId, email: decoded.email })
    } catch (error) {
      console.log("❌ Token invalide:", (error as Error).message)
      const response = NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
      
      // Supprimer le cookie invalide
      response.cookies.set("auth-token", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
      })
      
      return response
    }

    // Récupérer l'utilisateur depuis la DB
    const users = await sql`
      SELECT id, email, name, role, first_name, last_name, hobbies, country, languages, created_at
      FROM users WHERE id = ${decoded.userId}
    `

    if (users.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      )
    }

    const user = users[0]
    const profileComplete = isProfileComplete(user)

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      hobbies: user.hobbies,
      country: user.country,
      languages: user.languages,
      created_at: user.created_at,
      profileComplete,
    })
  } catch (error) {
    console.error("Me error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const userId = decoded.userId

    // Récupérer les données du corps de la requête
    const { first_name, last_name, country, languages, hobbies } = await request.json()

    // Mettre à jour le profil utilisateur
    const result = await sql`
      UPDATE users 
      SET 
        first_name = ${first_name},
        last_name = ${last_name},
        country = ${country},
        languages = ${languages},
        hobbies = ${hobbies}
      WHERE id = ${userId}
      RETURNING id, email, name, role, first_name, last_name, hobbies, country, languages, created_at
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const user = result[0]
    const profileComplete = isProfileComplete(user)

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      hobbies: user.hobbies,
      country: user.country,
      languages: user.languages,
      created_at: user.created_at,
      profileComplete,
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
