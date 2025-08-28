import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { cookies } from "next/headers"

function getCurrentUser() {
  const token = cookies().get("auth-token")?.value
  if (!token) return null

  try {
    const decoded = JSON.parse(atob(token))

    // Vérifier que le token n'est pas trop ancien
    const tokenAge = Date.now() - decoded.timestamp
    const maxAge = 7 * 24 * 60 * 60 * 1000

    if (tokenAge > maxAge) return null

    return decoded
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const requests = await sql`
      SELECT 
        cr.*,
        u.name as from_user_name,
        u.avatar_url as from_user_avatar,
        u.email as from_user_email,
        t.location as from_user_location
      FROM connection_requests cr
      JOIN users u ON cr.from_user_id = u.id
      LEFT JOIN tripers t ON u.id = t.user_id
      WHERE cr.to_user_id = ${currentUser.userId}
      AND cr.status = 'pending'
      ORDER BY cr.created_at DESC
    `

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching connection requests:", error)
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { to_user_id, message } = await request.json()

    const result = await sql`
      INSERT INTO connection_requests (from_user_id, to_user_id, message)
      VALUES (${currentUser.userId}, ${to_user_id}, ${message})
      RETURNING *
    `

    // Créer une notification
    await sql`
      INSERT INTO activities (user_id, type, title, description, related_user_id)
      VALUES (
        ${to_user_id}, 
        'connection_request', 
        'Nouvelle demande de connexion',
        'Vous avez reçu une nouvelle demande de connexion',
        ${currentUser.userId}
      )
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating connection request:", error)
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}
