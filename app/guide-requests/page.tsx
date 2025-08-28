"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Check, X, MessageCircle, Calendar, MapPin, Globe, Activity, Users, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Données simulées des demandes reçues par le guide
const initialIncomingRequests = [
  {
    id: 1,
    from: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40&query=american man tourist",
    location: "New York, USA",
    message:
      "Bonjour ! Je visite Paris la semaine prochaine et j'aimerais découvrir les secrets de votre belle ville avec un local passionné.",
    timestamp: "Il y a 2 heures",
    status: "pending",
    tourType: "Visite culturelle",
    proposedDate: "15 Juin 2024",
    proposedTime: "14:00",
  },
  {
    id: 2,
    from: "Sofia Garcia",
    avatar: "/placeholder.svg?height=40&width=40&query=spanish woman tourist",
    location: "Barcelona, Spain",
    message:
      "Hola ! Je suis très intéressée par vos tours gastronomiques. Pouvez-vous me recommander les meilleurs endroits ?",
    timestamp: "Il y a 5 heures",
    status: "pending",
    tourType: "Tour gastronomique",
    proposedDate: "18 Juin 2024",
    proposedTime: "11:00",
  },
]

const initialAcceptedRequests = [
  {
    id: 3,
    from: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40&query=british woman tourist",
    location: "London, UK",
    message: "Je serais ravie de découvrir l'art parisien avec vous !",
    timestamp: "Il y a 1 jour",
    status: "accepted",
    tourType: "Visite artistique",
    confirmedDate: "20 Juin 2024",
    confirmedTime: "15:00",
  },
]

export default function GuideRequestsPage() {
  const [selectedTab, setSelectedTab] = useState("pending")
  const [incomingRequests, setIncomingRequests] = useState(initialIncomingRequests)
  const [acceptedRequests, setAcceptedRequests] = useState(initialAcceptedRequests)
  const [isLoading, setIsLoading] = useState(false)
  const [editingRequest, setEditingRequest] = useState<any>(null)
  const [editForm, setEditForm] = useState({
    date: "",
    time: "",
    location: "",
    notes: "",
  })

  // Fonction pour accepter une demande
  const handleAcceptRequest = async (requestId: number) => {
    setIsLoading(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Trouver la demande à accepter
      const requestToAccept = incomingRequests.find((req) => req.id === requestId)
      if (requestToAccept) {
        // Déplacer vers les demandes acceptées
        const acceptedRequest = {
          ...requestToAccept,
          status: "accepted",
          confirmedDate: requestToAccept.proposedDate,
          confirmedTime: requestToAccept.proposedTime,
        }

        setAcceptedRequests((prev) => [...prev, acceptedRequest])
        setIncomingRequests((prev) => prev.filter((req) => req.id !== requestId))

        alert(`Demande de ${requestToAccept.from} acceptée avec succès !`)
      }
    } catch (error) {
      console.error("Erreur lors de l'acceptation:", error)
      alert("Erreur lors de l'acceptation de la demande")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour refuser une demande
  const handleRejectRequest = async (requestId: number) => {
    setIsLoading(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const requestToReject = incomingRequests.find((req) => req.id === requestId)

      // Supprimer la demande de la liste
      setIncomingRequests((prev) => prev.filter((req) => req.id !== requestId))

      alert(`Demande de ${requestToReject?.from} refusée`)
    } catch (error) {
      console.error("Erreur lors du refus:", error)
      alert("Erreur lors du refus de la demande")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour modifier une demande acceptée
  const handleEditRequest = (request: any) => {
    setEditingRequest(request)
    setEditForm({
      date: request.confirmedDate || request.proposedDate,
      time: request.confirmedTime || request.proposedTime,
      location: "Lieu de rendez-vous",
      notes: "",
    })
  }

  // Fonction pour sauvegarder les modifications
  const handleSaveEdit = async () => {
    if (!editingRequest) return

    setIsLoading(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mettre à jour la demande
      setAcceptedRequests((prev) =>
        prev.map((req) =>
          req.id === editingRequest.id
            ? {
                ...req,
                confirmedDate: editForm.date,
                confirmedTime: editForm.time,
                location: editForm.location,
                notes: editForm.notes,
              }
            : req,
        ),
      )

      setEditingRequest(null)
      alert("Modifications sauvegardées avec succès !")
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
      alert("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour annuler une demande acceptée
  const handleCancelAcceptedRequest = async (requestId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) return

    setIsLoading(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const requestToCancel = acceptedRequests.find((req) => req.id === requestId)

      // Supprimer de la liste des acceptées
      setAcceptedRequests((prev) => prev.filter((req) => req.id !== requestId))

      alert(`Réservation avec ${requestToCancel?.from} annulée`)
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error)
      alert("Erreur lors de l'annulation")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link href="/guide-dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Demandes de Réservation</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Résumé rapide */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{incomingRequests.length}</div>
              <div className="text-sm text-gray-600">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{acceptedRequests.length}</div>
              <div className="text-sm text-gray-600">Acceptées</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                €{(incomingRequests.length + acceptedRequests.length) * 75}
              </div>
              <div className="text-sm text-gray-600">Revenus potentiels</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets des demandes */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">En Attente ({incomingRequests.length})</TabsTrigger>
            <TabsTrigger value="accepted">Acceptées ({acceptedRequests.length})</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="space-y-4">
              {incomingRequests.length > 0 ? (
                incomingRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.from} />
                          <AvatarFallback>
                            {request.from
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{request.from}</h3>
                              <p className="text-sm text-gray-600 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {request.location}
                              </p>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {request.timestamp}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="bg-white">
                                {request.tourType}
                              </Badge>
                              <div className="text-sm font-medium text-blue-800">
                                {request.proposedDate} à {request.proposedTime}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{request.message}</p>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id)}
                              disabled={isLoading}
                              className="bg-green-600 hover:bg-green-700 flex-1"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              {isLoading ? "Acceptation..." : "Accepter"}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectRequest(request.id)}
                              disabled={isLoading}
                              className="flex-1"
                            >
                              <X className="h-4 w-4 mr-1" />
                              {isLoading ? "Refus..." : "Refuser"}
                            </Button>
                            <Link href="/messages">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Discuter
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucune demande en attente</p>
                      <p className="text-sm mt-2">Les nouvelles demandes apparaîtront ici</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            <div className="space-y-4">
              {acceptedRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.from} />
                        <AvatarFallback>
                          {request.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{request.from}</h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {request.location}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-white">
                              {request.tourType}
                            </Badge>
                            <div className="text-sm font-medium text-green-800">
                              {request.confirmedDate} à {request.confirmedTime}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{request.message}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Link href="/messages" className="flex-1">
                            <Button size="sm" className="w-full">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Contacter
                            </Button>
                          </Link>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => handleEditRequest(request)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Modifier
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Modifier la réservation</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="date">Date</Label>
                                  <Input
                                    id="date"
                                    type="date"
                                    value={editForm.date}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, date: e.target.value }))}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="time">Heure</Label>
                                  <Input
                                    id="time"
                                    type="time"
                                    value={editForm.time}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, time: e.target.value }))}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="location">Lieu de rendez-vous</Label>
                                  <Input
                                    id="location"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                                    placeholder="Ex: Devant le Louvre"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="notes">Notes</Label>
                                  <Textarea
                                    id="notes"
                                    value={editForm.notes}
                                    onChange={(e) => setEditForm((prev) => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Informations supplémentaires..."
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <Button onClick={handleSaveEdit} disabled={isLoading} className="flex-1">
                                    {isLoading ? "Sauvegarde..." : "Sauvegarder"}
                                  </Button>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" className="flex-1">
                                      Annuler
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleCancelAcceptedRequest(request.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? "Annulation..." : "Annuler"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Historique des demandes</p>
                  <p className="text-sm mt-2">Les demandes passées apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Navigation inférieure */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link href="/guide-dashboard" className="flex flex-col items-center p-2 text-gray-600">
            <Globe className="h-6 w-6" />
            <span className="text-xs mt-1">Tableau de bord</span>
          </Link>
          <div className="flex flex-col items-center p-2 text-blue-600">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Demandes</span>
          </div>
          <Link href="/messages" className="flex flex-col items-center p-2 text-gray-600">
            <Activity className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link href="/guide-profile" className="flex flex-col items-center p-2 text-gray-600">
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        </div>
      </div>

      {/* Espacement pour la navigation */}
      <div className="h-20"></div>
    </div>
  )
}
