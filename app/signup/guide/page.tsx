"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Star, FileText, Shield, CheckCircle, AlertCircle } from "lucide-react"

export default function GuideSignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    // Informations personnelles
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    
    // Informations guide
    city: "",
    region: "",
    country: "",
    yearsInCity: "",
    yearsAsGuide: "",
    languages: [] as string[],
    specialties: [] as string[],
    
    // Motivation et expérience
    motivation: "",
    experience: "",
    availability: "",
    tourTypes: [] as string[],
    
    // Références et certifications
    certifications: "",
    references: "",
    website: "",
    socialMedia: "",
    
    // Accord
    agreeTerms: false,
    agreeDataProcessing: false
  })

  const availableLanguages = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Arabe", "Chinois", "Japonais", "Russe"]
  const availableSpecialties = ["Histoire", "Gastronomie", "Art", "Architecture", "Nature", "Aventure", "Culture", "Shopping", "Vie nocturne", "Famille"]
  const availableTourTypes = ["Visite à pied", "Tour en vélo", "Tour en voiture", "Randonnée", "Tour gastronomique", "Tour historique", "Tour artistique", "Tour nocturne"]

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }))
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialties: checked 
        ? [...prev.specialties, specialty]
        : prev.specialties.filter(s => s !== specialty)
    }))
  }

  const handleTourTypeChange = (tourType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tourTypes: checked 
        ? [...prev.tourTypes, tourType]
        : prev.tourTypes.filter(t => t !== tourType)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas")
      }

      if (!formData.agreeTerms || !formData.agreeDataProcessing) {
        throw new Error("Vous devez accepter les conditions d'utilisation et le traitement des données")
      }

      if (formData.languages.length === 0) {
        throw new Error("Veuillez sélectionner au moins une langue")
      }

      if (formData.specialties.length === 0) {
        throw new Error("Veuillez sélectionner au moins une spécialité")
      }

      // Appel API pour soumettre la demande de guide
      const response = await fetch('/api/guide-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la soumission')
      }

      setSuccess(true)
      
      // Rediriger après 3 secondes
      setTimeout(() => {
        router.push('/auth?message=guide-application-submitted')
      }, 3000)

    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande Soumise !</h2>
            <p className="text-gray-600 mb-4">
              Votre demande d'inscription en tant que guide a été soumise avec succès. 
              Notre équipe va l'examiner dans les plus brefs délais.
            </p>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Statut: En attente d'examen
            </Badge>
            <p className="text-sm text-gray-500 mt-4">
              Vous recevrez un email de confirmation une fois votre demande traitée.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/signup">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-2">
                Devenir Guide TRIPERS
              </CardTitle>
              <p className="text-gray-600">
                Partagez votre passion et vos connaissances locales avec des voyageurs du monde entier
              </p>
            </CardHeader>
          </Card>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations Personnelles */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Localisation et Expérience */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                Localisation et Expérience
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="ex: Paris"
                  required
                />
              </div>
              <div>
                <Label htmlFor="region">Région *</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  placeholder="ex: Île-de-France"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Pays *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="ex: France"
                  required
                />
              </div>
              <div>
                <Label htmlFor="yearsInCity">Depuis combien d'années vivez-vous dans cette ville ? *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, yearsInCity: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moins-1">Moins d'1 an</SelectItem>
                    <SelectItem value="1-2">1-2 ans</SelectItem>
                    <SelectItem value="3-5">3-5 ans</SelectItem>
                    <SelectItem value="6-10">6-10 ans</SelectItem>
                    <SelectItem value="plus-10">Plus de 10 ans</SelectItem>
                    <SelectItem value="natif">Natif de la ville</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearsAsGuide">Expérience en tant que guide *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, yearsAsGuide: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant (0 expérience)</SelectItem>
                    <SelectItem value="moins-1">Moins d'1 an</SelectItem>
                    <SelectItem value="1-2">1-2 ans</SelectItem>
                    <SelectItem value="3-5">3-5 ans</SelectItem>
                    <SelectItem value="plus-5">Plus de 5 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Langues et Spécialités */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Langues et Spécialités
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Langues parlées * (sélectionnez toutes celles que vous maîtrisez)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {availableLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                      />
                      <Label htmlFor={`lang-${language}`} className="text-sm">{language}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Spécialités * (sélectionnez vos domaines d'expertise)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {availableSpecialties.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`spec-${specialty}`}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                      />
                      <Label htmlFor={`spec-${specialty}`} className="text-sm">{specialty}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Types de tours proposés</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {availableTourTypes.map((tourType) => (
                    <div key={tourType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tour-${tourType}`}
                        checked={formData.tourTypes.includes(tourType)}
                        onCheckedChange={(checked) => handleTourTypeChange(tourType, checked as boolean)}
                      />
                      <Label htmlFor={`tour-${tourType}`} className="text-sm">{tourType}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivation et Disponibilité */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-5 w-5 mr-2 text-purple-500" />
                Motivation et Disponibilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="motivation">Pourquoi voulez-vous devenir guide TRIPERS ? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                  placeholder="Partagez votre passion pour votre ville et votre motivation à accueillir des voyageurs..."
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience">Décrivez votre expérience et vos connaissances locales *</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Parlez de vos connaissances de la ville, de votre expérience avec les touristes, de vos lieux favoris..."
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="availability">Quelle est votre disponibilité ? *</Label>
                <Textarea
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  placeholder="ex: Disponible les week-ends, tous les jours après 17h, flexible selon les demandes..."
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Références et Certifications */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                Références et Certifications (Optionnel)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="certifications">Certifications ou formations en tourisme</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                  placeholder="ex: Diplôme en tourisme, certification guide local, formation premiers secours..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="references">Références ou expériences antérieures</Label>
                <Textarea
                  id="references"
                  value={formData.references}
                  onChange={(e) => setFormData(prev => ({ ...prev, references: e.target.value }))}
                  placeholder="ex: Ancien guide chez XYZ Tours, bénévole office de tourisme..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Site web / Portfolio</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="socialMedia">Réseaux sociaux</Label>
                  <Input
                    id="socialMedia"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData(prev => ({ ...prev, socialMedia: e.target.value }))}
                    placeholder="Instagram, Facebook, LinkedIn..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conditions */}
          <Card className="shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                  required
                />
                <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                  J'accepte les <Link href="/terms" className="text-blue-600 hover:underline">conditions d'utilisation</Link> et 
                  les <Link href="/guide-terms" className="text-blue-600 hover:underline">conditions spécifiques aux guides</Link> de TRIPERS *
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeDataProcessing"
                  checked={formData.agreeDataProcessing}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeDataProcessing: checked as boolean }))}
                  required
                />
                <Label htmlFor="agreeDataProcessing" className="text-sm leading-relaxed">
                  J'accepte que mes données personnelles soient traitées pour l'examen de ma candidature et, 
                  en cas d'approbation, pour la création de mon profil guide sur TRIPERS *
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Soumission en cours..." : "Soumettre ma candidature"}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-3">
                Votre candidature sera examinée par notre équipe dans un délai de 3-5 jours ouvrés.
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
