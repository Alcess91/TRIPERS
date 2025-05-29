"use client"

import { useState } from "react"
import { ArrowLeft, Save, Camera, MapPin, Globe, Languages, Award, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function GuideProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user?.name || "Marie Dubois",
    location: "Paris, France",
    bio: "Guide passionnée de Paris depuis 8 ans, spécialisée dans l'art et la gastronomie française. J'adore partager les secrets de ma ville natale avec des voyageurs du monde entier.",
    languages: ["Français", "English", "Español", "Italiano"],
    specialties: ["Art & Culture", "Gastronomie", "Histoire", "Architecture"],
    responseTime: "< 1 heure",
    hourlyRate: "€50",
    availability: true,
    certifications: ["Guide Officiel Paris", "Certification Gastronomie", "First Aid"],
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Simuler la sauvegarde
    alert("Profil mis à jour avec succès !")
    router.push("/guide-dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/guide-dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Mon Profil Guide</h1>
          </div>
          <Button onClick={handleSave}>
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
                    src={user?.avatar_url || "/placeholder.svg?height=100&width=100&query=french woman guide"}
                    alt={formData.name}
                  />
                  <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{formData.location}</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Guide Vérifié</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="mt-1"
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
              />
            </div>
          </CardContent>
        </Card>

        {/* Langues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Languages className="h-5 w-5 mr-2" />
              Langues parlées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.languages.map((language) => (
                <Badge key={language} variant="secondary">
                  {language}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ajouter une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deutsch">Deutsch</SelectItem>
                  <SelectItem value="nederlands">Nederlands</SelectItem>
                  <SelectItem value="português">Português</SelectItem>
                  <SelectItem value="русский">Русский</SelectItem>
                  <SelectItem value="中文">中文</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Ajouter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Spécialités */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Spécialités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.specialties.map((specialty) => (
                <Badge key={specialty} variant="outline">
                  {specialty}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input placeholder="Nouvelle spécialité" />
              <Button variant="outline">Ajouter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {formData.certifications.map((cert) => (
                <div key={cert} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{cert}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input placeholder="Nouvelle certification" />
              <Button variant="outline">Ajouter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de disponibilité */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Disponibilité et tarifs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Disponible pour des réservations</h3>
                <p className="text-sm text-gray-600">Activez pour recevoir de nouvelles demandes</p>
              </div>
              <Switch
                checked={formData.availability}
                onCheckedChange={(checked) => handleChange("availability", checked)}
              />
            </div>
            <div>
              <Label htmlFor="responseTime">Temps de réponse</Label>
              <Select value={formData.responseTime} onValueChange={(value) => handleChange("responseTime", value)}>
                <SelectTrigger id="responseTime" className="mt-1">
                  <SelectValue placeholder="Sélectionnez un temps de réponse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< 30 minutes">Moins de 30 minutes</SelectItem>
                  <SelectItem value="< 1 heure">Moins d'une heure</SelectItem>
                  <SelectItem value="< 3 heures">Moins de 3 heures</SelectItem>
                  <SelectItem value="< 24 heures">Moins de 24 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="hourlyRate">Tarif horaire</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={(e) => handleChange("hourlyRate", e.target.value)}
                  className="pl-10"
                />
              </div>
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
