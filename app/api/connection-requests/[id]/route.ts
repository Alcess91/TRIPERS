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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()

    const result = await sql`
      UPDATE connection_requests 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id} AND to_user_id = ${currentUser.userId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    const request_data = result[0]

    // Si accepté, créer une conversation
    if (status === "accepted") {
      await sql`
        INSERT INTO conversations (user1_id, user2_id)
        VALUES (${request_data.from_user_id}, ${request_data.to_user_id})
        ON CONFLICT (user1_id, user2_id) DO NOTHING
      `

      // Créer une notification
      await sql`
        INSERT INTO activities (user_id, type, title, description, related_user_id)
        VALUES (
          ${request_data.from_user_id}, 
          'connection_accepted', 
          'Demande acceptée',
          'Votre demande de connexion a été acceptée',
          ${currentUser.userId}
        )
      `
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating connection request:", error)
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }
}
