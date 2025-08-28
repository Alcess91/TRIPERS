// Test de debug pour vérifier le problème de mot de passe
const bcrypt = require('bcryptjs');

const testPassword = 'testpassword123';

console.log('=== Debug Password Hash/Compare ===\n');

async function testPasswordFlow() {
  try {
    console.log('🔐 Test password:', testPassword);
    
    // 1. Test du hachage (comme dans register)
    console.log('\n1️⃣ HASH PASSWORD (comme dans register)');
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    console.log('✅ Hashed password:', hashedPassword);
    console.log('📏 Hash length:', hashedPassword.length);
    
    // 2. Test de la comparaison (comme dans login)
    console.log('\n2️⃣ COMPARE PASSWORD (comme dans login)');
    const isValid = await bcrypt.compare(testPassword, hashedPassword);
    console.log('✅ Password comparison result:', isValid);
    
    if (isValid) {
      console.log('🎉 Hash/Compare fonctionne correctement!');
    } else {
      console.log('❌ PROBLÈME: Hash/Compare ne fonctionne pas!');
    }
    
    // 3. Test avec un mauvais mot de passe
    console.log('\n3️⃣ TEST WRONG PASSWORD');
    const wrongPassword = 'wrongpassword';
    const isWrongValid = await bcrypt.compare(wrongPassword, hashedPassword);
    console.log('❌ Wrong password result:', isWrongValid, '(should be false)');
    
    // 4. Test avec différents rounds
    console.log('\n4️⃣ TEST DIFFERENT ROUNDS');
    const hash10 = await bcrypt.hash(testPassword, 10);
    const hash12 = await bcrypt.hash(testPassword, 12);
    
    console.log('Hash with 10 rounds:', await bcrypt.compare(testPassword, hash10));
    console.log('Hash with 12 rounds:', await bcrypt.compare(testPassword, hash12));
    
  } catch (error) {
    console.error('💥 Error in password test:', error);
  }
}

testPasswordFlow();
