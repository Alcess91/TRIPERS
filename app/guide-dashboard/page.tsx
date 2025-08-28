"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Star,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  Edit,
  MapPin,
  Clock,
  DollarSign,
  BarChart2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function GuideDashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("overview")

  // Vérifier si l'utilisateur est un guide
  useEffect(() => {
    if (user && user.role !== "guide") {
      router.push("/auth")
    }
  }, [user, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  // Données de démonstration pour le tableau de bord du guide
  const stats = {
    totalBookings: 24,
    pendingRequests: 5,
    completedTours: 19,
    averageRating: 4.8,
    reviewCount: 42,
    monthlyEarnings: 1250,
    viewsThisMonth: 156,
  }

  const upcomingTours = [
    {
      id: 1,
      client: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40&query=american man tourist",
      date: "Demain",
      time: "14:00 - 17:00",
      tourType: "Visite du Louvre",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Sofia Garcia",
      avatar: "/placeholder.svg?height=40&width=40&query=spanish woman tourist",
      date: "12 Juin",
      time: "10:00 - 13:00",
      tourType: "Gastronomie locale",
      status: "confirmed",
    },
    {
      id: 3,
      client: "Hiroshi Yamamoto",
      avatar: "/placeholder.svg?height=40&width=40&query=japanese man tourist",
      date: "15 Juin",
      time: "15:00 - 18:00",
      tourType: "Quartiers historiques",
      status: "pending",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      author: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40&query=american man tourist",
      rating: 5,
      date: "Il y a 2 jours",
      comment: "Marie est une guide exceptionnelle ! Elle connaît tous les secrets de Paris.",
    },
    {
      id: 2,
      author: "Sofia Garcia",
      avatar: "/placeholder.svg?height=40&width=40&query=spanish woman tourist",
      rating: 5,
      date: "Il y a 1 semaine",
      comment: "Une expérience inoubliable. Sa passion pour Paris est contagieuse.",
    },
  ]

  const myTours = [
    {
      id: 1,
      title: "Paris Artistique",
      duration: "3 heures",
      price: "€60",
      description: "Découverte des musées et galeries d'art parisiennes",
      bookings: 12,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Gastronomie Parisienne",
      duration: "4 heures",
      price: "€75",
      description: "Dégustation des spécialités françaises dans des bistrots authentiques",
      bookings: 8,
      rating: 4.7,
    },
    {
      id: 3,
      title: "Paris Historique",
      duration: "3 heures",
      price: "€55",
      description: "Visite des monuments et quartiers historiques de Paris",
      bookings: 15,
      rating: 4.8,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Tableau de Bord Guide</h1>
          </div>
          <div className="flex items-center space-x-2">
            {user && (
              <>
                <span className="text-sm text-gray-600">Bonjour, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Profil du guide */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={user?.avatar_url || "/placeholder.svg?height=60&width=60&query=guide avatar"}
                  alt={user?.name || "Guide"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "G"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-bold">{user?.name || "Guide Local"}</h2>
                  <Badge className="bg-green-100 text-green-800">Guide Vérifié</Badge>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Paris, France</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{stats.averageRating}</span>
                    <span className="ml-1 text-xs text-gray-500">({stats.reviewCount} avis)</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="ml-1 text-sm">{stats.completedTours} visites guidées</span>
                  </div>
                </div>
              </div>
              <div>
                <Link href="/guide-profile">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Éditer Profil
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onglets */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="tours">Mes Tours</TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600">{stats.totalBookings}</div>
                  <div className="text-sm text-gray-600">Réservations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Link href="/guide-requests">
                    <div className="cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <div className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</div>
                      <div className="text-sm text-gray-600">Demandes reçues</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold text-yellow-600">{stats.averageRating}</div>
                  <div className="text-sm text-gray-600">Note moyenne</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">€{stats.monthlyEarnings}</div>
                  <div className="text-sm text-gray-600">Ce mois-ci</div>
                </CardContent>
              </Card>
            </div>

            {/* Prochaines visites */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prochaines visites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTours.length > 0 ? (
                    upcomingTours.map((tour) => (
                      <div key={tour.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={tour.avatar || "/placeholder.svg"} alt={tour.client} />
                            <AvatarFallback>{tour.client.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{tour.client}</h4>
                            <p className="text-sm text-gray-600">{tour.tourType}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {tour.date}, {tour.time}
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={
                            tour.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {tour.status === "confirmed" ? "Confirmé" : "En attente"}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Aucune visite programmée</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Statistiques de performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Taux de réponse</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Taux de conversion</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Satisfaction client</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tours" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Créer un nouveau tour
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTours.map((tour) => (
                <Card key={tour.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{tour.title}</h3>
                      <Badge variant="outline">{tour.price}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{tour.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {tour.bookings} réservations
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {tour.rating}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        Statistiques
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Demandes en attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTours
                    .filter((tour) => tour.status === "pending")
                    .map((tour) => (
                      <div key={tour.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={tour.avatar || "/placeholder.svg"} alt={tour.client} />
                            <AvatarFallback>{tour.client.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{tour.client}</h4>
                            <p className="text-sm text-gray-600">{tour.tourType}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {tour.date}, {tour.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Accepter
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                            Refuser
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Réservations confirmées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTours
                    .filter((tour) => tour.status === "confirmed")
                    .map((tour) => (
                      <div key={tour.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={tour.avatar || "/placeholder.svg"} alt={tour.client} />
                            <AvatarFallback>{tour.client.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{tour.client}</h4>
                            <p className="text-sm text-gray-600">{tour.tourType}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {tour.date}, {tour.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="text-gray-600">
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avis récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques des avis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-yellow-600">{stats.averageRating}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(stats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{stats.reviewCount} avis au total</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 w-16">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <Progress
                            value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 0 : 0}
                            className="h-2"
                          />
                        </div>
                        <div className="w-12 text-right text-sm text-gray-600">
                          {rating === 5
                            ? "75%"
                            : rating === 4
                              ? "20%"
                              : rating === 3
                                ? "5%"
                                : rating === 2
                                  ? "0%"
                                  : "0%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Navigation inférieure */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around py-2">
          <button
            className={`flex flex-col items-center p-2 ${
              selectedTab === "overview" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setSelectedTab("overview")}
          >
            <BarChart2 className="h-6 w-6" />
            <span className="text-xs mt-1">Aperçu</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${selectedTab === "tours" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setSelectedTab("tours")}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs mt-1">Tours</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${
              selectedTab === "bookings" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setSelectedTab("bookings")}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Réservations</span>
          </button>
          <Link href="/messages" className="flex flex-col items-center p-2 text-gray-600">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link href="/guide-profile" className="flex flex-col items-center p-2 text-gray-600">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>

      {/* Espacement pour la navigation */}
      <div className="h-20"></div>
    </div>
  )
}
