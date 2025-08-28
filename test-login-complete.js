// Test simple: connexion avec profil complet
require('dotenv').config({ path: '.env.local' });

async function testLoginWithCompleteProfile() {
  try {
    // Utilisons un utilisateur existant qui a un profil complet
    // (créé par nos tests précédents)
    const testEmail = 'complete-profile-test-1756399965121@example.com';
    const testPassword = 'testpassword123';

    console.log('=== Test Connexion avec Profil Complet ===\n');
    console.log('📧 Email:', testEmail);
    console.log('🔐 Password:', testPassword);
    console.log('');

    // Test de connexion
    console.log('🔐 CONNEXION...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });

    console.log('📊 Status:', loginResponse.status);

    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      console.log('❌ Login failed:', error);
      
      // Essayons de créer un utilisateur avec profil complet
      console.log('\n🔄 Creating complete profile user...');
      await createCompleteProfileUser();
      return;
    }

    const loginData = await loginResponse.json();
    console.log('✅ Login successful!');
    console.log('');
    console.log('👤 User details:');
    console.log('  - Email:', loginData.user.email);
    console.log('  - First name:', loginData.user.first_name);
    console.log('  - Last name:', loginData.user.last_name);
    console.log('  - Country:', loginData.user.country);
    console.log('  - Languages:', loginData.user.languages);
    console.log('  - Profile complete:', loginData.user.profileComplete);

    if (loginData.user.profileComplete) {
      console.log('\n🎉 SUCCESS! Profil complet - utilisateur devrait aller à la page principale');
    } else {
      console.log('\n❌ PROBLÈME: Profil incomplet - utilisateur sera redirigé vers onboarding');
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

async function createCompleteProfileUser() {
  const testEmail = 'new-complete-' + Date.now() + '@example.com';
  const testPassword = 'testpassword123';

  console.log('📝 Creating user with complete profile...');
  console.log('📧 Email:', testEmail);

  // 1. Register
  const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });

  if (!registerResponse.ok) {
    console.log('❌ Registration failed');
    return;
  }

  console.log('✅ User registered');

  // 2. Complete profile
  const profileData = {
    first_name: 'Complete',
    last_name: 'User',
    country: 'France',
    languages: ['français', 'anglais'],
    hobbies: 'voyage, lecture'
  };

  const updateResponse = await fetch('http://localhost:3000/api/auth/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(profileData)
  });

  if (!updateResponse.ok) {
    console.log('❌ Profile update failed');
    return;
  }

  const updatedUser = await updateResponse.json();
  console.log('✅ Profile completed');
  console.log('📋 Profile complete:', updatedUser.profileComplete);

  // 3. Logout
  await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });

  // 4. Login again
  console.log('\n🔐 Testing login with complete profile...');
  const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });

  if (loginResponse.ok) {
    const loginData = await loginResponse.json();
    console.log('✅ Login successful!');
    console.log('📋 Profile complete:', loginData.user.profileComplete);
    
    if (loginData.user.profileComplete) {
      console.log('🎉 SUCCESS! User will be redirected to main page');
    } else {
      console.log('❌ PROBLEM: Profile still incomplete');
    }
  }
}

testLoginWithCompleteProfile();
