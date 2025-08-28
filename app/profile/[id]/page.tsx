"use client"

import { useState } from "react"
import { ArrowLeft, Star, MessageCircle, Share2, Heart, MapPin, Globe, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Données simulées du profil
const triperProfile = {
  id: 1,
  name: "Marie Dubois",
  location: "Paris, France",
  avatar: "/placeholder.svg?height=120&width=120&query=french woman guide",
  coverImage: "/placeholder.svg?height=200&width=400&query=paris skyline",
  rating: 4.9,
  reviewCount: 127,
  languages: ["Français", "English", "Español", "Italiano"],
  specialties: ["Art & Culture", "Gastronomie", "Histoire", "Architecture"],
  status: "approved",
  bio: "Passionnée de Paris depuis toujours, je suis guide certifiée depuis 8 ans. J'adore partager les secrets de ma ville natale avec des voyageurs du monde entier. Spécialisée dans l'art, la gastronomie et l'histoire parisienne.",
  joinDate: "Mars 2020",
  responseTime: "< 1 heure",
  completedTours: 234,
  certifications: ["Guide Officiel Paris", "Certification Gastronomie", "First Aid"],
  socialMedia: {
    discord: "marie_paris_guide",
    instagram: "@marie_paris_tours",
  },
}

const reviews = [
  {
    id: 1,
    author: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40&query=american man tourist",
    rating: 5,
    date: "Il y a 2 jours",
    comment:
      "Marie est une guide exceptionnelle ! Elle connaît tous les secrets de Paris et nous a fait découvrir des endroits magnifiques. Très recommandée !",
  },
  {
    id: 2,
    author: "Sofia Garcia",
    avatar: "/placeholder.svg?height=40&width=40&query=spanish woman tourist",
    rating: 5,
    date: "Il y a 1 semaine",
    comment:
      "Une expérience inoubliable avec Marie. Sa passion pour Paris est contagieuse et ses recommandations gastronomiques étaient parfaites.",
  },
  {
    id: 3,
    author: "Hiroshi Yamamoto",
    avatar: "/placeholder.svg?height=40&width=40&query=japanese man tourist",
    rating: 4,
    date: "Il y a 2 semaines",
    comment:
      "Très bonne guide, très professionnelle. Elle parle plusieurs langues et s'adapte bien aux besoins des touristes.",
  },
]

const photos = [
  "/placeholder.svg?height=200&width=200&query=louvre museum tour",
  "/placeholder.svg?height=200&width=200&query=paris cafe experience",
  "/placeholder.svg?height=200&width=200&query=eiffel tower sunset",
  "/placeholder.svg?height=200&width=200&query=montmartre streets",
  "/placeholder.svg?height=200&width=200&query=seine river cruise",
  "/placeholder.svg?height=200&width=200&query=paris food market",
]

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/explore">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Profil du Guide</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image de couverture et profil */}
      <div className="relative">
        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${triperProfile.coverImage})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="absolute -bottom-16 left-4">
          <Avatar className="w-32 h-32 border-4 border-white">
            <AvatarImage src={triperProfile.avatar || "/placeholder.svg"} alt={triperProfile.name} />
            <AvatarFallback className="text-2xl">
              {triperProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Informations principales */}
      <div className="pt-20 px-4 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{triperProfile.name}</h1>
            <div className="flex items-center space-x-1 text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{triperProfile.location}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{triperProfile.rating}</span>
                <span>({triperProfile.reviewCount} avis)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Membre depuis {triperProfile.joinDate}</span>
              </div>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            {triperProfile.status === "approved" ? "Vérifié" : "En attente"}
          </Badge>
        </div>

        {/* Boutons d'action */}
        <div className="flex space-x-3 mb-6">
          <Link href="/messages" className="flex-1">
            <Button className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contacter
            </Button>
          </Link>
          <Button variant="outline" className="flex-1">
            <Globe className="h-4 w-4 mr-2" />
            Discord
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{triperProfile.completedTours}</div>
              <div className="text-sm text-gray-600">Tours Complétés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{triperProfile.responseTime}</div>
              <div className="text-sm text-gray-600">Temps de Réponse</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{triperProfile.languages.length}</div>
              <div className="text-sm text-gray-600">Langues</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="certif">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Biographie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{triperProfile.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spécialités</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {triperProfile.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Langues Parlées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {triperProfile.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                      <AvatarFallback>
                        {review.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{review.author}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${photo})` }}
                ></div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certif" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {triperProfile.certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{cert}</span>
                    </div>
                  ))}
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
