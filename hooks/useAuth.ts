"use client"

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react"

// Interface User synchronisée avec la base de données
interface User {
  id: number
  email: string
  name: string
  avatar_url?: string | null
  role: "user" | "admin" | "guide"
  first_name?: string | null
  last_name?: string | null
  language?: string
  hobbies?: string | null
  location?: string | null
  bio?: string | null
  languages?: string[] | null
  interests?: string[] | null
  travel_style?: string | null
  budget?: string | null
  created_at?: string
  updated_at?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isGuide: boolean
  login: (
    email: string,
    password: string,
    userType?: "traveler" | "guide"
  ) => Promise<{ success: boolean; error?: string }>
  register: (
    email: string,
    password: string,
    name: string,
    role?: string,
    additionalInfo?: {
      firstName?: string
      lastName?: string
      language?: string
      hobbies?: string
    }
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (
    email: string,
    password: string,
    userType: "traveler" | "guide" = "traveler"
  ) => {
    try {
      if (!email?.trim() || !password?.trim()) {
        return { success: false, error: "Email et mot de passe requis" }
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
          userType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Erreur de connexion" }
      }

      if (data.success && data.user) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: "Réponse de connexion invalide" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Erreur de connexion" }
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role = "user",
    additionalInfo?: {
      firstName?: string
      lastName?: string
      language?: string
      hobbies?: string
    }
  ) => {
    try {
      if (!email?.trim()) return { success: false, error: "Email requis" }
      if (!password?.trim() || password.length < 6)
        return { success: false, error: "Mot de passe requis (minimum 6 caractères)" }
      if (!name?.trim()) return { success: false, error: "Nom requis" }

      const payload = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        name: name.trim(),
        role,
        firstName: additionalInfo?.firstName?.trim() || "",
        lastName: additionalInfo?.lastName?.trim() || "",
        language: additionalInfo?.language || "fr",
        hobbies: additionalInfo?.hobbies?.trim() || "",
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Erreur d'inscription" }
      }

      if (data.success && data.user) {
        setUser(data.user)

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "onboardingData",
            JSON.stringify({
              firstName: additionalInfo?.firstName || "",
              lastName: additionalInfo?.lastName || "",
              language: additionalInfo?.language || "fr",
              interests: additionalInfo?.hobbies ? additionalInfo.hobbies.split(", ") : [],
              userType: role,
            })
          )
        }

        return { success: true }
      } else {
        return { success: false, error: "Réponse d'inscription invalide" }
      }
    } catch (error) {
      console.error("Register error:", error)
      return { success: false, error: "Erreur d'inscription" }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem("onboardingData")
      }
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      if (!user) return { success: false, error: "Utilisateur non connecté" }

      const allowedFields = [
        "avatar_url",
        "location",
        "bio",
        "languages",
        "interests",
        "travelStyle",
        "budget",
        "first_name",
        "last_name",
      ]

      const filteredData = Object.keys(profileData)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj: any, key) => {
          obj[key] = profileData[key as keyof User]
          return obj
        }, {})

      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          profileData: filteredData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Erreur de mise à jour du profil" }
      }

      setUser((prev) => {
        if (!prev) return null
        return {
          ...prev,
          ...filteredData,
        }
      })

      return { success: true }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error)
      return { success: false, error: "Erreur de mise à jour du profil" }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isGuide: user?.role === "guide",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
