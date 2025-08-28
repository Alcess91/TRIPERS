require('dotenv').config({ path: '.env.local' })

const postgres = require('postgres')

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
})

async function fixNameColumn() {
  try {
    console.log('🔧 Correction de la colonne name...')
    
    // Rendre la colonne name nullable
    await sql`
      ALTER TABLE users ALTER COLUMN name DROP NOT NULL;
    `
    
    console.log('✅ Colonne name rendue nullable!')
    
    // Vérifier les contraintes
    const constraints = await sql`
      SELECT column_name, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `
    
    console.log('📋 Contraintes des colonnes:')
    constraints.forEach(col => {
      console.log(`  - ${col.column_name}: nullable=${col.is_nullable}`)
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await sql.end()
  }
}

fixNameColumn()
