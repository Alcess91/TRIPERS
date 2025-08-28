// Test d'inscription simple
const testEmail = 'test@example.com'
const testPassword = 'password123'

async function testRegister() {
  try {
    console.log('🧪 Test d\'inscription...')
    
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    })
    
    console.log('📊 Status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Inscription réussie:', data)
    } else {
      const error = await response.text()
      console.log('❌ Erreur d\'inscription:', error)
    }
    
  } catch (error) {
    console.error('💥 Erreur réseau:', error)
  }
}

testRegister()
