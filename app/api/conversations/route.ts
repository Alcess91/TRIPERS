import { NextResponse } from "next/server"
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

    const conversations = await sql`
      SELECT 
        c.*,
        CASE 
          WHEN c.user1_id = ${currentUser.userId} THEN u2.name
          ELSE u1.name
        END as other_user_name,
        CASE 
          WHEN c.user1_id = ${currentUser.userId} THEN u2.avatar_url
          ELSE u1.avatar_url
        END as other_user_avatar,
        CASE 
          WHEN c.user1_id = ${currentUser.userId} THEN c.user2_id
          ELSE c.user1_id
        END as other_user_id,
        m.content as last_message,
        m.created_at as last_message_time,
        (
          SELECT COUNT(*)
          FROM messages m2
          WHERE m2.conversation_id = c.id
          AND m2.sender_id != ${currentUser.userId}
          AND m2.created_at > COALESCE(
            (SELECT last_read_at FROM conversation_reads 
             WHERE conversation_id = c.id AND user_id = ${currentUser.userId}),
            '1970-01-01'::timestamp
          )
        ) as unread_count
      FROM conversations c
      JOIN users u1 ON c.user1_id = u1.id
      JOIN users u2 ON c.user2_id = u2.id
      LEFT JOIN messages m ON m.id = (
        SELECT id FROM messages 
        WHERE conversation_id = c.id 
        ORDER BY created_at DESC 
        LIMIT 1
      )
      WHERE c.user1_id = ${currentUser.userId} OR c.user2_id = ${currentUser.userId}
      ORDER BY c.last_message_at DESC
    `

    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}
