#!/usr/bin/env node

// Test complet du système d'inscription des guides
const baseUrl = 'http://localhost:3000';

async function testGuideSystem() {
  console.log('🧪 Test du système d\'inscription des guides\n');

  // Test 1: Soumission d'une candidature
  console.log('1️⃣ Test soumission candidature...');
  const candidature = {
    firstName: "Jean",
    lastName: "Martin", 
    email: "jean.martin@example.com",
    phone: "0987654321",
    dateOfBirth: "1985-03-20",
    city: "Lyon",
    country: "France",
    yearsAsGuide: "5",
    yearsInCity: "15",
    languages: ["Français", "Anglais", "Italien"],
    specialties: ["Architecture", "Vin", "Histoire"],
    motivation: "Guide professionnel depuis 5 ans, je connais Lyon comme ma poche et j'adore faire découvrir les secrets de ma ville aux visiteurs.",
    hasReferences: true,
    acceptsTerms: true
  };

  try {
    const response = await fetch(`${baseUrl}/api/guide-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidature)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Candidature soumise:', result.applicationId);
    } else {
      console.log('❌ Erreur soumission:', response.status);
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }

  // Test 2: Récupération des candidatures
  console.log('\n2️⃣ Test récupération candidatures...');
  try {
    const response = await fetch(`${baseUrl}/api/guide-applications`);
    if (response.ok) {
      const applications = await response.json();
      console.log(`✅ ${applications.length} candidature(s) trouvée(s)`);
      applications.forEach(app => {
        console.log(`   - ${app.firstName} ${app.lastName} (${app.status})`);
      });
    } else {
      console.log('❌ Erreur récupération:', response.status);
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }

  // Test 3: Approbation d'une candidature
  console.log('\n3️⃣ Test approbation candidature...');
  try {
    const response = await fetch(`${baseUrl}/api/guide-applications/2`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approuve' })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Candidature approuvée:', result.applicationId);
    } else {
      console.log('❌ Erreur approbation:', response.status);
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }

  // Test 4: Rejet d'une candidature
  console.log('\n4️⃣ Test rejet candidature...');
  try {
    const response = await fetch(`${baseUrl}/api/guide-applications/3`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejete' })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Candidature rejetée:', result.applicationId);
    } else {
      console.log('❌ Erreur rejet:', response.status);
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }

  console.log('\n🎉 Tests terminés !');
}

// Vérifier si le serveur est en marche
async function checkServer() {
  try {
    const response = await fetch(baseUrl);
    if (response.ok) {
      console.log('✅ Serveur accessible\n');
      await testGuideSystem();
    } else {
      console.log('❌ Serveur non accessible');
    }
  } catch (error) {
    console.log('❌ Serveur non accessible. Assurez-vous que `npm run dev` est lancé.');
  }
}

checkServer();
