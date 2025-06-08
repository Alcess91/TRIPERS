import { neon } from "@neondatabase/serverless"

// Vérifier que la variable d'environnement existe
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Créer la connexion SQL
export const sql = neon(process.env.DATABASE_URL)

// Fonction de test de connexion
export async function testConnection() {
  try {
    const result = await sql`SELECT 1 as test`
    console.log("Database connection successful:", result)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
