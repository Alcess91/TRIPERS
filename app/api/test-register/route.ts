import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Test register received:", body)

    return NextResponse.json({
      success: true,
      message: "Test endpoint working",
      receivedData: body,
    })
  } catch (error) {
    console.error("Test register error:", error)
    return NextResponse.json({ error: "Test failed" }, { status: 500 })
  }
}
