"use client"

import { useState } from "react"
import { ArrowLeft, Save, Camera, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"

export default function EditProfilePage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: "",
    bio: "",
    languages: [] as string[],
    interests: [] as string[],
  })

  const [newLanguage, setNewLanguage] = useState("")
  const [newInterest, setNewInterest] = useState("")

  const availableLanguages = [
    "Français",
    "English",
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
  ]

  const availableInterests = [
    "Art & Culture",
    "Gastronomie",
    "Histoire",
    "Architecture",
    "Nature",
    "Sport",
    "Musique",
    "Photographie",
    "Shopping",
    "Vie nocturne",
    "Aventure",
    "Détente",
    "Famille",
    "Spiritualité",
    "Technologie",
  ]

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Simuler la sauvegarde
    alert("Profil mis à jour avec succès !")
    router.push("/profile")
  }

  const addLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
      }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== language),
    }))
  }

  const addInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((int) => int !== interest),
    }))
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-white">Modifier le Profil</h1>
          </div>
          <Button onClick={handleSave} className="bg-white text-emerald-600 hover:bg-gray-100">
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Photo de profil */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={user?.avatar_url || "/placeholder.svg?height=100&width=100&query=user avatar"}
                    alt={formData.name}
                  />
                  <AvatarFallback>{formData.name.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold mb-1">{formData.name || "Nouvel utilisateur"}</h2>
              <p className="text-gray-600">{formData.location || "Localisation non définie"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1"
                placeholder="Votre nom complet"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="mt-1"
                placeholder="Ville, Pays"
              />
            </div>
            <div>
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="mt-1"
                rows={4}
                placeholder="Parlez-nous de vous, vos passions de voyage..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Langues */}
        <Card>
          <CardHeader>
            <CardTitle>Langues parlées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.languages.map((language) => (
                <Badge
                  key={language}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => removeLanguage(language)}
                >
                  {language} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {formData.languages.length === 0 && <p className="text-gray-500 italic">Aucune langue ajoutée</p>}
            </div>
            <div className="flex space-x-2">
              <Select value={newLanguage} onValueChange={setNewLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages
                    .filter((lang) => !formData.languages.includes(lang))
                    .map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={addLanguage} disabled={!newLanguage}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Centres d'intérêt */}
        <Card>
          <CardHeader>
            <CardTitle>Centres d'intérêt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => removeInterest(interest)}
                >
                  {interest} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {formData.interests.length === 0 && <p className="text-gray-500 italic">Aucun centre d'intérêt ajouté</p>}
            </div>
            <div className="flex space-x-2">
              <Select value={newInterest} onValueChange={setNewInterest}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un centre d'intérêt" />
                </SelectTrigger>
                <SelectContent>
                  {availableInterests
                    .filter((interest) => !formData.interests.includes(interest))
                    .map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={addInterest} disabled={!newInterest}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bouton de sauvegarde flottant */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <Button size="lg" className="shadow-lg" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}
