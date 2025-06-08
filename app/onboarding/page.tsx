"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, MapPin, ArrowRight, ArrowLeft, Check, Upload } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

interface OnboardingData {
  avatar: string
  location: string
  bio: string
  languages: string[]
  interests: string[]
  travelStyle: string
  budget: string
}

interface StoredOnboardingData {
  firstName?: string
  lastName?: string
  language?: string
  interests?: string[]
  userType?: string
}

export default function OnboardingPage() {
  const { t } = useLanguage()
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [storedData, setStoredData] = useState<StoredOnboardingData | null>(null)
  const [formData, setFormData] = useState<OnboardingData>({
    avatar: "",
    location: "",
    bio: "",
    languages: [],
    interests: [],
    travelStyle: "",
    budget: "",
  })

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  // Récupérer les données stockées lors de l'inscription
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("onboardingData")
      if (savedData) {
        const parsedData = JSON.parse(savedData) as StoredOnboardingData
        setStoredData(parsedData)

        // Pré-remplir les données du formulaire
        setFormData((prev) => ({
          ...prev,
          // Si la langue est définie, l'ajouter au tableau des langues
          languages: parsedData.language
            ? [
                parsedData.language === "fr"
                  ? "Français"
                  : parsedData.language === "en"
                    ? "English"
                    : parsedData.language === "es"
                      ? "Español"
                      : parsedData.language === "de"
                        ? "Deutsch"
                        : "",
              ]
            : [],
          // Utiliser les intérêts déjà sélectionnés
          interests: parsedData.interests || [],
        }))
      }
    }
  }, [])

  // Rediriger si pas connecté
  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFinish = async () => {
    setIsLoading(true)

    try {
      // Préparer les données du profil à sauvegarder
      const profileData = {
        avatar_url: formData.avatar,
        location: formData.location,
        bio: formData.bio,
        languages: formData.languages,
        interests: formData.interests,
        travelStyle: formData.travelStyle,
        budget: formData.budget,
      }

      // Sauvegarder les données du profil
      const result = await updateProfile(profileData)

      if (!result.success) {
        console.error("Error saving profile:", result.error)
        // Continue anyway for demo
      }

      // Nettoyer les données d'onboarding du localStorage
      localStorage.removeItem("onboardingData")

      // Rediriger vers la page appropriée selon le type d'utilisateur
      if (user?.role === "guide") {
        router.push("/guide-dashboard")
      } else {
        router.push("/explore")
      }
    } catch (error) {
      console.error("Error finalizing profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const availableLanguages = [
    "English",
    "Français",
    "Español",
    "Deutsch",
    "Italiano",
    "Português",
    "Русский",
    "中文",
    "日本語",
    "العربية",
    "हिन्दी",
    "Nederlands",
    "Svenska",
    "한국어",
  ]

  const availableInterests = [
    "Art & Culture",
    "Gastronomy",
    "History",
    "Architecture",
    "Nature",
    "Sports",
    "Music",
    "Photography",
    "Shopping",
    "Nightlife",
    "Adventure",
    "Relaxation",
    "Family",
    "Spirituality",
    "Technology",
  ]

  const toggleLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                {t("onboarding.welcome")} {storedData?.firstName || user?.firstName || user?.name}! 👋
              </h2>
              <p className="text-gray-600">{t("onboarding.add.photo")}</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-orange-200">
                  <AvatarImage
                    src={formData.avatar || "/placeholder.svg?height=128&width=128&query=user avatar"}
                    alt="Profile photo"
                  />
                  <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                    {(storedData?.firstName?.charAt(0) || user?.name?.charAt(0) || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-orange-500 hover:bg-orange-600"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>

              <div className="w-full max-w-sm">
                <Label htmlFor="avatar-url">{t("onboarding.photo.url")}</Label>
                <Input
                  id="avatar-url"
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => updateFormData("avatar", e.target.value)}
                  placeholder={t("onboarding.photo.placeholder")}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Upload className="h-4 w-4" />
                <span>{t("onboarding.drag.drop")}</span>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t("onboarding.location.title")} 📍</h2>
              <p className="text-gray-600">{t("onboarding.location.help")}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location">{t("onboarding.location")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder={t("onboarding.location.placeholder")}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">{t("onboarding.bio")}</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder={t("onboarding.bio.placeholder")}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t("onboarding.languages.title")} 🗣️</h2>
              <p className="text-gray-600">{t("onboarding.languages.help")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => toggleLanguage(language)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.languages.includes(language)
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>

              {formData.languages.length > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-700 mb-2">
                    {t("onboarding.languages.selected")} ({formData.languages.length}):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {formData.languages.map((language) => (
                      <Badge key={language} className="bg-orange-100 text-orange-700">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t("onboarding.interests.title")} ❤️</h2>
              <p className="text-gray-600">{t("onboarding.interests.help")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              {formData.interests.length > 0 && (
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <p className="text-sm text-cyan-700 mb-2">
                    {t("onboarding.interests.selected")} ({formData.interests.length}):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} className="bg-cyan-100 text-cyan-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t("onboarding.travel.style")} 🎒</h2>
              <p className="text-gray-600">{t("onboarding.travel.help")}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>{t("onboarding.style.preferred")}</Label>
                <Select value={formData.travelStyle} onValueChange={(value) => updateFormData("travelStyle", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t("onboarding.style.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backpacker">{t("onboarding.style.backpacker")}</SelectItem>
                    <SelectItem value="comfort">{t("onboarding.style.comfort")}</SelectItem>
                    <SelectItem value="luxury">{t("onboarding.style.luxury")}</SelectItem>
                    <SelectItem value="family">{t("onboarding.style.family")}</SelectItem>
                    <SelectItem value="solo">{t("onboarding.style.solo")}</SelectItem>
                    <SelectItem value="group">{t("onboarding.style.group")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t("onboarding.budget")}</Label>
                <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t("onboarding.budget.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">{t("onboarding.budget.low")}</SelectItem>
                    <SelectItem value="medium">{t("onboarding.budget.medium")}</SelectItem>
                    <SelectItem value="high">{t("onboarding.budget.high")}</SelectItem>
                    <SelectItem value="luxury">{t("onboarding.budget.luxury")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-green-800">{t("onboarding.almost.done")}</h3>
              </div>
              <p className="text-green-700 text-sm">
                {t("onboarding.ready")}{" "}
                {storedData?.userType === "guide" || user?.role === "guide"
                  ? t("onboarding.travelers")
                  : t("onboarding.guides")}{" "}
                {t("onboarding.authentic")}
              </p>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  if (!user) {
    return <div>{t("common.loading")}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo et progression */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-4">
            TRIPERS
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                {t("onboarding.step")} {step} {t("onboarding.of")} {totalSteps}
              </span>
              <span>
                {Math.round(progress)}% {t("onboarding.complete")}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4" /> {t("onboarding.previous")}
                </Button>
              ) : (
                <div></div>
              )}

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  {t("onboarding.next")} <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleFinish}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? t("onboarding.finalizing") : t("onboarding.finish")} <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">{t("onboarding.modify.later")}</div>
      </div>
    </div>
  )
}
