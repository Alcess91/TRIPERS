// lib/profile.ts
import type { User } from "@/hooks/useAuth"

/** Vérifie si le profil utilisateur est complet */
export function isProfileComplete(u: Partial<User> | null | undefined) {
  if (!u) return false
  return Boolean(
    u.first_name &&
    u.last_name &&
    u.country &&
    u.languages && u.languages.length > 0
  ) // ← champs requis pour un profil complet
}
