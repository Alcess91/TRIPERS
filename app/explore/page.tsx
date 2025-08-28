"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import RealWorldMap from "@/components/real-world-map"
import BottomNavigation from "@/components/BottomNavigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, MessageCircle } from "lucide-react"

// Données d'exemple de tripers
const mockTripers = [
  {
    id: 1,
    name: "Marie Dubois",
    location: "Paris, France",
    latitude: 48.8566,
    longitude: 2.3522,
    avatar_url: "/placeholder-user.jpg",
    rating: 4.9,
    specialties: ["Architecture", "Gastronomie", "Histoire"],
    bio: "Guide passionnée de Paris depuis 10 ans. Je vous ferai découvrir les secrets cachés de la capitale française."
  },
  {
    id: 2,
    name: "Kenji Tanaka",
    location: "Tokyo, Japon",
    latitude: 35.6762,
    longitude: 139.6503,
    avatar_url: "/placeholder-user.jpg",
    rating: 4.8,
    specialties: ["Culture", "Temples", "Street Food"],
    bio: "Découvrez le vrai Tokyo avec un local ! De Shibuya aux temples traditionnels."
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    location: "Barcelona, Espagne", 
    latitude: 41.3851,
    longitude: 2.1734,
    avatar_url: "/placeholder-user.jpg",
    rating: 4.7,
    specialties: ["Art", "Plages", "Vie nocturne"],
    bio: "Architecte et guide à Barcelone. Je vous montrerai les œuvres de Gaudí et la vraie culture catalane."
  },
  {
    id: 4,
    name: "Amara Johnson",
    location: "New York, USA",
    latitude: 40.7128,
    longitude: -74.0060,
    avatar_url: "/placeholder-user.jpg",
    rating: 4.9,
    specialties: ["Museums", "Food Tours", "Broadway"],
    bio: "NYC native with 15 years experience showing visitors the best of the Big Apple."
  }
]

export default function ExplorePage() {
  const { user } = useAuth()
  const [selectedTriper, setSelectedTriper] = useState<any>(null)
  const [tripers] = useState(mockTripers)

  const handleTriperClick = (triper: any) => {
    setSelectedTriper(triper)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
                TRIPERS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Bonjour, {user?.first_name || user?.email}!
              </span>
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user?.first_name?.[0] || user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Carte du monde */}
        <div className="flex-1 relative">
          <RealWorldMap 
            tripers={tripers}
            onTriperClick={handleTriperClick}
            selectedTriper={selectedTriper}
            mapCenter={null}
          />
        </div>

        {/* Panneau latéral */}
        <div className="w-96 bg-white shadow-lg overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTriper ? "Guide sélectionné" : "Guides disponibles"}
            </h2>

            {selectedTriper ? (
              /* Détails du guide sélectionné */
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedTriper.avatar_url} />
                      <AvatarFallback>{selectedTriper.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedTriper.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedTriper.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{selectedTriper.rating}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">{selectedTriper.bio}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Spécialités</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTriper.specialties.map((specialty: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Voir le profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Liste des guides */
              <div className="space-y-4">
                {tripers.map((triper) => (
                  <Card 
                    key={triper.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleTriperClick(triper)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={triper.avatar_url} />
                          <AvatarFallback>{triper.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{triper.name}</p>
                          <p className="text-xs text-gray-600 truncate">{triper.location}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="ml-1 text-xs">{triper.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Barre de navigation en bas */}
      <BottomNavigation />
    </div>
  )
}
