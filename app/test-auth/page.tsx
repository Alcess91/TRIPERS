"use client"

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function TestPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const { user, register, updateProfile } = useAuth()

  const log = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testRegisterAndUpdate = async () => {
    try {
      log('🔄 Starting test...')
      
      // 1. Register
      log('📝 Registering user...')
      const registerSuccess = await register(email, password)
      
      if (registerSuccess) {
        log('✅ Registration successful')
        log(`👤 User: ${user?.email || 'Loading...'}`)
        
        // Wait a bit for auth state to update
        setTimeout(async () => {
          log('🔄 Attempting profile update...')
          
          // 2. Update profile
          const profileData = {
            first_name: 'Test',
            last_name: 'User',
            country: 'France',
            languages: ['français', 'anglais'],
            hobbies: 'voyage, photographie'
          }
          
          const updateSuccess = await updateProfile(profileData)
          
          if (updateSuccess) {
            log('✅ Profile update successful!')
            log(`✨ Profile complete: ${user?.profileComplete}`)
          } else {
            log('❌ Profile update failed!')
            log('🚨 This is the "erreur lors de la mise à jour du profil" error')
          }
        }, 1000)
        
      } else {
        log('❌ Registration failed')
      }
    } catch (error) {
      log(`💥 Error: ${error}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Test</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="password123"
          />
        </div>
        
        <button
          onClick={testRegisterAndUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Register + Update Profile
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Current User State:</h2>
        <pre className="text-sm">
          {JSON.stringify(user, null, 2) || 'No user'}
        </pre>
      </div>

      <div className="bg-black text-green-400 p-4 rounded mt-4 font-mono text-sm">
        <h2 className="font-bold mb-2">Debug Logs:</h2>
        <div className="max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
