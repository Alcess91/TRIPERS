import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import postgres from 'postgres'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

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
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cet email' },
        { status: 409 }
      )
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Créer l'utilisateur
    const result = await sql`
      INSERT INTO users (email, password_hash, role, created_at)
      VALUES (${email}, ${hashedPassword}, 'user', NOW())
      RETURNING id, email, role, created_at
    `

    const user = result[0]

    // Créer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Créer la réponse avec cookie
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
      profileComplete: false, // Nouveau compte = profil incomplet
      message: 'Compte créé avec succès'
    })

    // Définir le cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
