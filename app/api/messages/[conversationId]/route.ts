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

export async function GET(request: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const messages = await sql`
      SELECT 
        m.*,
        u.name as sender_name,
        u.avatar_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.conversation_id = ${params.conversationId}
      ORDER BY m.created_at ASC
    `

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await request.json()

    const result = await sql`
      INSERT INTO messages (conversation_id, sender_id, content)
      VALUES (${params.conversationId}, ${currentUser.userId}, ${content})
      RETURNING *
    `

    // Mettre à jour le timestamp de la conversation
    await sql`
      UPDATE conversations 
      SET last_message_at = CURRENT_TIMESTAMP
      WHERE id = ${params.conversationId}
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
