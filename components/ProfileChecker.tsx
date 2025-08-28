"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { isProfileComplete } from "@/lib/profile"

interface ProfileCheckerProps {
  children: React.ReactNode
}

/**
 * Composant qui vérifie si le profil de l'utilisateur est complet
 * et le redirige vers /onboarding si nécessaire
 */
export function ProfileChecker({ children }: ProfileCheckerProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Ne rien faire si on est encore en train de charger
    if (loading) return

    // Si pas d'utilisateur, laisser le middleware gérer la redirection vers /auth
    if (!user) return

    // Si le profil n'est pas complet, rediriger vers l'onboarding
    if (!isProfileComplete(user)) {
      router.push("/onboarding")
      return
    }
  }, [user, loading, router])

  // Si on charge ou si le profil n'est pas complet, ne pas afficher le contenu
  if (loading || (user && !isProfileComplete(user))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
