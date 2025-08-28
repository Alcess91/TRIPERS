import postgres from "postgres"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required")
}

export const sql = postgres(process.env.DATABASE_URL, {
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
})
