import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    const tripers = await sql`
      SELECT 
        t.*,
        u.name,
        u.avatar_url,
        u.email
      FROM tripers t
      JOIN users u ON t.user_id = u.id
      WHERE t.status = 'approved'
      AND (
        u.name ILIKE ${"%" + search + "%"} OR
        t.location ILIKE ${"%" + search + "%"} OR
        EXISTS (
          SELECT 1 FROM unnest(t.specialties) AS specialty
          WHERE specialty ILIKE ${"%" + search + "%"}
        )
      )
      ORDER BY t.rating DESC, t.review_count DESC
    `

    return NextResponse.json(tripers)
  } catch (error) {
    console.error("Error fetching tripers:", error)
    return NextResponse.json({ error: "Failed to fetch tripers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await sql`
      INSERT INTO tripers (
        user_id, location, latitude, longitude, bio, languages, 
        specialties, response_time, certifications, cover_image_url
      )
      VALUES (
        ${data.user_id}, ${data.location}, ${data.latitude}, ${data.longitude},
        ${data.bio}, ${data.languages}, ${data.specialties}, ${data.response_time},
        ${data.certifications}, ${data.cover_image_url}
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating triper:", error)
    return NextResponse.json({ error: "Failed to create triper profile" }, { status: 500 })
  }
}
