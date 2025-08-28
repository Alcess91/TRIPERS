"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { isProfileComplete } from "@/lib/profile"

/**
 * Hook qui redirige automatiquement l'utilisateur vers /onboarding
 * si son profil n'est pas complet
 */
export function useProfileRedirect() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Si l'utilisateur est connecté mais son profil n'est pas complet
    if (user && !isProfileComplete(user)) {
      console.log("Profile incomplete, redirecting to onboarding")
      router.push("/onboarding")
    }
  }, [user, router])
}
