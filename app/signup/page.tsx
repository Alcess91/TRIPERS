"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Info, MapPin, Users } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()

  useEffect(() => {
    // Rediriger automatiquement vers la page auth après 10 secondes si aucune action
    const timer = setTimeout(() => {
      router.push("/auth")
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-2">
            TRIPERS
          </CardTitle>
          <p className="text-gray-600">Rejoignez notre communauté de voyageurs</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">
                Authentification sécurisée
              </h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                TRIPERS utilise un système d'authentification sécurisé pour protéger vos données.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Option Voyageur */}
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50/50">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">Voyageur</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Découvrez des destinations avec des guides locaux passionnés
              </p>
              <Link href="/auth">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Connexion / Inscription Voyageur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Option Guide */}
            <div className="p-4 border-2 border-orange-200 rounded-lg bg-orange-50/50">
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="font-semibold text-orange-900">Guide Local</h3>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                Partagez votre passion et vos connaissances locales avec des voyageurs
              </p>
              <Link href="/signup/guide">
                <Button variant="outline" className="w-full border-2 border-orange-300 hover:bg-orange-100 text-orange-700 hover:text-orange-800">
                  <span className="font-semibold">
                    Devenir Guide Local
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Redirection automatique vers la connexion dans 10 secondes...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
