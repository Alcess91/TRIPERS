// Test final avec credentials: 'include' uniquement (comme useAuth)
const testEmail = 'final-browser-test-' + Date.now() + '@example.com';
const testPassword = 'testpassword123';

console.log('=== Test Final - Exact Browser Behavior ===\n');

// Exactement comme le hook useAuth - credentials include seulement
const fetchLikeBrowser = async (url, options = {}) => {
  // Ajouter credentials: 'include' comme dans useAuth
  const requestOptions = {
    ...options,
    credentials: 'include'
  };

  console.log('🌐 Fetch:', (options.method || 'GET'), url);
  console.log('📋 Options:', JSON.stringify(requestOptions, null, 2));
  
  const response = await fetch(url, requestOptions);
  console.log('📈 Response status:', response.status);
  
  return response;
};

async function testExactBrowserFlow() {
  try {
    console.log('📧 Email:', testEmail);
    console.log('🔐 Password:', testPassword);
    console.log('');

    // 1. Register (comme register function dans useAuth)
    console.log('1️⃣ REGISTER (useAuth.register)');
    const registerResponse = await fetchLikeBrowser('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    if (!registerResponse.ok) {
      const error = await registerResponse.json();
      console.log('❌ Register failed:', error);
      return;
    }

    const userData = await registerResponse.json();
    console.log('✅ Register success');
    console.log('👤 User ID:', userData.id);
    console.log('📋 Profile complete:', userData.profileComplete);
    console.log('');

    // 2. Check auth (comme checkAuth function dans useAuth)
    console.log('2️⃣ CHECK AUTH (useAuth.checkAuth)');
    const authResponse = await fetchLikeBrowser('http://localhost:3000/api/auth/me');
    
    if (!authResponse.ok) {
      console.log('❌ Auth check failed');
      return;
    }

    const authData = await authResponse.json();
    console.log('✅ Auth check success');
    console.log('👤 User email:', authData.email);
    console.log('');

    // 3. Update profile (comme updateProfile function dans useAuth)
    console.log('3️⃣ UPDATE PROFILE (useAuth.updateProfile)');
    
    // Données exactement comme dans onboarding/page.tsx après traitement
    const profileData = {
      first_name: 'Browser',
      last_name: 'Test',
      country: 'France',
      languages: ['français', 'anglais'], // Array comme dans le form
      hobbies: 'voyage, photographie' // String comme traité par handleSubmit
    };

    console.log('📝 Profile data:', JSON.stringify(profileData, null, 2));

    const updateResponse = await fetchLikeBrowser('http://localhost:3000/api/auth/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (updateResponse.ok) {
      const updatedUser = await updateResponse.json();
      console.log('✅ Profile update SUCCESS!');
      console.log('👤 Name:', updatedUser.first_name, updatedUser.last_name);
      console.log('🌍 Country:', updatedUser.country);
      console.log('✨ Profile complete:', updatedUser.profileComplete);
      console.log('');
      console.log('🎉 SUCCESS! Browser should redirect to /explore');
    } else {
      const error = await updateResponse.json();
      console.log('❌ Profile update FAILED');
      console.log('💥 Error:', error);
      console.log('🚨 This is the "erreur lors de la mise à jour du profil" error!');
    }

  } catch (error) {
    console.error('💥 Test error:', error);
  }
}

testExactBrowserFlow();
