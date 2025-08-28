// Script pour ajouter la colonne avatar_url manquante
require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

async function addAvatarUrlColumn() {
  try {
    console.log('🔧 Adding avatar_url column to users table...\n');

    // Vérifier si la colonne existe déjà
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'avatar_url'
    `;

    if (columns.length > 0) {
      console.log('✅ Column avatar_url already exists');
    } else {
      console.log('➕ Adding avatar_url column...');
      
      await sql`
        ALTER TABLE users ADD COLUMN avatar_url TEXT NULL
      `;
      
      console.log('✅ Column avatar_url added successfully!');
    }

    // Vérification finale
    console.log('\n🔍 Final verification...');
    const finalColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY column_name
    `;

    console.log('📋 All columns in users table:');
    finalColumns.forEach(col => console.log(`  - ${col.column_name}`));

    console.log('\n🎉 Database is now ready for login functionality!');

  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await sql.end();
  }
}

addAvatarUrlColumn();
