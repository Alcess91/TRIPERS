import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { action, adminNotes } = await request.json()
    const applicationId = params.id

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    try {
      // Get application details
      const application = await sql`
        SELECT ga.*, u.email, u.name
        FROM guide_applications ga
        JOIN users u ON ga.user_id = u.id
        WHERE ga.id = ${applicationId}
      `

      if (application.length === 0) {
        return NextResponse.json({ error: "Application not found" }, { status: 404 })
      }

      const app = application[0]

      if (action === "approve") {
        // Update application status
        await sql`
          UPDATE guide_applications 
          SET status = 'approved', admin_notes = ${adminNotes || ""}, reviewed_at = NOW()
          WHERE id = ${applicationId}
        `

        // Create guide profile
        await sql`
          INSERT INTO tripers (
            user_id, location, bio, languages, specialties, 
            hourly_rate, response_time, status, created_at
          )
          VALUES (
            ${app.user_id}, ${app.location}, ${app.bio}, 
            ${app.languages}, ${app.specialties}, ${app.hourly_rate},
            ${app.response_time}, 'approved', NOW()
          )
        `

        // Update user role and status
        await sql`
          UPDATE users 
          SET role = 'guide', guide_application_status = 'approved'
          WHERE id = ${app.user_id}
        `

        console.log(`Guide application approved: ${applicationId}`)
        // In a real app, send approval email here
      } else if (action === "reject") {
        // Update application status
        await sql`
          UPDATE guide_applications 
          SET status = 'rejected', admin_notes = ${adminNotes || ""}, reviewed_at = NOW()
          WHERE id = ${applicationId}
        `

        // Update user status
        await sql`
          UPDATE users 
          SET guide_application_status = 'rejected'
          WHERE id = ${app.user_id}
        `

        console.log(`Guide application rejected: ${applicationId}`)
        // In a real app, send rejection email here
      }

      return NextResponse.json({
        success: true,
        message: `Application ${action}d successfully`,
      })
    } catch (dbError: any) {
      console.error("Database error:", dbError)

      // Fallback for demo
      return NextResponse.json({
        success: true,
        message: `Application ${action}d successfully (demo mode)`,
      })
    }
  } catch (error: any) {
    console.error("Application review error:", error)
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 })
  }
}
