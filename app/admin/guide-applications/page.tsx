"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  MapPin, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  Check, 
  X, 
  Eye,
  Users,
  Calendar,
  Languages,
  Star,
  FileText,
  Shield
} from "lucide-react"

interface GuideApplication {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  city: string
  region: string
  country: string
  yearsInCity: string
  yearsAsGuide: string
  languages: string[]
  specialties: string[]
  motivation: string
  experience: string
  availability: string
  tourTypes: string[]
  certifications: string
  references: string
  website: string
  socialMedia: string
  status: 'en_attente' | 'approuve' | 'rejete'
  submittedAt: string
}

export default function AdminGuideApplicationsPage() {
  const [applications, setApplications] = useState<GuideApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<GuideApplication | null>(null)
  const [activeTab, setActiveTab] = useState('en_attente')
  const [isLoading, setIsLoading] = useState(true)

  // Simuler le chargement des candidatures
  useEffect(() => {
    const loadApplications = async () => {
      setIsLoading(true)
      try {
        // Simulation de données
        const mockApplications: GuideApplication[] = [
          {
            id: 'GUIDE_1704028800_abc123',
            email: 'marie.dubois@gmail.com',
            firstName: 'Marie',
            lastName: 'Dubois',
            phone: '+33 6 12 34 56 78',
            dateOfBirth: '1985-03-15',
            city: 'Paris',
            region: 'Île-de-France',
            country: 'France',
            yearsInCity: 'natif',
            yearsAsGuide: '3-5',
            languages: ['Français', 'Anglais', 'Espagnol'],
            specialties: ['Histoire', 'Gastronomie', 'Art'],
            motivation: "Je suis passionnée par l'histoire de Paris et j'adore faire découvrir les secrets de ma ville natale aux visiteurs. Ayant grandi ici, je connais tous les recoins cachés et les meilleures adresses locales.",
            experience: "Guide touristique freelance depuis 3 ans, j'ai accompagné plus de 500 visiteurs. Formation en histoire de l'art à la Sorbonne.",
            availability: "Disponible tous les week-ends et en soirée en semaine",
            tourTypes: ['Visite à pied', 'Tour gastronomique', 'Tour historique'],
            certifications: "Diplôme de guide conférencier, Certification premiers secours",
            references: "Ancienne guide chez Paris Walks, excellentes évaluations sur TripAdvisor",
            website: "https://paris-secrets.com",
            socialMedia: "@marieguide_paris",
            status: 'en_attente',
            submittedAt: '2024-01-01T10:00:00Z'
          },
          {
            id: 'GUIDE_1704115200_def456',
            email: 'jean.martin@outlook.fr',
            firstName: 'Jean',
            lastName: 'Martin',
            phone: '+33 6 98 76 54 32',
            dateOfBirth: '1992-07-22',
            city: 'Lyon',
            region: 'Rhône-Alpes',
            country: 'France',
            yearsInCity: '6-10',
            yearsAsGuide: 'debutant',
            languages: ['Français', 'Anglais'],
            specialties: ['Gastronomie', 'Nature'],
            motivation: "Nouveau dans le domaine du guidage mais très motivé ! J'ai déménagé à Lyon pour mes études et je suis tombé amoureux de cette ville. Je veux partager cette passion.",
            experience: "Bénévole à l'office de tourisme de Lyon, organisation de visites pour les étudiants internationaux de mon université.",
            availability: "Flexible, principalement week-ends",
            tourTypes: ['Visite à pied', 'Tour gastronomique'],
            certifications: "",
            references: "Recommandation de l'office de tourisme de Lyon",
            website: "",
            socialMedia: "",
            status: 'en_attente',
            submittedAt: '2024-01-02T14:30:00Z'
          }
        ]
        
        setApplications(mockApplications)
      } catch (error) {
        console.error('Erreur lors du chargement des candidatures:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadApplications()
  }, [])

  const handleApprove = async (applicationId: string) => {
    // TODO: Appel API pour approuver
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'approuve' as const }
          : app
      )
    )
    console.log(`Candidature ${applicationId} approuvée`)
  }

  const handleReject = async (applicationId: string) => {
    // TODO: Appel API pour rejeter
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'rejete' as const }
          : app
      )
    )
    console.log(`Candidature ${applicationId} rejetée`)
  }

  const filteredApplications = applications.filter(app => app.status === activeTab)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>
      case 'approuve':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvé</Badge>
      case 'rejete':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeté</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des candidatures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administration des Guides
          </h1>
          <p className="text-gray-600">
            Gérez les candidatures des guides locaux
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'en_attente').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Check className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approuvés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'approuve').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <X className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejetés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => app.status === 'rejete').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des candidatures */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Candidatures</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="en_attente">En attente</TabsTrigger>
                    <TabsTrigger value="approuve">Approuvés</TabsTrigger>
                    <TabsTrigger value="rejete">Rejetés</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="mt-4">
                    <div className="space-y-4">
                      {filteredApplications.length === 0 ? (
                        <Alert>
                          <AlertDescription>
                            Aucune candidature trouvée dans cette catégorie.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        filteredApplications.map((application) => (
                          <Card 
                            key={application.id} 
                            className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                              selectedApplication?.id === application.id ? 'border-blue-500 bg-blue-50' : ''
                            }`}
                            onClick={() => setSelectedApplication(application)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                      {application.firstName[0]}{application.lastName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      {application.firstName} {application.lastName}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {application.city}, {application.country}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <Mail className="h-4 w-4 mr-1" />
                                      {application.email}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  {getStatusBadge(application.status)}
                                  <p className="text-xs text-gray-500 mt-2">
                                    {new Date(application.submittedAt).toLocaleDateString('fr-FR')}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Détails de la candidature sélectionnée */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Détails de la candidature
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Informations personnelles */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-500" />
                      Informations personnelles
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedApplication.firstName} {selectedApplication.lastName}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedApplication.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedApplication.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{new Date(selectedApplication.dateOfBirth).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Localisation */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-green-500" />
                      Localisation
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Ville:</strong> {selectedApplication.city}</p>
                      <p><strong>Région:</strong> {selectedApplication.region}</p>
                      <p><strong>Pays:</strong> {selectedApplication.country}</p>
                      <p><strong>Vit dans la ville depuis:</strong> {selectedApplication.yearsInCity}</p>
                      <p><strong>Expérience guide:</strong> {selectedApplication.yearsAsGuide}</p>
                    </div>
                  </div>

                  {/* Langues et spécialités */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Languages className="h-4 w-4 mr-2 text-purple-500" />
                      Compétences
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Langues:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedApplication.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Spécialités:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedApplication.specialties.map((spec) => (
                            <Badge key={spec} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Motivation
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedApplication.motivation}
                    </p>
                  </div>

                  {/* Expérience */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-indigo-500" />
                      Expérience
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedApplication.experience}
                    </p>
                  </div>

                  {/* Actions */}
                  {selectedApplication.status === 'en_attente' && (
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        onClick={() => handleApprove(selectedApplication.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approuver
                      </Button>
                      <Button 
                        onClick={() => handleReject(selectedApplication.id)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Rejeter
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Sélectionnez une candidature pour voir les détails
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
