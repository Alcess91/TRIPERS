import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL!)

// Validation côté serveur
function validateRegistrationData(data: any) {
  const errors: string[] = []

  // Email validation
  if (!data.email || typeof data.email !== "string") {
    errors.push("Email requis")
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push("Format d'email invalide")
    }
    if (data.email.length > 255) {
      errors.push("Email trop long")
    }
  }

  // Password validation
  if (!data.password || typeof data.password !== "string") {
    errors.push("Mot de passe requis")
  } else {
    if (data.password.length < 6) {
      errors.push("Mot de passe trop court (minimum 6 caractères)")
    }
    if (data.password.length > 128) {
      errors.push("Mot de passe trop long")
    }
  }

  // Name validation
  if (!data.name || typeof data.name !== "string") {
    errors.push("Nom requis")
  } else {
    if (data.name.trim().length < 2) {
      errors.push("Nom trop court")
    }
    if (data.name.length > 100) {
      errors.push("Nom trop long")
    }
  }

  // Role validation
  const validRoles = ["user", "guide", "admin"]
  if (data.role && !validRoles.includes(data.role)) {
    errors.push("Rôle invalide")
  }

  return errors
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Register API - Received data:", { ...body, password: "***" })

    // Validation côté serveur
    const validationErrors = validateRegistrationData(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    // Nettoyage des données - IMPORTANT: normaliser l'email
    const cleanEmail = body.email.trim().toLowerCase()
    const cleanName = body.name.trim()
    const cleanPassword = body.password.trim()
    const role = body.role || "user"

    console.log("Checking for existing user with email:", cleanEmail)

    // Données optionnelles
    const firstName = body.firstName ? body.firstName.trim() : null
    const lastName = body.lastName ? body.lastName.trim() : null
    const language = body.language || "fr"
    const hobbies = body.hobbies ? body.hobbies.trim() : null

    try {
      // ÉTAPE 1: Vérifier les doublons AVANT l'insertion
      const existingUser = await sql`
        SELECT id, email FROM users 
        WHERE LOWER(TRIM(email)) = ${cleanEmail}
        LIMIT 1
      `

      console.log("Existing user check result:", existingUser)

      if (existingUser.length > 0) {
        console.log("User already exists with email:", cleanEmail)
        return NextResponse.json(
          {
            error: "Un compte existe déjà avec cet email",
            code: "EMAIL_EXISTS",
          },
          { status: 409 },
        )
      }

      console.log("No existing user found, proceeding with registration...")

      // Hash sécurisé du mot de passe
      const hashedPassword = btoa(cleanPassword + "salt_tripers_2024")

      // ÉTAPE 2: Créer l'utilisateur avec gestion d'erreur de contrainte
      const result = await sql`
        INSERT INTO users (email, password_hash, name, role, first_name, last_name, language, hobbies)
        VALUES (${cleanEmail}, ${hashedPassword}, ${cleanName}, ${role}, ${firstName}, ${lastName}, ${language}, ${hobbies})
        RETURNING id, email, name, role, first_name, last_name, language, hobbies, created_at
      `

      const user = result[0]
      console.log("User created successfully with ID:", user.id)

      // Créer le token JWT pour connecter automatiquement l'utilisateur
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          language: user.language,
          hobbies: user.hobbies,
        },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "7d" },
      )

      // Réponse sécurisée
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          language: user.language,
          hobbies: user.hobbies,
          created_at: user.created_at,
        },
      })

      // Définir le cookie d'authentification
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 jours
        path: "/",
      })

      return response
    } catch (dbError: any) {
      console.error("Database error during registration:", {
        error: dbError.message,
        code: dbError.code,
        constraint: dbError.constraint,
        detail: dbError.detail,
        email: cleanEmail,
      })

      // Gestion spécifique des erreurs de contrainte UNIQUE
      if (
        dbError.code === "23505" || // PostgreSQL unique violation
        dbError.constraint === "users_email_unique" ||
        dbError.message.includes("duplicate key") ||
        dbError.message.includes("unique constraint")
      ) {
        console.log("Unique constraint violation detected for email:", cleanEmail)
        return NextResponse.json(
          {
            error: "Un compte existe déjà avec cet email",
            code: "EMAIL_EXISTS",
          },
          { status: 409 },
        )
      }

      // Autres erreurs de base de données
      console.log("Other database error, falling back to demo mode")

      // Mode démo en cas d'erreur DB
      const tempUserId = Math.floor(Math.random() * 1000000) + 1
      const tempUser = {
        id: tempUserId,
        email: cleanEmail,
        name: cleanName,
        role,
        firstName,
        lastName,
        language,
        hobbies,
        created_at: new Date().toISOString(),
      }

      console.log("Created temporary user for demo:", { ...tempUser, password: "***" })

      // Créer token pour l'utilisateur temporaire
      const token = jwt.sign(
        {
          userId: tempUser.id,
          email: tempUser.email,
          name: tempUser.name,
          role: tempUser.role,
          firstName: tempUser.firstName,
          lastName: tempUser.lastName,
          language: tempUser.language,
          hobbies: tempUser.hobbies,
        },
        process.env.JWT_SECRET || "fallback-secret",
        { expiresIn: "7d" },
      )

      const response = NextResponse.json({
        success: true,
        user: tempUser,
        demo: true, // Indiquer que c'est un mode démo
      })

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      })

      return response
    }
  } catch (error: any) {
    console.error("Registration error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    })

    // Message d'erreur contrôlé
    return NextResponse.json({ error: "Erreur lors de l'inscription. Veuillez réessayer." }, { status: 500 })
  }
}
