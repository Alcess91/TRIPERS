"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, MapPin, Search, Filter, Plus, Mail, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

// Données vides - plus d'activités fictives
const upcomingActivities: any[] = []
const pastActivities: any[] = []

// Types d'activités disponibles
const activityTypes = [
  { id: "culture", name: "Culture & Art", icon: "🎨" },
  { id: "food", name: "Gastronomie", icon: "🍽️" },
  { id: "history", name: "Histoire", icon: "🏛️" },
  { id: "nature", name: "Nature", icon: "🌿" },
  { id: "nightlife", name: "Vie nocturne", icon: "🌙" },
  { id: "shopping", name: "Shopping", icon: "🛍️" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "architecture", name: "Architecture", icon: "🏗️" },
]

const priceRanges = [
  { id: "0-25", name: "0€ - 25€" },
  { id: "25-50", name: "25€ - 50€" },
  { id: "50-100", name: "50€ - 100€" },
  { id: "100+", name: "100€+" },
]

const timeSlots = [
  { id: "morning", name: "Matin (8h-12h)" },
  { id: "afternoon", name: "Après-midi (12h-18h)" },
  { id: "evening", name: "Soirée (18h-22h)" },
  { id: "night", name: "Nuit (22h+)" },
]

export default function ActivitiesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("upcoming")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    price: "",
    time: "",
    date: "",
  })

  const handleFilter = () => {
    setShowFilterDialog(true)
  }

  const applyFilters = () => {
    // Logique de filtrage ici
    setShowFilterDialog(false)
    console.log("Filtres appliqués:", filters)
  }

  const resetFilters = () => {
    setFilters({
      type: "",
      price: "",
      time: "",
      date: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50">
      {/* Header coloré */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">TRIPERS</div>
          <div className="flex items-center space-x-3">
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">{t("activities.title")}</h1>
          </div>
        </div>
      </div>

      {/* Barre de recherche colorée */}
      <div className="bg-white px-4 py-3 border-b border-cyan-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 h-5 w-5" />
          <Input
            placeholder="Rechercher une activité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200 focus:ring-cyan-500/20"
          />
          <Button
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
            onClick={handleFilter}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mx-4 mt-4 bg-white border border-cyan-200">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-600 data-[state=active]:text-white"
          >
            {t("activities.upcoming")}
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-600 data-[state=active]:text-white"
          >
            {t("activities.past")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 mx-4 space-y-4">
          {upcomingActivities.length === 0 ? (
            <Card className="border-cyan-200">
              <CardContent className="p-8 text-center">
                <div className="text-cyan-500">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <p className="font-medium text-cyan-800">Aucune activité à venir</p>
                  <p className="text-sm mt-2 text-cyan-600">Explorez la carte pour découvrir des guides locaux</p>
                  <Link href="/explore">
                    <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Découvrir des activités
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            upcomingActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden border-cyan-200">
                <CardContent className="p-4">{/* Contenu des activités à venir */}</CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-4 mx-4 space-y-4">
          {pastActivities.length === 0 ? (
            <Card className="border-cyan-200">
              <CardContent className="p-8 text-center">
                <div className="text-cyan-500">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <p className="font-medium text-cyan-800">Aucune activité passée</p>
                  <p className="text-sm mt-2 text-cyan-600">Vos activités terminées apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            pastActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden border-cyan-200">
                <CardContent className="p-4">{/* Contenu des activités passées */}</CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogue de filtres */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-cyan-800">Filtrer les activités</DialogTitle>
            <DialogDescription>Affinez votre recherche avec ces filtres</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'activité</label>
              <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                <SelectTrigger className="border-cyan-200 focus:ring-cyan-500/20">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <Select value={filters.price} onValueChange={(value) => setFilters({ ...filters, price: value })}>
                <SelectTrigger className="border-cyan-200 focus:ring-cyan-500/20">
                  <SelectValue placeholder="Sélectionner un budget" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Moment de la journée</label>
              <Select value={filters.time} onValueChange={(value) => setFilters({ ...filters, time: value })}>
                <SelectTrigger className="border-cyan-200 focus:ring-cyan-500/20">
                  <SelectValue placeholder="Sélectionner un moment" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <Input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="border-cyan-200 focus:ring-cyan-500/20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetFilters} className="border-cyan-200 text-cyan-600">
              Réinitialiser
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
            >
              Appliquer les filtres
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navigation inférieure colorée */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-3">
          <Link href="/explore" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-orange-600 group-hover:text-orange-700">{t("nav.explore")}</span>
          </Link>
          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-1">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-cyan-600">{t("nav.activities")}</span>
          </div>
          <Link href="/messages" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-purple-600 group-hover:text-purple-700">{t("nav.messages")}</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-emerald-600 group-hover:text-emerald-700">{t("nav.profile")}</span>
          </Link>
        </div>
      </div>

      {/* Espacement pour la navigation */}
      <div className="h-20"></div>
    </div>
  )
}
