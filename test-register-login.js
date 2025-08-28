// Test de reproduction du problème: Inscription puis Connexion
require('dotenv').config({ path: '.env.local' });

const testEmail = 'repro-test-' + Date.now() + '@example.com';
const testPassword = 'testpassword123';

console.log('=== Test Reproduction: Register → Login ===\n');

// Simuler le comportement du navigateur avec cookies
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

async function testRegisterThenLogin() {
  try {
    console.log('📧 Email:', testEmail);
    console.log('🔐 Password:', testPassword);
    console.log('');

    // 1. INSCRIPTION
    console.log('1️⃣ INSCRIPTION');
    const registerResponse = await fetchWithCookies('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: testEmail, 
        password: testPassword 
      })
    });

    console.log('📊 Register status:', registerResponse.status);
    
    if (!registerResponse.ok) {
      const error = await registerResponse.json();
      console.log('❌ Register failed:', error);
      return;
    }

    const userData = await registerResponse.json();
    console.log('✅ Registration successful');
    console.log('👤 User ID:', userData.id);
    console.log('📧 User email:', userData.email);
    console.log('');

    // 2. DÉCONNEXION (pour simuler que l'utilisateur ferme/rouvre le navigateur)
    console.log('2️⃣ LOGOUT (simulation fermeture navigateur)');
    await fetchWithCookies('http://localhost:3000/api/auth/logout', {
      method: 'POST'
    });
    cookies.clear();
    console.log('✅ Logged out');
    console.log('');

    // 3. CONNEXION avec les mêmes identifiants
    console.log('3️⃣ LOGIN avec les mêmes identifiants');
    console.log('📧 Trying email:', testEmail);
    console.log('🔐 Trying password:', testPassword);
    
    const loginResponse = await fetchWithCookies('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: testEmail, 
        password: testPassword 
      })
    });

    console.log('📊 Login status:', loginResponse.status);
    
    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      console.log('❌ LOGIN FAILED:', error);
      console.log('🚨 C\'est ici le problème "mot de passe incorrect"!');
      
      // Debug supplémentaire
      console.log('\n🔍 DEBUG LOGIN:');
      console.log('- Email exact envoyé:', JSON.stringify(testEmail));
      console.log('- Password exact envoyé:', JSON.stringify(testPassword));
      console.log('- Password length:', testPassword.length);
      console.log('- Contient des espaces?', testPassword.includes(' '));
      
    } else {
      const loginData = await loginResponse.json();
      console.log('✅ LOGIN SUCCESSFUL!');
      console.log('👤 Logged in as:', loginData.user.email);
      console.log('🎉 Pas de problème détecté!');
    }

  } catch (error) {
    console.error('💥 Error in test:', error);
  }
}

testRegisterThenLogin();
