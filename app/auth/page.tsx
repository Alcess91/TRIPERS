"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Globe, MapPin } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AuthPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [userType, setUserType] = useState<"traveler" | "guide">("traveler")
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await login(email, password, userType)

    if (result.success) {
      // Rediriger vers la page appropriée selon le type d'utilisateur
      router.push(userType === "traveler" ? "/explore" : "/guide-dashboard")
    } else {
      setError(result.error || "Connection error")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo coloré */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-2">
            TRIPERS
          </div>
          <p className="text-gray-600">{t("auth.title")}</p>
        </div>

        {/* Sélection du type d'utilisateur colorée */}
        <div className="mb-6">
          <div className="flex rounded-xl overflow-hidden shadow-lg">
            <button
              className={`flex-1 py-4 px-4 flex flex-col items-center transition-all duration-300 ${
                userType === "traveler"
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50"
              }`}
              onClick={() => setUserType("traveler")}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  userType === "traveler" ? "bg-white/20" : "bg-gradient-to-r from-orange-400 to-pink-500"
                }`}
              >
                <Globe className={`h-6 w-6 ${userType === "traveler" ? "text-white" : "text-white"}`} />
              </div>
              <span className="font-medium">{t("auth.traveler")}</span>
              <span className="text-xs mt-1 opacity-80">{t("auth.traveler.desc")}</span>
            </button>
            <button
              className={`flex-1 py-4 px-4 flex flex-col items-center transition-all duration-300 ${
                userType === "guide"
                  ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50"
              }`}
              onClick={() => setUserType("guide")}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  userType === "guide" ? "bg-white/20" : "bg-gradient-to-r from-cyan-400 to-teal-500"
                }`}
              >
                <MapPin className={`h-6 w-6 ${userType === "guide" ? "text-white" : "text-white"}`} />
              </div>
              <span className="font-medium">{t("auth.guide")}</span>
              <span className="text-xs mt-1 opacity-80">{t("auth.guide.desc")}</span>
            </button>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle
              className={`bg-gradient-to-r ${
                userType === "traveler" ? "from-orange-500 to-pink-500" : "from-cyan-500 to-teal-600"
              } bg-clip-text text-transparent`}
            >
              {userType === "traveler" ? t("auth.traveler.space") : t("auth.guide.space")}
            </CardTitle>
            <CardDescription className="text-center">
              {userType === "traveler" ? t("auth.traveler.tagline") : t("auth.guide.tagline")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder={t("auth.email")}
                  required
                  disabled={isLoading}
                  className="border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder={t("auth.password")}
                  required
                  disabled={isLoading}
                  className="border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>}
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${
                  userType === "traveler"
                    ? "from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    : "from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
                } text-white border-0 shadow-lg`}
                disabled={isLoading}
              >
                {isLoading ? t("auth.logging") : t("auth.login")}
              </Button>

              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  {t("auth.no.account")}{" "}
                  <Link
                    href="/signup"
                    className={`font-medium ${
                      userType === "traveler"
                        ? "text-pink-600 hover:text-pink-700"
                        : "text-teal-600 hover:text-teal-700"
                    }`}
                  >
                    {t("auth.create.account")}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Comptes de test colorés */}
        <Card className="mt-4 border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 text-gray-800">{t("auth.test.accounts")}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"></div>
                <span>{t("auth.admin")}: admin@tripers.com / admin123</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full"></div>
                <span>{t("auth.guide.test")}: guide@tripers.com / guide123</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
                <span>{t("auth.traveler.test")}: user@tripers.com / user123</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
