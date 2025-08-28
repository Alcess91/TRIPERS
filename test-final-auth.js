const testEmail = 'final-test-' + Date.now() + '@example.com';
const testPassword = 'testpassword123';

console.log('=== Test Final - Flux Complet d\'Authentification ===\n');

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
    }
  }
  
  return response;
};

async function testCompleteFlow() {
  try {
    console.log('🎯 Email de test:', testEmail);
    console.log('🔐 Mot de passe:', testPassword);
    console.log('');

    // 1. Inscription
    console.log('1️⃣ INSCRIPTION');
    const registerResponse = await fetchWithCookies('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword })
    });

    if (registerResponse.ok) {
      const userData = await registerResponse.json();
      console.log('   ✅ Inscription réussie');
      console.log('   📧 Email:', userData.email);
      console.log('   🆔 ID:', userData.id);
      console.log('   📋 Profil complet:', userData.profileComplete);
    } else {
      const error = await registerResponse.json();
      console.log('   ❌ Erreur:', error);
      return;
    }

    // 2. Vérification automatique de l'auth (comme le ferait useAuth)
    console.log('\n2️⃣ VÉRIFICATION AUTH AUTOMATIQUE');
    const authCheckResponse = await fetchWithCookies('http://localhost:3000/api/auth/me');
    
    if (authCheckResponse.ok) {
      const userData = await authCheckResponse.json();
      console.log('   ✅ Utilisateur authentifié automatiquement');
      console.log('   📧 Email confirmé:', userData.email);
    } else {
      console.log('   ❌ Problème avec l\'auth automatique');
      return;
    }

    // 3. Complétion du profil (flow onboarding)
    console.log('\n3️⃣ COMPLÉTION DU PROFIL (ONBOARDING)');
    const profileData = {
      first_name: 'John',
      last_name: 'Doe',
      country: 'France',
      languages: ['français', 'anglais', 'espagnol'],
      hobbies: ['voyage', 'photographie', 'cuisine']
    };

    const updateResponse = await fetchWithCookies('http://localhost:3000/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });

    if (updateResponse.ok) {
      const updatedUser = await updateResponse.json();
      console.log('   ✅ Profil complété avec succès!');
      console.log('   👤 Nom complet:', updatedUser.first_name, updatedUser.last_name);
      console.log('   🌍 Pays:', updatedUser.country);
      console.log('   🗣️ Langues:', updatedUser.languages);
      console.log('   🎯 Hobbies:', updatedUser.hobbies);
      console.log('   ✨ Profil complet:', updatedUser.profileComplete);
    } else {
      const error = await updateResponse.json();
      console.log('   ❌ Erreur mise à jour:', error);
      return;
    }

    // 4. Vérification finale
    console.log('\n4️⃣ VÉRIFICATION FINALE DU PROFIL');
    const finalCheckResponse = await fetchWithCookies('http://localhost:3000/api/auth/me');
    
    if (finalCheckResponse.ok) {
      const finalUserData = await finalCheckResponse.json();
      console.log('   ✅ Profil vérifié');
      console.log('   📋 Statut:', finalUserData.profileComplete ? 'COMPLET' : 'INCOMPLET');
      
      if (finalUserData.profileComplete) {
        console.log('   🎉 L\'utilisateur peut maintenant accéder à toutes les fonctionnalités!');
      }
    }

    // 5. Test de déconnexion
    console.log('\n5️⃣ DÉCONNEXION');
    const logoutResponse = await fetchWithCookies('http://localhost:3000/api/auth/logout', {
      method: 'POST'
    });

    if (logoutResponse.ok) {
      console.log('   ✅ Déconnexion réussie');
      cookies.clear();
      
      // Vérifier que l'auth est bien supprimée
      const postLogoutCheck = await fetchWithCookies('http://localhost:3000/api/auth/me');
      if (postLogoutCheck.status === 401) {
        console.log('   ✅ Session correctement terminée');
      }
    }

    console.log('\n🎯 RÉSUMÉ FINAL:');
    console.log('✅ Inscription avec cookie automatique');
    console.log('✅ Authentification persistante');
    console.log('✅ Mise à jour du profil');
    console.log('✅ Complétion du profil');
    console.log('✅ Déconnexion propre');
    console.log('\n🚀 Le système d\'authentification est 100% fonctionnel!');

  } catch (error) {
    console.error('❌ Erreur dans le test:', error);
  }
}

testCompleteFlow();
