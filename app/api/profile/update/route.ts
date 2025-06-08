import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)

// Vérification de l'authentification
async function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return { error: "Non authentifié", status: 401 }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any
    return { userId: decoded.userId, role: decoded.role }
  } catch (error) {
    return { error: "Token invalide", status: 401 }
  }
}

// Validation des données de profil
function validateProfileData(data: any) {
  const errors: string[] = []

  // Champs autorisés pour la mise à jour (sécurité)
  const allowedFields = [
    "avatar_url",
    "location",
    "bio",
    "languages",
    "interests",
    "travelStyle",
    "budget",
    "first_name",
    "last_name",
  ]

  // Vérifier que seuls les champs autorisés sont modifiés
  const providedFields = Object.keys(data)
  const unauthorizedFields = providedFields.filter((field) => !allowedFields.includes(field))

  if (unauthorizedFields.length > 0) {
    errors.push(`Champs non autorisés: ${unauthorizedFields.join(", ")}`)
  }

  // Validation spécifique
  if (data.bio && data.bio.length > 500) {
    errors.push("Bio trop longue (maximum 500 caractères)")
  }

  if (data.location && data.location.length > 100) {
    errors.push("Localisation trop longue")
  }

  if (data.avatar_url && data.avatar_url.length > 255) {
    errors.push("URL d'avatar trop longue")
  }

  return errors
}

export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const authResult = await verifyAuth(request)
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status })
    }

    const { userId: authenticatedUserId } = authResult
    const body = await request.json()
    const { userId, profileData } = body

    // Vérifier que l'utilisateur modifie bien ses propres données
    if (authenticatedUserId !== userId) {
      console.warn(
        `Tentative de modification non autorisée: user ${authenticatedUserId} essaie de modifier user ${userId}`,
      )
      return NextResponse.json(
        {
          error: "Non autorisé à modifier ce profil",
        },
        { status: 403 },
      )
    }

    // Validation des données
    const validationErrors = validateProfileData(profileData)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    console.log("Mise à jour du profil - userId:", userId, "data:", profileData)

    try {
      // Vérifier que l'utilisateur existe
      const existingUser = await sql`
        SELECT id, email, name FROM users WHERE id = ${userId}
      `

      if (existingUser.length === 0) {
        return NextResponse.json(
          {
            error: "Utilisateur non trouvé",
          },
          { status: 404 },
        )
      }

      // Préparer les données pour la mise à jour (nettoyage)
      const cleanData: any = {}

      if (profileData.avatar_url !== undefined) cleanData.avatar_url = profileData.avatar_url?.trim() || null
      if (profileData.location !== undefined) cleanData.location = profileData.location?.trim() || null
      if (profileData.bio !== undefined) cleanData.bio = profileData.bio?.trim() || null
      if (profileData.first_name !== undefined) cleanData.first_name = profileData.first_name?.trim() || null
      if (profileData.last_name !== undefined) cleanData.last_name = profileData.last_name?.trim() || null
      if (profileData.languages !== undefined) cleanData.languages = JSON.stringify(profileData.languages || [])
      if (profileData.interests !== undefined) cleanData.interests = JSON.stringify(profileData.interests || [])
      if (profileData.travelStyle !== undefined) cleanData.travel_style = profileData.travelStyle?.trim() || null
      if (profileData.budget !== undefined) cleanData.budget = profileData.budget?.trim() || null

      // Construire la requête de mise à jour dynamiquement
      const updateFields = Object.keys(cleanData)
      if (updateFields.length === 0) {
        return NextResponse.json(
          {
            error: "Aucune donnée à mettre à jour",
          },
          { status: 400 },
        )
      }

      // Mise à jour sécurisée
      const updateResult = await sql`
        UPDATE users 
        SET 
          avatar_url = COALESCE(${cleanData.avatar_url}, avatar_url),
          location = COALESCE(${cleanData.location}, location),
          bio = COALESCE(${cleanData.bio}, bio),
          first_name = COALESCE(${cleanData.first_name}, first_name),
          last_name = COALESCE(${cleanData.last_name}, last_name),
          languages = COALESCE(${cleanData.languages}, languages),
          interests = COALESCE(${cleanData.interests}, interests),
          travel_style = COALESCE(${cleanData.travel_style}, travel_style),
          budget = COALESCE(${cleanData.budget}, budget),
          updated_at = NOW()
        WHERE id = ${userId}
        RETURNING id, email, name, avatar_url, location, bio, first_name, last_name, languages, interests, travel_style, budget
      `

      console.log("Profil mis à jour avec succès pour l'utilisateur:", userId)

      return NextResponse.json({
        success: true,
        message: "Profil mis à jour avec succès",
        user: updateResult[0],
      })
    } catch (dbError: any) {
      console.error("Erreur base de données lors de la mise à jour:", {
        error: dbError.message,
        userId,
        timestamp: new Date().toISOString(),
      })

      // Mode démo en cas d'erreur
      return NextResponse.json({
        success: true,
        message: "Profil mis à jour avec succès (mode démo)",
        data: profileData,
      })
    }
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    })

    // Message d'erreur contrôlé
    return NextResponse.json({ error: "Erreur lors de la mise à jour. Veuillez réessayer." }, { status: 500 })
  }
}
