require('dotenv').config({ path: '.env.local' })

const postgres = require('postgres')

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
})

async function checkAndMigrate() {
  try {
    console.log('🔍 Vérification de la structure de la table users...')
    
    // Vérifier la structure actuelle
    const columns = await sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `
    
    console.log('📋 Colonnes actuelles:')
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable})`)
    })
    
    // Vérifier si password_hash existe
    const hasPasswordHash = columns.some(col => col.column_name === 'password_hash')
    
    if (!hasPasswordHash) {
      console.log('❌ Colonne password_hash manquante!')
      console.log('🔧 Exécution de la migration...')
      
      // Lire le fichier de migration
      const fs = require('fs')
      const migrationSQL = fs.readFileSync('./database/migration.sql', 'utf8')
      
      // Exécuter la migration
      await sql.unsafe(migrationSQL)
      console.log('✅ Migration exécutée avec succès!')
      
      // Vérifier à nouveau
      const newColumns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users'
        ORDER BY ordinal_position
      `
      
      console.log('📋 Nouvelles colonnes:')
      newColumns.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type}`)
      })
    } else {
      console.log('✅ La table users a la bonne structure!')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await sql.end()
  }
}

checkAndMigrate()
