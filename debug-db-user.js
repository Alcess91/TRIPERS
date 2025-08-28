// Test de debug pour vérifier un utilisateur spécifique dans la DB
require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');
const bcrypt = require('bcryptjs');

// Configuration de la base de données (même que dans les routes)
const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

const testEmail = 'debug-user@example.com';
const testPassword = 'testpassword123';

console.log('=== Debug User in Database ===\n');

async function debugUserInDB() {
  try {
    console.log('📧 Test email:', testEmail);
    console.log('🔐 Test password:', testPassword);
    console.log('');

    // 1. Créer un utilisateur de test
    console.log('1️⃣ CREATING TEST USER');
    
    // D'abord, supprimer s'il existe
    await sql`DELETE FROM users WHERE email = ${testEmail.toLowerCase()}`;
    
    // Hash du mot de passe (comme dans register)
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    console.log('✅ Password hashed for storage');
    
    // Créer l'utilisateur
    const result = await sql`
      INSERT INTO users (email, password_hash, role, created_at)
      VALUES (${testEmail.toLowerCase()}, ${hashedPassword}, 'user', NOW())
      RETURNING id, email, password_hash
    `;
    
    const user = result[0];
    console.log('✅ User created with ID:', user.id);
    console.log('📝 Stored hash:', user.password_hash);
    console.log('');

    // 2. Tenter une connexion (comme dans login)
    console.log('2️⃣ TESTING LOGIN');
    
    // Récupérer l'utilisateur (comme dans login)
    const users = await sql`
      SELECT id, email, password_hash, role
      FROM users WHERE email = ${testEmail.toLowerCase()}
    `;
    
    if (users.length === 0) {
      console.log('❌ User not found in database');
      return;
    }
    
    const foundUser = users[0];
    console.log('✅ User found in database');
    console.log('🆔 User ID:', foundUser.id);
    console.log('📧 User email:', foundUser.email);
    console.log('🔒 Stored hash:', foundUser.password_hash);
    console.log('');

    // 3. Vérifier le mot de passe (comme dans login)
    console.log('3️⃣ VERIFYING PASSWORD');
    const isValid = await bcrypt.compare(testPassword, foundUser.password_hash);
    
    console.log('🔐 Password to check:', testPassword);
    console.log('🔒 Hash from DB:', foundUser.password_hash);
    console.log('✅ Password valid:', isValid);
    
    if (isValid) {
      console.log('🎉 LOGIN SHOULD WORK!');
    } else {
      console.log('❌ LOGIN WILL FAIL - PASSWORD MISMATCH!');
      
      // Debug supplémentaire
      console.log('\n🔍 ADDITIONAL DEBUG:');
      console.log('Hash length:', foundUser.password_hash.length);
      console.log('Hash starts with:', foundUser.password_hash.substring(0, 10));
      
      // Test avec le hash original
      const freshHash = await bcrypt.hash(testPassword, 12);
      const freshCompare = await bcrypt.compare(testPassword, freshHash);
      console.log('Fresh hash comparison works:', freshCompare);
    }

    // 4. Nettoyage
    console.log('\n4️⃣ CLEANUP');
    await sql`DELETE FROM users WHERE email = ${testEmail.toLowerCase()}`;
    console.log('✅ Test user deleted');
    
  } catch (error) {
    console.error('💥 Error in database test:', error);
  } finally {
    await sql.end();
  }
}

debugUserInDB();
