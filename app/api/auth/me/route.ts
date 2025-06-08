import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

      // Ici, vous pourriez faire une requête à la base de données pour récupérer les données utilisateur
      // Pour l'instant, on retourne les données du token
      const user = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name || "Utilisateur",
        role: decoded.role,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        language: decoded.language,
        hobbies: decoded.hobbies,
      }

      return NextResponse.json({ user })
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError)

      // Token invalide, supprimer le cookie
      const response = NextResponse.json({ error: "Token invalide" }, { status: 401 })
      response.cookies.delete("auth-token")
      return response
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
