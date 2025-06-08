"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Globe, MapPin, User, Mail, Lock, Languages, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
  language: string
  hobbies: string
  userType: "traveler" | "guide"
}

export default function SignupPage() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    language: "en",
    hobbies: "",
    userType: "traveler",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const updateFormData = (field: keyof SignupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Validation de l'email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validation du mot de passe
  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  // Fonction pour vérifier si l'email existe déjà
  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await response.json()
      return data.exists
    } catch (error) {
      console.error("Error checking email:", error)
      return false
    }
  }

  const handleNext = async () => {
    if (step === 1) {
      // Étape 1: Email + Mot de passe
      if (!formData.email || !formData.password) {
        setError(t("signup.error.fill.fields"))
        return
      }
      if (!validateEmail(formData.email)) {
        setError(t("signup.error.valid.email"))
        return
      }
      if (!validatePassword(formData.password)) {
        setError(t("signup.error.password.length"))
        return
      }

      // Vérifier si l'email existe déjà
      setIsLoading(true)
      setError("")

      try {
        const emailExists = await checkEmailExists(formData.email)
        if (emailExists) {
          setError(t("signup.error.email.exists"))
          setIsLoading(false)
          return
        }
      } catch (error) {
        console.error("Error during verification:", error)
        setError(t("signup.error.verification"))
        setIsLoading(false)
        return
      }

      setIsLoading(false)
    } else if (step === 2) {
      // Étape 2: Centres d'intérêt + Type d'utilisateur
      if (!formData.userType) {
        setError(t("signup.error.select.user.type"))
        return
      }
      if (selectedInterests.length < 3) {
        setError(t("signup.error.min.interests"))
        return
      }
    } else if (step === 3) {
      // Étape 3: Informations personnelles + Finalisation
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError(t("signup.error.fill.fields"))
        return
      }
      if (!termsAccepted) {
        setError(t("signup.error.accept.terms"))
        return
      }

      // Procéder à l'inscription
      await handleSubmit()
      return
    }

    setError("")
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const cleanData = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        language: formData.language,
        hobbies: formData.hobbies,
        userType: formData.userType,
      }

      const name = `${cleanData.firstName} ${cleanData.lastName}`.trim()
      const role = cleanData.userType === "traveler" ? "user" : "guide"

      const result = await register(cleanData.email, cleanData.password, name, role, {
        firstName: cleanData.firstName,
        lastName: cleanData.lastName,
        language: cleanData.language,
        hobbies: cleanData.hobbies,
      })

      if (result.success) {
        // Stocker les données d'inscription pour l'onboarding
        localStorage.setItem(
          "onboardingData",
          JSON.stringify({
            firstName: cleanData.firstName,
            lastName: cleanData.lastName,
            language: cleanData.language,
            interests: cleanData.hobbies ? cleanData.hobbies.split(", ") : [],
            userType: cleanData.userType,
          }),
        )

        // Rediriger vers l'onboarding
        router.push("/onboarding")
      } else {
        setError(result.error || t("signup.error.registration"))
        setStep(1)
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setError(t("signup.error.unexpected"))
      setStep(1)
    }

    setIsLoading(false)
  }

  const interestCategories = {
    [t("interests.travel.culture")]: [
      "Backpacking",
      "Luxury travel",
      "Road trip",
      "City break",
      "Ecotourism",
      "Historical heritage",
      "Museums",
      "Architecture",
      "Festivals",
      "Local markets",
    ],
    [t("interests.gastronomy")]: [
      "Local cuisine",
      "Street food",
      "Michelin restaurants",
      "Cooking classes",
      "Wine tasting",
      "Breweries",
      "Pastry",
      "Vegetarian/Vegan",
    ],
    [t("interests.sport.adventure")]: [
      "Hiking",
      "Rock climbing",
      "Diving",
      "Surfing",
      "Skiing",
      "Cycling",
      "Kayaking",
      "Paragliding",
      "Trail running",
      "Yoga",
      "Fitness",
    ],
    [t("interests.arts.creativity")]: [
      "Photography",
      "Painting",
      "Music",
      "Dance",
      "Theater",
      "Crafts",
      "Design",
      "Fashion",
      "Literature",
      "Cinema",
    ],
    [t("interests.nature.wellness")]: [
      "Gardening",
      "Bird watching",
      "Meditation",
      "Spa",
      "Hot springs",
      "Beaches",
      "Mountains",
      "Forests",
      "Deserts",
      "Lakes",
    ],
    [t("interests.learning")]: [
      "Languages",
      "History",
      "Science",
      "Technology",
      "Philosophy",
      "Astronomy",
      "Geology",
      "Botany",
    ],
    [t("interests.social.entertainment")]: [
      "Nightlife",
      "Concerts",
      "Bars",
      "Clubs",
      "Games",
      "Shopping",
      "Local meetups",
      "Events",
    ],
  }

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    formData.hobbies ? formData.hobbies.split(", ") : [],
  )

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      const newInterests = prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
      updateFormData("hobbies", newInterests.join(", "))
      return newInterests
    })
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
            <h2 className="text-2xl font-bold text-center mb-6">{t("signup.create.account")}</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  {t("signup.email")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  {t("signup.password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    placeholder={t("signup.password.min")}
                    className="pl-10 border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">{t("signup.password.help")}</p>
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
              <h2 className="text-2xl font-bold mb-2">{t("signup.who.are.you")}</h2>
              <p className="text-gray-600 text-sm">{t("signup.profile.interests")}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.userType === "traveler"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                onClick={() => updateFormData("userType", "traveler")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formData.userType === "traveler" ? "bg-gradient-to-r from-orange-400 to-pink-500" : "bg-gray-100"
                    }`}
                  >
                    <Globe className={`h-5 w-5 ${formData.userType === "traveler" ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">{t("signup.traveler")}</h3>
                    <p className="text-gray-600 text-xs">{t("signup.traveler.desc")}</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.userType === "guide" ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-300"
                }`}
                onClick={() => updateFormData("userType", "guide")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      formData.userType === "guide" ? "bg-gradient-to-r from-cyan-400 to-teal-500" : "bg-gray-100"
                    }`}
                  >
                    <MapPin className={`h-5 w-5 ${formData.userType === "guide" ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">{t("signup.guide")}</h3>
                    <p className="text-gray-600 text-xs">{t("signup.guide.desc")}</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">{t("signup.interests")}</h3>
              <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
                {Object.entries(interestCategories).map(([category, interests]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-gray-600 text-sm">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedInterests.includes(interest)
                              ? formData.userType === "traveler"
                                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                                : "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  {t("signup.interests.selected")} ({selectedInterests.length}) :
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedInterests.length > 0 ? (
                    selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className={`px-2 py-1 rounded-full text-xs ${
                          formData.userType === "traveler"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-cyan-100 text-cyan-700"
                        }`}
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">{t("signup.interests.none")}</span>
                  )}
                </div>
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
            <h2 className="text-2xl font-bold text-center mb-6">{t("signup.finalize")}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    {t("signup.first.name")}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="First name"
                      className="pl-10 border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    {t("signup.last.name")}
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Last name"
                    className="border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-700">
                  {t("signup.preferred.language")}
                </Label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                    <SelectTrigger className="pl-10 border-gray-200 focus:ring-orange-500/20 focus:border-orange-500">
                      <SelectValue placeholder={t("signup.select.language")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  {t("signup.accept")}{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    {t("signup.terms")}
                  </Link>{" "}
                  {t("common.and")}{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    {t("signup.privacy")}
                  </Link>
                </Label>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo coloré */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-2">
            TRIPERS
          </div>
          <p className="text-gray-600">{t("signup.title")}</p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-100">
              <Progress value={progress} className="h-1" />
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

              {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mt-4">{error}</div>}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="h-4 w-4" /> {t("signup.previous")}
                  </Button>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" /> {t("auth.login")}
                    </Button>
                  </Link>
                )}

                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    disabled={isLoading}
                  >
                    {isLoading && step === 1 ? t("signup.checking") : t("signup.next")}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    disabled={isLoading}
                  >
                    {isLoading ? t("signup.registering") : t("signup.finish")} <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          {t("signup.already.member")}{" "}
          <Link href="/auth" className="text-blue-600 hover:underline">
            {t("signup.sign.in")}
          </Link>
        </div>
      </div>
    </div>
  )
}
