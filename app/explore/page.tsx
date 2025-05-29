"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Loader2, X, Calendar, Mail, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import RealWorldMap from "@/components/real-world-map"
import { useLanguage } from "@/contexts/LanguageContext"

// Données vides - plus de profils fictifs
const mockTripers: any[] = []

// Base de données de destinations populaires pour l'autocomplétion
const popularDestinations = [
  // Europe
  "Paris",
  "London",
  "Barcelona",
  "Rome",
  "Amsterdam",
  "Berlin",
  "Vienna",
  "Prague",
  "Budapest",
  "Madrid",
  "Lisbon",
  "Dublin",
  "Stockholm",
  "Copenhagen",
  "Oslo",
  "Helsinki",
  "Warsaw",
  "Krakow",
  "Athens",
  "Santorini",
  "Venice",
  "Florence",
  "Milan",
  "Naples",
  "Monaco",
  "Nice",
  "Cannes",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Brussels",
  "Antwerp",
  "Zurich",
  "Geneva",
  "Bern",
  "Salzburg",
  "Innsbruck",
  "Edinburgh",
  "Glasgow",
  "Manchester",

  // Asie
  "Tokyo",
  "Kyoto",
  "Osaka",
  "Seoul",
  "Busan",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Singapore",
  "Bangkok",
  "Phuket",
  "Chiang Mai",
  "Hanoi",
  "Ho Chi Minh City",
  "Kuala Lumpur",
  "Penang",
  "Jakarta",
  "Bali",
  "Manila",
  "Cebu",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Goa",
  "Jaipur",
  "Agra",
  "Varanasi",
  "Kerala",
  "Kathmandu",
  "Pokhara",
  "Colombo",
  "Kandy",
  "Dhaka",
  "Chittagong",
  "Islamabad",
  "Karachi",
  "Lahore",
  "Peshawar",

  // Amérique du Nord
  "New York",
  "Los Angeles",
  "San Francisco",
  "Chicago",
  "Miami",
  "Las Vegas",
  "Seattle",
  "Boston",
  "Washington DC",
  "Philadelphia",
  "Toronto",
  "Vancouver",
  "Montreal",
  "Calgary",
  "Ottawa",
  "Quebec City",
  "Mexico City",
  "Cancun",
  "Guadalajara",
  "Monterrey",

  // Amérique du Sud
  "Rio de Janeiro",
  "São Paulo",
  "Buenos Aires",
  "Lima",
  "Cusco",
  "Santiago",
  "Valparaiso",
  "Bogotá",
  "Medellín",
  "Cartagena",
  "Quito",
  "Guayaquil",
  "La Paz",
  "Sucre",
  "Montevideo",
  "Punta del Este",
  "Caracas",
  "Maracaibo",
  "Georgetown",
  "Paramaribo",

  // Afrique
  "Cairo",
  "Alexandria",
  "Cape Town",
  "Johannesburg",
  "Durban",
  "Marrakech",
  "Casablanca",
  "Fez",
  "Rabat",
  "Tunis",
  "Algiers",
  "Lagos",
  "Abuja",
  "Accra",
  "Kumasi",
  "Nairobi",
  "Mombasa",
  "Dar es Salaam",
  "Zanzibar",
  "Addis Ababa",

  // Océanie
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Auckland",
  "Wellington",
  "Christchurch",
  "Queenstown",
  "Rotorua",
  "Suva",
  "Nadi",
  "Port Moresby",
  "Honiara",
  "Port Vila",
  "Apia",
  "Nuku'alofa",
  "Tarawa",
  "Majuro",
  "Palikir",

  // Moyen-Orient
  "Dubai",
  "Abu Dhabi",
  "Doha",
  "Kuwait City",
  "Riyadh",
  "Jeddah",
  "Mecca",
  "Medina",
  "Muscat",
  "Salalah",
  "Manama",
  "Tehran",
  "Isfahan",
  "Shiraz",
  "Baghdad",
  "Basra",
  "Erbil",
  "Damascus",
  "Aleppo",
  "Beirut",
  "Amman",
  "Petra",
  "Aqaba",
  "Jerusalem",
  "Tel Aviv",
  "Haifa",
  "Ankara",
  "Istanbul",
  "Izmir",
  "Antalya",
]

// Fonction pour calculer la distance de Levenshtein (similarité entre chaînes)
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  return matrix[str2.length][str1.length]
}

// Fonction pour trouver des suggestions intelligentes
function findSuggestions(query: string, maxSuggestions = 5): string[] {
  if (!query || query.length < 2) return []

  const queryLower = query.toLowerCase()
  const suggestions: { destination: string; score: number }[] = []

  popularDestinations.forEach((destination) => {
    const destLower = destination.toLowerCase()

    // Score basé sur plusieurs critères
    let score = 0

    // Correspondance exacte au début (score élevé)
    if (destLower.startsWith(queryLower)) {
      score = 100 - query.length
    }
    // Contient la requête (score moyen)
    else if (destLower.includes(queryLower)) {
      score = 50 - Math.abs(destLower.indexOf(queryLower))
    }
    // Similarité par distance de Levenshtein (score faible)
    else {
      const distance = levenshteinDistance(queryLower, destLower)
      const maxLength = Math.max(queryLower.length, destLower.length)
      const similarity = (maxLength - distance) / maxLength

      // Seuil de similarité pour éviter les suggestions trop éloignées
      if (similarity > 0.4) {
        score = similarity * 30
      }
    }

    if (score > 0) {
      suggestions.push({ destination, score })
    }
  })

  // Trier par score décroissant et retourner les meilleures suggestions
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSuggestions)
    .map((s) => s.destination)
}

export default function ExplorePage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTriper, setSelectedTriper] = useState(null)
  const [filteredTripers, setFilteredTripers] = useState(mockTripers)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number; zoom?: number } | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Textes multilingues rotatifs avec couleurs
  const rotatingTexts = [
    {
      fr: "Découvrez le monde avec des guides locaux authentiques",
      en: "Discover the world with authentic local guides",
      es: "Descubre el mundo con guías locales auténticos",
      de: "Entdecke die Welt mit authentischen lokalen Guides",
    },
    {
      fr: "Explorez des destinations uniques et mémorables",
      en: "Explore unique and memorable destinations",
      es: "Explora destinos únicos e inolvidables",
      de: "Erkunde einzigartige und unvergessliche Reiseziele",
    },
    {
      fr: "Vivez des aventures extraordinaires partout dans le monde",
      en: "Experience extraordinary adventures around the world",
      es: "Vive aventuras extraordinarias en todo el mundo",
      de: "Erlebe außergewöhnliche Abenteuer auf der ganzen Welt",
    },
    {
      fr: "Connectez-vous avec des cultures fascinantes",
      en: "Connect with fascinating cultures",
      es: "Conéctate con culturas fascinantes",
      de: "Verbinde dich mit faszinierenden Kulturen",
    },
  ]

  // Rotation automatique des textes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Gérer les suggestions en temps réel
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const newSuggestions = findSuggestions(searchQuery)
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Fonction de géocodage avec l'API Nominatim
  const geocodeLocation = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const result = data[0]
        return {
          lat: Number.parseFloat(result.lat),
          lng: Number.parseFloat(result.lon),
          displayName: result.display_name,
        }
      }
      return null
    } catch (error) {
      console.error("Erreur de géocodage:", error)
      return null
    }
  }

  // Recherche de destination améliorée
  const handleSearch = async (destination?: string) => {
    const queryToSearch = destination || searchQuery

    if (queryToSearch.trim() === "") {
      setSearchError("Veuillez entrer une destination")
      return
    }

    setIsSearching(true)
    setSearchError("")
    setShowSuggestions(false)

    try {
      const location = await geocodeLocation(queryToSearch)

      if (location) {
        setMapCenter({
          lat: location.lat,
          lng: location.lng,
          zoom: 6,
        })
        setSearchError("")
        if (destination) {
          setSearchQuery(destination)
        }
      } else {
        setSearchError("Destination non trouvée")
        // Proposer des suggestions si la recherche échoue
        const newSuggestions = findSuggestions(queryToSearch, 3)
        if (newSuggestions.length > 0) {
          setSuggestions(newSuggestions)
          setShowSuggestions(true)
        }
      }
    } catch (error) {
      setSearchError("Erreur lors de la recherche")
    } finally {
      setIsSearching(false)
    }
  }

  const handleTriperClick = (triper: any) => {
    setSelectedTriper(triper)
  }

  const currentText = rotatingTexts[currentTextIndex]

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header coloré avec dégradé */}
      <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white px-4 py-4 relative z-20">
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-orange-100">En ligne</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">TRIPERS</div>
          <div className="text-center flex-1">
            <h1
              className={`text-lg font-semibold text-white transition-all duration-300 ${
                isAnimating ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"
              }`}
            >
              {currentText[language as keyof typeof currentText] || currentText.fr}
            </h1>
          </div>
        </div>
      </div>

      {/* Barre de recherche avec accents colorés */}
      <div className="relative px-4 py-3 bg-white border-b border-gray-100 z-20">
        <div className="relative max-w-2xl mx-auto">
          {/* Barre de recherche principale */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />
            <Input
              placeholder="Où souhaitez-vous voyager ?"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
                if (e.key === "Escape") {
                  setShowSuggestions(false)
                }
              }}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true)
                }
              }}
              className="pl-12 pr-12 py-3 text-base bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border-0 focus:bg-white focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
              disabled={isSearching}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 h-8 w-8 p-0"
                onClick={() => {
                  setSearchQuery("")
                  setShowSuggestions(false)
                  setSearchError("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg h-10 w-10 p-0 shadow-md"
              onClick={() => handleSearch()}
              disabled={isSearching}
            >
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <div className="bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
                <div className="p-2">
                  {searchError && <p className="text-xs text-orange-500 mb-2 px-3">Vouliez-vous dire :</p>}
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-colors duration-150 flex items-center space-x-3"
                      >
                        <MapPin className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-700">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {searchError && !showSuggestions && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              {searchError}
            </div>
          )}
        </div>

        {/* Destinations rapides colorées */}
        <div className="mt-3 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "Paris", color: "from-pink-400 to-rose-500" },
              { name: "Tokyo", color: "from-red-400 to-orange-500" },
              { name: "New York", color: "from-blue-400 to-indigo-500" },
              { name: "London", color: "from-gray-400 to-slate-500" },
              { name: "Barcelona", color: "from-yellow-400 to-orange-500" },
              { name: "Rome", color: "from-green-400 to-emerald-500" },
              { name: "Amsterdam", color: "from-cyan-400 to-teal-500" },
              { name: "Bangkok", color: "from-purple-400 to-violet-500" },
            ].map((city) => (
              <Button
                key={city.name}
                variant="outline"
                size="sm"
                className={`bg-gradient-to-r ${city.color} text-white border-0 hover:scale-105 rounded-full px-3 py-1 text-sm transition-all duration-200 shadow-md`}
                onClick={() => handleSearch(city.name)}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Carte pleine page */}
      <div className="flex-1 relative">
        <RealWorldMap
          tripers={filteredTripers}
          onTriperClick={handleTriperClick}
          selectedTriper={selectedTriper}
          mapCenter={mapCenter}
        />
      </div>

      {/* Navigation inférieure colorée */}
      <div className="bg-white border-t border-gray-200 z-20 shadow-lg">
        <div className="flex justify-around py-3">
          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-1">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-orange-600">{t("nav.explore")}</span>
          </div>
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
          <Link href="/profile" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-emerald-600 group-hover:text-emerald-700">{t("nav.profile")}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
