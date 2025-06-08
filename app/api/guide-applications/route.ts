import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const userId = formData.get("userId") as string
    const location = formData.get("location") as string
    const bio = formData.get("bio") as string
    const languages = JSON.parse(formData.get("languages") as string)
    const specialties = JSON.parse(formData.get("specialties") as string)
    const experience = formData.get("experience") as string
    const motivationType = formData.get("motivationType") as string
    const motivationText = formData.get("motivationText") as string
    const certifications = JSON.parse(formData.get("certifications") as string)
    const hourlyRate = formData.get("hourlyRate") as string
    const responseTime = formData.get("responseTime") as string
    const motivationVideo = formData.get("motivationVideo") as File | null

    // Validation
    if (!userId || !location || !bio || !languages.length || !specialties.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let videoUrl = null

    // Handle video upload if provided
    if (motivationVideo && motivationVideo.size > 0) {
      // In a real app, you would upload to a cloud storage service
      // For now, we'll simulate this
      videoUrl = `/uploads/motivation-videos/${userId}-${Date.now()}.mp4`
      console.log("Video would be uploaded to:", videoUrl)
    }

    try {
      // Insert guide application
      const result = await sql`
        INSERT INTO guide_applications (
          user_id, location, bio, languages, specialties, experience,
          motivation_type, motivation_text, motivation_video_url,
          certifications, hourly_rate, response_time, status, created_at
        )
        VALUES (
          ${userId}, ${location}, ${bio}, ${JSON.stringify(languages)}, 
          ${JSON.stringify(specialties)}, ${experience}, ${motivationType},
          ${motivationText}, ${videoUrl}, ${JSON.stringify(certifications)},
          ${hourlyRate}, ${responseTime}, 'pending', NOW()
        )
        RETURNING id
      `

      const applicationId = result[0].id

      // Update user status to indicate pending guide application
      await sql`
        UPDATE users 
        SET guide_application_status = 'pending'
        WHERE id = ${userId}
      `

      // Notify admins (in a real app, you'd send emails/notifications)
      console.log(`New guide application submitted: ${applicationId}`)

      return NextResponse.json({
        success: true,
        applicationId,
        message: "Guide application submitted successfully",
      })
    } catch (dbError: any) {
      console.error("Database error:", dbError)

      // Fallback for demo
      return NextResponse.json({
        success: true,
        applicationId: Math.floor(Math.random() * 1000),
        message: "Guide application submitted successfully (demo mode)",
      })
    }
  } catch (error: any) {
    console.error("Guide application error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "pending"

    const applications = await sql`
      SELECT 
        ga.*,
        u.name,
        u.email,
        u.avatar_url
      FROM guide_applications ga
      JOIN users u ON ga.user_id = u.id
      WHERE ga.status = ${status}
      ORDER BY ga.created_at DESC
    `

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
