"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export default function OnboardingPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [languages, setLanguages] = useState("")
  const [hobbies, setHobbies] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { user, updateProfile } = useAuth()
  const router = useRouter()

  // Rediriger si pas connecté
  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Convertir les langues et hobbies en tableaux
      const languagesArray = languages.split(",").map(lang => lang.trim()).filter(Boolean)
      const hobbiesArray = hobbies.split(",").map(hobby => hobby.trim()).filter(Boolean)

      const success = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        country,
        languages: languagesArray,
        hobbies: hobbiesArray.join(", ") // Stocker comme string pour simplifier
      })

      if (success) {
        router.push("/explore")
      } else {
        setError("Erreur lors de la mise à jour du profil")
      }
    } catch (error) {
      setError("Erreur lors de la mise à jour du profil")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>Redirection...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-2">
            Bienvenue sur TRIPERS
          </CardTitle>
          <p className="text-gray-600">
            Complétez votre profil pour commencer
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom *
              </label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Votre prénom"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays *
              </label>
              <Input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="France, Allemagne, ..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Langues parlées *
              </label>
              <Input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="Français, Anglais, Espagnol, ..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Séparez par des virgules
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Centres d'intérêt
              </label>
              <Input
                type="text"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                placeholder="Voyage, Cuisine, Sport, ..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Séparez par des virgules (optionnel)
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              disabled={loading}
            >
              {loading ? "Mise à jour..." : "Terminer l'inscription"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
