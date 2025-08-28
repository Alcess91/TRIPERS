import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/currentUser"

export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const uid = currentUser.id

    const conversations = await sql`
      SELECT 
        c.*,
        CASE 
          WHEN c.user1_id = ${uid} THEN u2.name
          ELSE u1.name
        END as other_user_name,
        CASE 
          WHEN c.user1_id = ${uid} THEN u2.avatar_url
          ELSE u1.avatar_url
        END as other_user_avatar,
        CASE 
          WHEN c.user1_id = ${uid} THEN c.user2_id
          ELSE c.user1_id
        END as other_user_id,
        m.content as last_message,
        m.created_at as last_message_time,
        (
          SELECT COUNT(*)
          FROM messages m2
          WHERE m2.conversation_id = c.id
          AND m2.sender_id != ${uid}
          AND m2.created_at > COALESCE(
            (SELECT last_read_at FROM conversation_reads 
             WHERE conversation_id = c.id AND user_id = ${uid}),
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
      WHERE c.user1_id = ${uid} OR c.user2_id = ${uid}
      ORDER BY c.last_message_at DESC NULLS LAST
    `

    return NextResponse.json(conversations)
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}
