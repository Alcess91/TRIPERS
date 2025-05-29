"use client"

import { useState } from "react"
import { ArrowLeft, Search, Check, X, Eye, UserPlus, Share2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Données simulées pour l'administration
const pendingTripers = [
  {
    id: 5,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    avatar: "/placeholder.svg?height=40&width=40&query=spanish woman guide",
    appliedDate: "Il y a 2 jours",
    languages: ["Español", "English", "Français"],
    specialties: ["Flamenco", "Gastronomie"],
    bio: "Danseuse de flamenco professionnelle, je souhaite partager la culture espagnole authentique.",
    status: "pending",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    location: "Marrakech, Morocco",
    avatar: "/placeholder.svg?height=40&width=40&query=moroccan man guide",
    appliedDate: "Il y a 3 jours",
    languages: ["العربية", "Français", "English"],
    specialties: ["Médina", "Artisanat"],
    bio: "Guide local de Marrakech depuis 5 ans, spécialisé dans l'artisanat traditionnel.",
    status: "pending",
  },
  {
    id: 7,
    name: "Lisa Chen",
    location: "Singapore",
    avatar: "/placeholder.svg?height=40&width=40&query=asian woman guide",
    appliedDate: "Il y a 5 jours",
    languages: ["English", "中文", "Bahasa"],
    specialties: ["Street Food", "Architecture"],
    bio: "Architecte passionnée par l'urbanisme de Singapour et sa scène culinaire.",
    status: "pending",
  },
]

const inviteStats = {
  totalInvites: 156,
  acceptedInvites: 89,
  pendingInvites: 34,
  conversionRate: 57,
}

const platformStats = {
  totalTripers: 1247,
  activeTripers: 892,
  totalConnections: 5634,
  monthlyGrowth: 12,
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [inviteLink, setInviteLink] = useState("https://tripers.app/invite/admin123")

  const handleApprove = (triperId: number) => {
    console.log(`Approving Triper ${triperId}`)
    // Ici on ajouterait la logique d'approbation
  }

  const handleReject = (triperId: number) => {
    console.log(`Rejecting Triper ${triperId}`)
    // Ici on ajouterait la logique de rejet
  }

  const generateInviteLink = () => {
    const newLink = `https://tripers.app/invite/${Math.random().toString(36).substr(2, 9)}`
    setInviteLink(newLink)
  }

  const shareInviteLink = (platform: string) => {
    const text =
      "Rejoignez TRIPERS et devenez un guide local ! Partagez votre passion pour votre ville avec des voyageurs du monde entier."
    const url = inviteLink

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`)
        break
      case "instagram":
        navigator.clipboard.writeText(text + " " + url)
        alert("Lien copié ! Vous pouvez le partager sur Instagram.")
        break
      default:
        navigator.clipboard.writeText(url)
        alert("Lien copié !")
    }
  }

  const filteredTripers = pendingTripers.filter((triper) => {
    const matchesSearch =
      triper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      triper.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || triper.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link href="/explore">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Administration</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Statistiques générales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{platformStats.totalTripers}</div>
              <div className="text-sm text-gray-600">Total Tripers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{platformStats.activeTripers}</div>
              <div className="text-sm text-gray-600">Actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{platformStats.totalConnections}</div>
              <div className="text-sm text-gray-600">Connexions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">+{platformStats.monthlyGrowth}%</div>
              <div className="text-sm text-gray-600">Croissance</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets d'administration */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">En Attente</TabsTrigger>
            <TabsTrigger value="invites">Invitations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {/* Filtres */}
            <div className="flex space-x-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un candidat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Liste des candidats */}
            <div className="space-y-4">
              {filteredTripers.map((triper) => (
                <Card key={triper.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={triper.avatar || "/placeholder.svg"} alt={triper.name} />
                        <AvatarFallback>
                          {triper.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{triper.name}</h3>
                            <p className="text-sm text-gray-600">{triper.location}</p>
                            <p className="text-xs text-gray-500">Candidature : {triper.appliedDate}</p>
                          </div>
                          <Badge variant="outline">{triper.status === "pending" ? "En attente" : triper.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{triper.bio}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="text-xs text-gray-600">Langues:</div>
                          {triper.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <div className="text-xs text-gray-600">Spécialités:</div>
                          {triper.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(triper.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approuver
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(triper.id)}>
                            <X className="h-4 w-4 mr-1" />
                            Rejeter
                          </Button>
                          <Link href={`/profile/${triper.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir Profil
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invites" className="space-y-4">
            {/* Statistiques d'invitation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{inviteStats.totalInvites}</div>
                  <div className="text-sm text-gray-600">Total Invitations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{inviteStats.acceptedInvites}</div>
                  <div className="text-sm text-gray-600">Acceptées</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{inviteStats.pendingInvites}</div>
                  <div className="text-sm text-gray-600">En Attente</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{inviteStats.conversionRate}%</div>
                  <div className="text-sm text-gray-600">Taux Conversion</div>
                </CardContent>
              </Card>
            </div>

            {/* Générateur de liens d'invitation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Générer un Lien d'Invitation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input value={inviteLink} readOnly className="flex-1" />
                  <Button onClick={generateInviteLink}>Nouveau Lien</Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => shareInviteLink("whatsapp")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => shareInviteLink("instagram")}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                  <Button onClick={() => shareInviteLink("copy")} variant="outline" className="flex-1">
                    Copier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics de la Plateforme</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Croissance des Utilisateurs</h4>
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Graphique de croissance (simulation)</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Répartition Géographique</h4>
                    <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Carte de répartition (simulation)</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Taux d'Engagement</h4>
                    <div className="h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Métriques d'engagement (simulation)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Espacement pour la navigation */}
      <div className="h-20"></div>
    </div>
  )
}
