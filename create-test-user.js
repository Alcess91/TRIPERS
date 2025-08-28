const postgres = require('postgres');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

async function createCompleteUser() {
  try {
    // Supprimer l'utilisateur s'il existe
    await sql`DELETE FROM users WHERE email = 'test-complete@example.com'`;
    
    // Créer l'utilisateur avec profil complet
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await sql`
      INSERT INTO users (email, password_hash, first_name, last_name, country, languages, role)
      VALUES (${`test-complete@example.com`}, ${hashedPassword}, ${'Jean'}, ${'Dupont'}, ${'France'}, ${["français", "anglais"]}, ${'user'})
      RETURNING id, email
    `;
    
    console.log('✅ Utilisateur avec profil complet créé:', result[0]);
    console.log('📧 Email: test-complete@example.com');
    console.log('🔐 Mot de passe: password123');
    
    await sql.end();
  } catch (error) {
    console.error('❌ Erreur:', error);
    await sql.end();
  }
}

createCompleteUser();
