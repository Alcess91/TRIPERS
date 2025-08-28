'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// Types for user and authentication
interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  country?: string
  hobbies?: string[]
  languages?: string[]
  profileComplete: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name?: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  updateProfile: (profileData: any) => Promise<boolean>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log("🔍 checkAuth appelé")
      
      // Récupérer le token du localStorage
      const token = localStorage.getItem('auth-token')
      console.log("🎫 Token localStorage:", token ? `${token.substring(0, 20)}...` : "AUCUN")
      
      if (!token) {
        console.log("❌ Pas de token en localStorage")
        setUser(null)
        return
      }

      // Faire la requête vers l'API avec le token
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log("📡 checkAuth réponse:", response.status)
      if (response.ok) {
        const userData = await response.json()
        console.log("✅ checkAuth userData:", userData)
        setUser(userData)
      } else {
        console.log("❌ checkAuth échec, reset user")
        setUser(null)
        // Nettoyer le localStorage si le token est invalide
        if (token) {
          localStorage.removeItem('auth-token')
          console.log("🗑️ Token localStorage supprimé")
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("🔐 useAuth.login() appelé avec:", email)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      console.log("📡 Réponse fetch login:", response.status)
      if (response.ok) {
        const userData = await response.json()
        console.log("📋 Données reçues:", userData)
        
        // Stocker le token dans localStorage pour un accès immédiat
        if (userData.token) {
          localStorage.setItem('auth-token', userData.token)
          console.log("🎫 Token stocké dans localStorage")
        }
        
        // La réponse login a la structure { success: true, user: {...}, token: "..." }
        setUser(userData.user)
        console.log("✅ setUser() appelé avec:", userData.user)
        return true
      }
      console.log("❌ Login échoué - status:", response.status)
      return false
    } catch (error) {
      console.error('❌ Erreur dans useAuth.login():', error)
      return false
    }
  }

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        
        // Petite attente pour assurer la persistance du cookie
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Forcer un refresh pour s'assurer que l'état est synchronisé
        await checkAuth()
        
        return true
      }
      return false
    } catch (error) {
      console.error('Register failed:', error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
      // Nettoyer localStorage
      localStorage.removeItem('auth-token')
      console.log("🗑️ Token localStorage supprimé lors du logout")
    }
  }

  const refreshUser = async (): Promise<void> => {
    await checkAuth()
  }

  const updateProfile = async (profileData: any): Promise<boolean> => {
    try {
      console.log('🔄 Updating profile with data:', profileData)
      
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      })

      console.log('📡 Profile update response status:', response.status)

      if (response.ok) {
        const userData = await response.json()
        console.log('✅ Profile update successful:', userData)
        setUser(userData)
        return true
      } else {
        const errorData = await response.text()
        console.error('❌ Profile update failed:', response.status, errorData)
        return false
      }
    } catch (error) {
      console.error('💥 Profile update error:', error)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
