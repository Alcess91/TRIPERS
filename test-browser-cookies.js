const testEmail = 'browser-test-' + Date.now() + '@example.com';
const testPassword = 'testpassword123';

console.log('=== Test de l\'authentification avec cookies (simulation navigateur) ===\n');

// Simuler le comportement du navigateur avec un cookie jar
const cookies = new Map();

const fetchWithCookies = async (url, options = {}) => {
  // Ajouter les cookies à la requête
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
  
  // Extraire les cookies de la réponse
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    // Parser simple pour extraire le cookie auth-token
    const match = setCookieHeader.match(/auth-token=([^;]+)/);
    if (match) {
      cookies.set('auth-token', match[1]);
      console.log('🍪 Cookie auth-token stocké:', match[1].substring(0, 20) + '...');
    }
  }
  
  return response;
};

async function testBrowserFlow() {
  try {
    // 1. Inscription
    console.log('1. Test inscription...');
    const registerResponse = await fetchWithCookies('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });

    console.log('   Status:', registerResponse.status);
    
    if (registerResponse.ok) {
      const userData = await registerResponse.json();
      console.log('   ✅ Inscription réussie, ID:', userData.id);
      console.log('   Profile complet:', userData.profileComplete);
    } else {
      const error = await registerResponse.json();
      console.log('   ❌ Erreur inscription:', error);
      return;
    }

    // 2. Vérification de l'authentification
    console.log('\n2. Test vérification auth...');
    const authCheckResponse = await fetchWithCookies('http://localhost:3000/api/auth/me');
    
    console.log('   Status:', authCheckResponse.status);
    
    if (authCheckResponse.ok) {
      const userData = await authCheckResponse.json();
      console.log('   ✅ Auth vérifiée, utilisateur:', userData.email);
    } else {
      const error = await authCheckResponse.json();
      console.log('   ❌ Erreur auth:', error);
      return;
    }

    // 3. Mise à jour du profil
    console.log('\n3. Test mise à jour profil...');
    const profileData = {
      first_name: 'Browser',
      last_name: 'Test',
      country: 'France',
      languages: ['français', 'anglais'],
      hobbies: ['voyage', 'photographie']
    };

    const updateResponse = await fetchWithCookies('http://localhost:3000/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });

    console.log('   Status:', updateResponse.status);
    
    if (updateResponse.ok) {
      const updatedUser = await updateResponse.json();
      console.log('   ✅ Profil mis à jour!');
      console.log('   Nom:', updatedUser.first_name, updatedUser.last_name);
      console.log('   Profile complet:', updatedUser.profileComplete);
    } else {
      const error = await updateResponse.json();
      console.log('   ❌ Erreur mise à jour:', error);
    }

    // 4. Déconnexion
    console.log('\n4. Test déconnexion...');
    const logoutResponse = await fetchWithCookies('http://localhost:3000/api/auth/logout', {
      method: 'POST'
    });

    console.log('   Status:', logoutResponse.status);
    
    if (logoutResponse.ok) {
      console.log('   ✅ Déconnexion réussie');
      cookies.clear();
    }

    // 5. Vérification que l'auth est supprimée
    console.log('\n5. Vérification auth supprimée...');
    const finalCheckResponse = await fetchWithCookies('http://localhost:3000/api/auth/me');
    console.log('   Status:', finalCheckResponse.status);
    
    if (finalCheckResponse.status === 401) {
      console.log('   ✅ Auth correctement supprimée');
    } else {
      console.log('   ❌ Auth toujours active');
    }

  } catch (error) {
    console.error('Erreur dans le test:', error);
  }
}

testBrowserFlow();
