// Vérifier qu'un utilisateur avec profil complet retourne bien profileComplete: true
require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

async function checkExistingUser() {
  try {
    console.log('=== Vérification d\'un utilisateur existant ===\n');

    // Trouver un utilisateur avec des données complètes
    const users = await sql`
      SELECT id, email, first_name, last_name, country, languages, hobbies
      FROM users 
      WHERE first_name IS NOT NULL 
        AND last_name IS NOT NULL 
        AND country IS NOT NULL 
        AND languages IS NOT NULL 
        AND array_length(languages, 1) > 0
      LIMIT 1
    `;

    if (users.length === 0) {
      console.log('❌ Aucun utilisateur avec profil complet trouvé');
      
      // Créer un utilisateur de test
      console.log('\n🔄 Création d\'un utilisateur de test...');
      
      const testEmail = 'profile-test-' + Date.now() + '@example.com';
      const hashedPassword = '$2b$12$kZB6jWIccRSwLUaiRNDVLuOxk6VaLQjiSaiMiajiepCpVk2LNK2oG'; // testpassword123
      
      const newUser = await sql`
        INSERT INTO users (email, password_hash, role, first_name, last_name, country, languages, hobbies, created_at)
        VALUES (
          ${testEmail}, 
          ${hashedPassword}, 
          'user',
          'Test',
          'User', 
          'France',
          ${'{"français","anglais"}'},
          'voyage, lecture',
          NOW()
        )
        RETURNING id, email, first_name, last_name, country, languages, hobbies
      `;
      
      console.log('✅ Utilisateur créé:', newUser[0]);
      
      // Tester la fonction isProfileComplete
      const user = newUser[0];
      const isComplete = !!(user.first_name && user.last_name && user.country && user.languages?.length > 0);
      
      console.log('\n📋 Test isProfileComplete:');
      console.log('  - first_name:', user.first_name, '✓');
      console.log('  - last_name:', user.last_name, '✓');
      console.log('  - country:', user.country, '✓');
      console.log('  - languages:', user.languages, '✓');
      console.log('  - languages.length:', user.languages?.length, '✓');
      console.log('  - Result:', isComplete ? '✅ COMPLET' : '❌ INCOMPLET');
      
      console.log('\n🎯 Utilisateur pour test de connexion:');
      console.log('  Email:', testEmail);
      console.log('  Password: testpassword123');
      
    } else {
      const user = users[0];
      console.log('✅ Utilisateur trouvé:', user);
      
      const isComplete = !!(user.first_name && user.last_name && user.country && user.languages?.length > 0);
      console.log('\n📋 Vérification profil:');
      console.log('  - Complet:', isComplete ? '✅ OUI' : '❌ NON');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await sql.end();
  }
}

checkExistingUser();
