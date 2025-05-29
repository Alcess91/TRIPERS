"use client"

import { useState } from "react"
import {
  User,
  LogOut,
  MapPin,
  Globe,
  Calendar,
  Bell,
  Lock,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  Mail,
  UserCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("overview")

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  // Données du profil utilisateur - RÉINITIALISÉES
  const userProfile = {
    level: 0,
    points: 0,
    nextLevelPoints: 100,
    stats: {
      trips: 0,
      guides: 0,
      destinations: 0,
    },
    bio: "",
    languages: [],
    interests: [],
    favoriteDestinations: [],
    achievements: [
      {
        id: 1,
        title: "Premier Pas",
        description: "Créer votre profil",
        icon: "👋",
        progress: 100,
      },
      {
        id: 2,
        title: "Explorateur Débutant",
        description: "Visiter 3 destinations différentes",
        icon: "🌍",
        progress: 0,
      },
      {
        id: 3,
        title: "Gourmet",
        description: "Participer à 3 tours gastronomiques",
        icon: "🍽️",
        progress: 0,
      },
      {
        id: 4,
        title: "Polyglotte",
        description: "Parler 3 langues différentes",
        icon: "🗣️",
        progress: 0,
      },
      {
        id: 5,
        title: "Globe-trotter",
        description: "Visiter 3 continents",
        icon: "✈️",
        progress: 0,
      },
      {
        id: 6,
        title: "Photographe",
        description: "Partager 10 photos de voyage",
        icon: "📸",
        progress: 0,
      },
      {
        id: 7,
        title: "Ambassadeur",
        description: "Recommander l'app à 5 amis",
        icon: "🤝",
        progress: 0,
      },
      {
        id: 8,
        title: "Critique",
        description: "Laisser 5 avis détaillés",
        icon: "⭐",
        progress: 0,
      },
    ],
    trips: [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      {/* Header coloré */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">TRIPERS</div>
          <div className="flex items-center space-x-3">
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">{t("profile.title")}</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/20">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profil utilisateur */}
      <div className="p-4">
        <Card className="mb-4 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-4 border-emerald-200">
                <AvatarImage
                  src={user?.avatar_url || "/placeholder.svg?height=60&width=60&query=user avatar"}
                  alt={user?.name || "Utilisateur"}
                />
                <AvatarFallback className="bg-emerald-100 text-emerald-600">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-bold text-emerald-800">{user?.name || "Nouvel utilisateur"}</h2>
                  <Link href="/profile/edit">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                    >
                      {t("profile.edit")}
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center text-emerald-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Localisation non définie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white border-0">
                    {t("profile.level")} {userProfile.level}
                  </Badge>
                  <span className="text-sm text-emerald-600">
                    {userProfile.points} / {userProfile.nextLevelPoints} {t("profile.points")}
                  </span>
                </div>
                <Progress
                  value={(userProfile.points / userProfile.nextLevelPoints) * 100}
                  className="h-2 mt-2 bg-emerald-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques colorées */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{userProfile.stats.trips}</div>
              <div className="text-sm text-orange-600">{t("profile.stats.trips")}</div>
            </CardContent>
          </Card>
          <Card className="border-cyan-200">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-cyan-600">{userProfile.stats.guides}</div>
              <div className="text-sm text-cyan-600">{t("profile.stats.guides")}</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{userProfile.stats.destinations}</div>
              <div className="text-sm text-purple-600">{t("profile.stats.destinations")}</div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets colorés */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-emerald-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              {t("profile.tabs.overview")}
            </TabsTrigger>
            <TabsTrigger
              value="trips"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              {t("profile.tabs.trips")}
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              {t("profile.tabs.achievements")}
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
            >
              {t("profile.tabs.settings")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="border-emerald-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-emerald-800">{t("profile.bio")}</h3>
                {userProfile.bio ? (
                  <p className="text-gray-700">{userProfile.bio}</p>
                ) : (
                  <p className="text-emerald-500 italic">Ajoutez une biographie pour vous présenter aux guides</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-emerald-800">{t("profile.languages")}</h3>
                {userProfile.languages.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userProfile.languages.map((language) => (
                      <Badge key={language} className="bg-emerald-100 text-emerald-700 border-emerald-300">
                        {language}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-emerald-500 italic">Aucune langue ajoutée</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-emerald-800">{t("profile.interests")}</h3>
                {userProfile.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest) => (
                      <Badge key={interest} className="bg-cyan-100 text-cyan-700 border-cyan-300">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-emerald-500 italic">Aucun centre d'intérêt ajouté</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-emerald-800">{t("profile.favorites")}</h3>
                {userProfile.favoriteDestinations.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userProfile.favoriteDestinations.map((destination) => (
                      <Badge key={destination} className="bg-orange-100 text-orange-700 border-orange-300">
                        {destination}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-emerald-500 italic">Aucune destination favorite</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trips" className="space-y-4 mt-4">
            {userProfile.trips.length === 0 ? (
              <Card className="border-emerald-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-emerald-800">Aucun voyage pour le moment</h3>
                  <p className="text-emerald-600 mb-4">Commencez à explorer pour créer vos premiers souvenirs !</p>
                  <Link href="/explore">
                    <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                      Découvrir des destinations
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              userProfile.trips.map((trip) => (
                <Card key={trip.id} className="border-emerald-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-20 h-20 rounded-lg bg-cover bg-center border-2 border-emerald-200"
                        style={{ backgroundImage: `url(${trip.image})` }}
                      ></div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-emerald-800">{trip.destination}</h3>
                        <p className="text-emerald-600">{trip.date}</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-emerald-500 mr-1" />
                          <span className="text-sm text-emerald-600">{trip.activities} activités</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                      >
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-4">
            {userProfile.achievements.map((achievement) => (
              <Card key={achievement.id} className="border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-2xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-emerald-800">{achievement.title}</h3>
                      <p className="text-sm text-emerald-600">{achievement.description}</p>
                      <Progress value={achievement.progress} className="h-2 mt-2 bg-emerald-100" />
                    </div>
                    <Badge
                      className={
                        achievement.progress === 100
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0"
                          : "bg-emerald-100 text-emerald-700 border-emerald-300"
                      }
                    >
                      {achievement.progress}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Link href="/profile/notifications">
                <Card className="border-emerald-200 hover:bg-emerald-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Bell className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-emerald-800">{t("profile.settings.notifications")}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/profile/privacy">
                <Card className="border-emerald-200 hover:bg-emerald-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                          <Lock className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-emerald-800">{t("profile.settings.privacy")}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/profile/language">
                <Card className="border-emerald-200 hover:bg-emerald-50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <Globe className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-emerald-800">{t("profile.settings.language")}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="border-emerald-200 hover:bg-emerald-50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                        <HelpCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-emerald-800">{t("profile.settings.help")}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardContent className="p-4">
                  <Button
                    variant="destructive"
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t("profile.settings.logout")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Navigation inférieure colorée */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-3">
          <Link href="/explore" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-orange-600 group-hover:text-orange-700">{t("nav.explore")}</span>
          </Link>
          <Link href="/activities" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-cyan-600 group-hover:text-cyan-700">{t("nav.activities")}</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-purple-600 group-hover:text-purple-700">{t("nav.messages")}</span>
          </Link>
          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-1">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-emerald-600">{t("nav.profile")}</span>
          </div>
        </div>
      </div>

      {/* Espacement pour la navigation */}
      <div className="h-20"></div>
    </div>
  )
}
