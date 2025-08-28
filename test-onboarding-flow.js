// Test pour reproduire le problème de la page onboarding
const testEmail = 'onboarding-test-' + Date.now() + '@example.com';
const testPassword = 'testpassword123';

console.log('=== Test Spécifique Page Onboarding ===\n');

// Simuler exactement ce que fait le navigateur
const cookies = new Map();

const fetchWithCookies = async (url, options = {}) => {
  // Inclure credentials comme dans le hook useAuth
  options.credentials = 'include';
  
  // Ajouter les cookies manuellement aussi (pour debug)
  const cookieString = Array.from(cookies.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
  
  if (cookieString) {
    options.headers = {
      ...options.headers,
      'Cookie': cookieString
    };
  }

  console.log('🔍 Requête:', options.method || 'GET', url);
  console.log('🍪 Cookies envoyés:', cookieString ? 'OUI' : 'NON');
  
  const response = await fetch(url, options);
  
  // Extraire les cookies de la réponse
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const match = setCookieHeader.match(/auth-token=([^;]+)/);
    if (match) {
      cookies.set('auth-token', match[1]);
      console.log('📥 Cookie reçu et stocké');
    }
  }
  
  console.log('📊 Status:', response.status);
  return response;
};

async function testOnboardingFlow() {
  try {
    // 1. Inscription (comme sur /auth)
    console.log('1️⃣ INSCRIPTION via /auth');
    const registerResponse = await fetchWithCookies('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });

    if (!registerResponse.ok) {
      const error = await registerResponse.json();
      console.log('❌ Erreur inscription:', error);
      return;
    }

    const userData = await registerResponse.json();
    console.log('✅ Inscrit avec succès, ID:', userData.id);
    console.log('');

    // 2. Redirection vers /onboarding - simuler le checkAuth du useAuth
    console.log('2️⃣ ARRIVÉE SUR /onboarding - vérification auth');
    const authCheckResponse = await fetchWithCookies('http://localhost:3000/api/auth/me');
    
    if (!authCheckResponse.ok) {
      console.log('❌ Auth check a échoué - utilisateur serait redirigé vers /auth');
      return;
    }

    const authData = await authCheckResponse.json();
    console.log('✅ Auth vérifiée, utilisateur:', authData.email);
    console.log('📋 Profil complet:', authData.profileComplete);
    console.log('');

    // 3. Soumission du formulaire onboarding (exact format de la page)
    console.log('3️⃣ SOUMISSION FORMULAIRE ONBOARDING');
    
    // Reproduire exactement ce que fait handleSubmit dans onboarding/page.tsx
    const formData = {
      first_name: 'Test',
      last_name: 'User',
      country: 'France',
      languages: ['français', 'anglais'], // Tableau comme dans le formulaire
      hobbies: 'voyage, photographie' // String comme converti dans handleSubmit
    };

    console.log('📝 Données envoyées:', JSON.stringify(formData, null, 2));

    const updateResponse = await fetchWithCookies('http://localhost:3000/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (updateResponse.ok) {
      const updatedUser = await updateResponse.json();
      console.log('✅ Profil mis à jour avec succès!');
      console.log('👤 Nom:', updatedUser.first_name, updatedUser.last_name);
      console.log('✨ Profil complet:', updatedUser.profileComplete);
      console.log('🎯 Utilisateur devrait être redirigé vers /explore');
    } else {
      const error = await updateResponse.json();
      console.log('❌ ERREUR mise à jour profil:', error);
      console.log('💡 C\'est ici que l\'utilisateur voit "erreur lors de la mise à jour du profil"');
    }

  } catch (error) {
    console.error('❌ Erreur dans le test:', error);
  }
}

testOnboardingFlow();
