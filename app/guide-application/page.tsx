"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowLeft, ArrowRight, Check, Upload, Video, MessageSquare, Camera } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

interface GuideApplicationData {
  email: string
  password: string
  firstName: string
  lastName: string
  language: string
  location: string
  bio: string
  languages: string[]
  specialties: string[]
  experience: string
  motivationType: "video" | "text"
  motivationText: string
  motivationVideo: File | null
  certifications: string[]
  hourlyRate: string
  responseTime: string
}

export default function GuideApplicationPage() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<GuideApplicationData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    language: "en",
    location: "",
    bio: "",
    languages: [],
    specialties: [],
    experience: "",
    motivationType: "text",
    motivationText: "",
    motivationVideo: null,
    certifications: [],
    hourlyRate: "",
    responseTime: "",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const updateFormData = (field: keyof GuideApplicationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addLanguage = (language: string) => {
    if (!formData.languages.includes(language)) {
      updateFormData("languages", [...formData.languages, language])
    }
  }

  const removeLanguage = (language: string) => {
    updateFormData(
      "languages",
      formData.languages.filter((l) => l !== language),
    )
  }

  const addSpecialty = (specialty: string) => {
    if (!formData.specialties.includes(specialty)) {
      updateFormData("specialties", [...formData.specialties, specialty])
    }
  }

  const removeSpecialty = (specialty: string) => {
    updateFormData(
      "specialties",
      formData.specialties.filter((s) => s !== specialty),
    )
  }

  const addCertification = (certification: string) => {
    if (!formData.certifications.includes(certification)) {
      updateFormData("certifications", [...formData.certifications, certification])
    }
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Vérifier la taille (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError("Video file too large (max 50MB)")
        return
      }
      // Vérifier le format
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file")
        return
      }
      updateFormData("motivationVideo", file)
      setError("")
    }
  }

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
          setError("Please fill all required fields")
          return false
        }
        break
      case 2:
        if (!formData.location || !formData.bio || formData.languages.length === 0) {
          setError("Please complete your profile information")
          return false
        }
        break
      case 3:
        if (formData.specialties.length === 0 || !formData.experience) {
          setError("Please add your specialties and experience")
          return false
        }
        break
      case 4:
        if (formData.motivationType === "text" && !formData.motivationText.trim()) {
          setError("Please write your motivation message")
          return false
        }
        if (formData.motivationType === "video" && !formData.motivationVideo) {
          setError("Please upload your motivation video")
          return false
        }
        break
      case 5:
        if (!formData.hourlyRate || !formData.responseTime || !termsAccepted) {
          setError("Please complete all fields and accept terms")
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep(step)) return

    setError("")
    if (step < totalSteps) {
      setStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Créer le compte utilisateur d'abord
      const result = await register(
        formData.email.toLowerCase().trim(),
        formData.password,
        `${formData.firstName} ${formData.lastName}`.trim(),
        "guide",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          language: formData.language,
        },
      )

      if (result.success) {
        // Ensuite soumettre la demande de guide
        const applicationData = new FormData()
        applicationData.append("userId", result.user.id.toString())
        applicationData.append("location", formData.location)
        applicationData.append("bio", formData.bio)
        applicationData.append("languages", JSON.stringify(formData.languages))
        applicationData.append("specialties", JSON.stringify(formData.specialties))
        applicationData.append("experience", formData.experience)
        applicationData.append("motivationType", formData.motivationType)
        applicationData.append("motivationText", formData.motivationText)
        applicationData.append("certifications", JSON.stringify(formData.certifications))
        applicationData.append("hourlyRate", formData.hourlyRate)
        applicationData.append("responseTime", formData.responseTime)

        if (formData.motivationVideo) {
          applicationData.append("motivationVideo", formData.motivationVideo)
        }

        const response = await fetch("/api/guide-applications", {
          method: "POST",
          body: applicationData,
        })

        if (response.ok) {
          setSuccess(true)
        } else {
          const errorData = await response.json()
          setError(errorData.error || "Application submission failed")
        }
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (error) {
      console.error("Application error:", error)
      setError("An unexpected error occurred")
    }

    setIsLoading(false)
  }

  const availableLanguages = [
    "English",
    "Français",
    "Español",
    "Deutsch",
    "Italiano",
    "Português",
    "中文",
    "日本語",
    "한국어",
    "العربية",
    "Русский",
    "Nederlands",
  ]

  const availableSpecialties = [
    "Historical Tours",
    "Food & Gastronomy",
    "Art & Culture",
    "Architecture",
    "Nature & Wildlife",
    "Adventure Sports",
    "Photography",
    "Local Markets",
    "Nightlife",
    "Museums",
    "Religious Sites",
    "Shopping",
    "Street Art",
    "Music & Entertainment",
    "Traditional Crafts",
    "Wine Tasting",
  ]

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying to become a TRIPERS guide. Our team will review your application and get back to
              you within 2-3 business days.
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">What's next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Review by our admin team</li>
                  <li>• Email notification with decision</li>
                  <li>• If approved, access to guide dashboard</li>
                </ul>
              </div>
              <Button onClick={() => router.push("/")} className="w-full">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
              <h2 className="text-2xl font-bold mb-2">Become a TRIPERS Guide</h2>
              <p className="text-gray-600">Share your passion for your city with travelers</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                />
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
            <h2 className="text-2xl font-bold text-center">Your Profile</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder="Paris, France"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About You *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Tell us about yourself, your passion for your city, and why you want to be a guide..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Languages You Speak *</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeLanguage(lang)}
                    >
                      {lang} ×
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={addLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLanguages
                      .filter((lang) => !formData.languages.includes(lang))
                      .map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
            <h2 className="text-2xl font-bold text-center">Your Expertise</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Specialties *</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.specialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => removeSpecialty(specialty)}
                    >
                      {specialty} ×
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={addSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSpecialties
                      .filter((spec) => !formData.specialties.includes(spec))
                      .map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience & Background *</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => updateFormData("experience", e.target.value)}
                  placeholder="Describe your experience as a guide, your knowledge of the area, any relevant qualifications..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Certifications (Optional)</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="cursor-pointer">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add certification"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value.trim()
                        if (value) {
                          addCertification(value)
                          ;(e.target as HTMLInputElement).value = ""
                        }
                      }
                    }}
                  />
                </div>
              </div>
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
            <h2 className="text-2xl font-bold text-center">Your Motivation</h2>
            <p className="text-center text-gray-600">Tell us why you want to be a TRIPERS guide</p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    formData.motivationType === "text"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => updateFormData("motivationType", "text")}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6" />
                    <div className="text-left">
                      <h3 className="font-medium">Text Message</h3>
                      <p className="text-sm text-gray-600">Write your motivation</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    formData.motivationType === "video"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => updateFormData("motivationType", "video")}
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-6 w-6" />
                    <div className="text-left">
                      <h3 className="font-medium">Video Message</h3>
                      <p className="text-sm text-gray-600">Record your motivation</p>
                    </div>
                  </div>
                </button>
              </div>

              {formData.motivationType === "text" && (
                <div className="space-y-2">
                  <Label htmlFor="motivationText">Your Motivation Message *</Label>
                  <Textarea
                    id="motivationText"
                    value={formData.motivationText}
                    onChange={(e) => updateFormData("motivationText", e.target.value)}
                    placeholder="Why do you want to become a TRIPERS guide? What makes you passionate about sharing your city with travelers?"
                    rows={6}
                    required
                  />
                  <p className="text-sm text-gray-500">{formData.motivationText.length}/500 characters</p>
                </div>
              )}

              {formData.motivationType === "video" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {formData.motivationVideo ? (
                      <div className="space-y-3">
                        <Video className="h-12 w-12 mx-auto text-green-500" />
                        <p className="font-medium text-green-700">Video uploaded: {formData.motivationVideo.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {(formData.motivationVideo.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <Button variant="outline" onClick={() => updateFormData("motivationVideo", null)}>
                          Remove Video
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Camera className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="font-medium">Upload your motivation video</p>
                          <p className="text-sm text-gray-600">Max 50MB, 2-3 minutes recommended</p>
                        </div>
                        <label className="cursor-pointer">
                          <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                          <Button variant="outline" className="mt-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Video File
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Video Tips:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Keep it between 2-3 minutes</li>
                      <li>• Speak clearly and with enthusiasm</li>
                      <li>• Show your personality and passion</li>
                      <li>• Mention specific places you love in your city</li>
                    </ul>
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
            <h2 className="text-2xl font-bold text-center">Final Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={(e) => updateFormData("hourlyRate", e.target.value)}
                      placeholder="50"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responseTime">Response Time *</Label>
                  <Select
                    value={formData.responseTime}
                    onValueChange={(value) => updateFormData("responseTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select response time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< 30 minutes">Less than 30 minutes</SelectItem>
                      <SelectItem value="< 1 hour">Less than 1 hour</SelectItem>
                      <SelectItem value="< 3 hours">Less than 3 hours</SelectItem>
                      <SelectItem value="< 24 hours">Less than 24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Application Review Process</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Your application will be reviewed by our admin team</li>
                  <li>• Review process takes 2-3 business days</li>
                  <li>• You'll receive an email with the decision</li>
                  <li>• If approved, you'll get access to the guide dashboard</li>
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I accept the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 text-transparent bg-clip-text mb-2">
            TRIPERS
          </div>
          <p className="text-gray-600">Guide Application</p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full h-1 bg-gray-100">
              <Progress value={progress} className="h-1" />
            </div>

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        stepNumber <= step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {stepNumber}
                    </div>
                  ))}
                </div>
              </div>

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
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </Button>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" /> Back to Login
                    </Button>
                  </Link>
                )}

                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Submitting..."
                  ) : step < totalSteps ? (
                    <>
                      Next <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Submit Application <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
