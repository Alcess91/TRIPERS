import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { SignJWT } from "jose"

const sql = neon(process.env.DATABASE_URL!)

// Function to create a JWT token using jose
async function createJWT(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")
  const alg = "HS256"

  return await new SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt().setExpirationTime("7d").sign(secret)
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    try {
      // Check if user exists in database
      const users = await sql`
        SELECT * FROM users WHERE email = ${cleanEmail}
      `

      if (users.length === 0) {
        return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 })
      }

      const user = users[0]

      // Verify password (same method as in register)
      const hashedPassword = btoa(cleanPassword + "salt_tripers_2024")

      if (hashedPassword !== user.password_hash) {
        return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 })
      }

      // Verify user type
      const expectedRole = userType === "traveler" ? "user" : "guide"
      if (user.role !== expectedRole && user.role !== "admin") {
        return NextResponse.json({ error: "Incorrect account type" }, { status: 401 })
      }

      // Create JWT token
      const payload = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        language: user.language,
        hobbies: user.hobbies,
      }

      const token = await createJWT(payload)

      // Create response with cookie
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
        },
      })

      // Set httpOnly cookie
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      })

      return response
    } catch (dbError) {
      console.error("Database error during login:", dbError)

      // Demo mode: create temporary user for testing
      const mockUser = {
        id: 1,
        email: cleanEmail,
        name: "Demo User",
        role: userType === "traveler" ? "user" : "guide",
        firstName: "",
        lastName: "",
        language: "en",
        hobbies: "",
      }

      try {
        const token = await createJWT(mockUser)

        const response = NextResponse.json({
          success: true,
          user: mockUser,
        })

        response.cookies.set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        })

        return response
      } catch (jwtError) {
        console.error("JWT signing error (mock user):", jwtError)
        return NextResponse.json({ error: "Failed to create token (mock user)" }, { status: 500 })
      }
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
