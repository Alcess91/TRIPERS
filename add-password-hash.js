require('dotenv').config({ path: '.env.local' })

const postgres = require('postgres')

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
})

async function addPasswordHash() {
  try {
    console.log('🔧 Ajout de la colonne password_hash...')
    
    await sql`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
    `
    
    console.log('✅ Colonne password_hash ajoutée!')
    
    // Vérifier les colonnes finales
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `
    
    console.log('📋 Colonnes finales:')
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await sql.end()
  }
}

addPasswordHash()
