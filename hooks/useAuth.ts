"use client"

import { useState, useEffect } from "react"

interface User {
  id: number
  email: string
  name: string
  avatar_url?: string
  role: "user" | "admin" | "guide"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler une vérification d'authentification
    const checkAuth = async () => {
      try {
        // En mode démo, on simule un utilisateur connecté
        const demoUser: User = {
          id: 1,
          email: "demo@tripers.com",
          name: "Utilisateur Démo",
          avatar_url: "/placeholder.svg?height=40&width=40&query=user avatar",
          role: "user",
        }

        // Simuler un délai de chargement
        setTimeout(() => {
          setUser(demoUser)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Auth check failed:", error)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, userType: "traveler" | "guide" = "traveler") => {
    try {
      // Simuler une connexion
      const role = userType === "traveler" ? "user" : "guide"

      const demoUser: User = {
        id: 1,
        email: email,
        name: email.includes("guide") ? "Guide Local" : "Voyageur",
        avatar_url: `/placeholder.svg?height=40&width=40&query=${role === "guide" ? "guide" : "traveler"} avatar`,
        role: email.includes("admin") ? "admin" : role,
      }

      setUser(demoUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erreur de connexion" }
    }
  }

  const register = async (email: string, password: string, name: string, role = "user") => {
    try {
      // Simuler une inscription
      const newUser: User = {
        id: Date.now(),
        email: email,
        name: name,
        avatar_url: `/placeholder.svg?height=40&width=40&query=${role === "guide" ? "guide" : "traveler"} avatar`,
        role: role as "user" | "admin" | "guide",
      }

      setUser(newUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erreur d'inscription" }
    }
  }

  const logout = async () => {
    try {
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isGuide: user?.role === "guide",
  }
}
