// Test du flux complet inscription + onboarding
// Test avec un utilisateur ayant un profil complet
require('dotenv').config({ path: '.env.local' });

const testEmail = `test${Date.now()}@example.com`;
const testPassword = 'password123';

console.log('=== Test avec Profil Complet ===');

const cookies = new Map();

const fetchWithCookies = async (url, options = {}) => {
  options.credentials = 'include';
  
  const cookieString = Array.from(cookies.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
  
  if (cookieString) {
    options.headers = {
      ...options.headers,
      'Cookie': cookieString
    };
  }

  const response = await fetch(url, options);
  
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const match = setCookieHeader.match(/auth-token=([^;]+)/);
    if (match) {
      cookies.set('auth-token', match[1]);
    }
  }
  
  return response;
};

async function testCompleteProfileUser() {
  try {
    console.log('📧 Email:', testEmail);
    console.log('🔐 Password:', testPassword);
    console.log('');

    // 1. INSCRIPTION
    console.log('1️⃣ INSCRIPTION');
    const registerResponse = await fetchWithCookies('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });

    if (!registerResponse.ok) {
      const error = await registerResponse.json();
      console.log('❌ Register failed:', error);
      return;
    }

    const userData = await registerResponse.json();
    console.log('✅ Registration successful');
    console.log('📋 Profile complete:', userData.profileComplete);
    console.log('');

    // 2. COMPLÉTER LE PROFIL
    console.log('2️⃣ COMPLÉTER LE PROFIL');
    const profileData = {
      first_name: 'John',
      last_name: 'Doe',
      country: 'France',
      languages: ['français', 'anglais'],
      hobbies: 'voyage, photographie'
    };

    const updateResponse = await fetchWithCookies('http://localhost:3000/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      console.log('❌ Profile update failed:', error);
      return;
    }

    const updatedUser = await updateResponse.json();
    console.log('✅ Profile completed');
    console.log('📋 Profile complete now:', updatedUser.profileComplete);
    console.log('');

    // 3. DÉCONNEXION
    console.log('3️⃣ LOGOUT');
    await fetchWithCookies('http://localhost:3000/api/auth/logout', { method: 'POST' });
    cookies.clear();
    console.log('✅ Logged out');
    console.log('');

    // 4. RECONNEXION avec profil complet
    console.log('4️⃣ RECONNEXION (profil complet)');
    const loginResponse = await fetchWithCookies('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      console.log('❌ Login failed:', error);
      return;
    }

    const loginData = await loginResponse.json();
    console.log('✅ Login successful');
    console.log('👤 User:', loginData.user.email);
    console.log('📋 Profile complete:', loginData.user.profileComplete);
    
    if (loginData.user.profileComplete) {
      console.log('🎉 SUCCESS! L\'utilisateur devrait être redirigé vers la page principale');
    } else {
      console.log('❌ PROBLÈME: Profil marqué comme incomplet malgré les données');
      console.log('🔍 Détails du profil:');
      console.log('  - first_name:', loginData.user.first_name);
      console.log('  - last_name:', loginData.user.last_name);
      console.log('  - country:', loginData.user.country);
      console.log('  - languages:', loginData.user.languages);
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testCompleteProfileUser();

async function testFullFlow() {
  try {
    console.log('🧪 Test du flux complet...')
    
    // 1. Inscription
    console.log('1️⃣ Inscription...')
    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    })
    
    if (!registerResponse.ok) {
      console.log('❌ Erreur d\'inscription:', await registerResponse.text())
      return
    }
    
    const userData = await registerResponse.json()
    console.log('✅ Inscription réussie:', userData)
    
    // Récupérer le cookie d'authentification
    const authCookie = registerResponse.headers.get('set-cookie')
    console.log('🍪 Cookie d\'auth:', authCookie ? 'présent' : 'absent')
    
    // 2. Vérifier l'état utilisateur
    console.log('2️⃣ Vérification de l\'utilisateur...')
    const meResponse = await fetch('http://localhost:3000/api/auth/me', {
      headers: {
        'Cookie': authCookie || ''
      }
    })
    
    if (meResponse.ok) {
      const userInfo = await meResponse.json()
      console.log('✅ Utilisateur récupéré:', userInfo)
      
      // 3. Test de mise à jour du profil
      console.log('3️⃣ Mise à jour du profil...')
      const updateResponse = await fetch('http://localhost:3000/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': authCookie || ''
        },
        body: JSON.stringify({
          first_name: 'Test',
          last_name: 'User',
          country: 'France',
          languages: ['Français', 'Anglais'],
          hobbies: 'Test, Développement'
        })
      })
      
      if (updateResponse.ok) {
        const updatedUser = await updateResponse.json()
        console.log('✅ Profil mis à jour:', updatedUser)
      } else {
        console.log('❌ Erreur de mise à jour:', await updateResponse.text())
      }
    } else {
      console.log('❌ Erreur de récupération utilisateur:', await meResponse.text())
    }
    
  } catch (error) {
    console.error('💥 Erreur:', error)
  }
}

testFullFlow()
