"use client"

import { useEffect, useRef, useState } from "react"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RealWorldMapProps {
  tripers: Array<{
    id: number
    name: string
    location: string
    latitude: number
    longitude: number
    avatar_url?: string
    rating: number
    specialties: string[]
    bio: string
  }>
  onTriperClick: (triper: any) => void
  selectedTriper: any
  mapCenter?: { lat: number; lng: number; zoom?: number } | null
}

export default function RealWorldMap({ tripers, onTriperClick, selectedTriper, mapCenter }: RealWorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const searchMarkerRef = useRef<any>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [currentZoom, setCurrentZoom] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Style Positron uniquement
  const mapStyle = {
    name: "Positron",
    url: "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    attribution: "© CARTO © OpenStreetMap",
  }

  // Charger Leaflet
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        if (typeof window === "undefined") return

        // Charger Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)
        }

        // Charger Leaflet JS
        if (!window.L) {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.onload = () => {
            console.log("Leaflet loaded successfully")
            setTimeout(initLeafletMap, 300)
          }
          script.onerror = (e) => {
            console.error("Failed to load Leaflet", e)
            setLoadError("Impossible de charger la carte")
          }
          document.head.appendChild(script)
        } else {
          console.log("Leaflet already loaded")
          setTimeout(initLeafletMap, 300)
        }
      } catch (error) {
        console.error("Error loading Leaflet:", error)
        setLoadError(`Erreur de chargement: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    loadLeaflet()

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }
      } catch (error) {
        console.error("Error cleaning up map:", error)
      }
    }
  }, [])

  const initLeafletMap = () => {
    try {
      if (!mapRef.current || mapInstanceRef.current || !window.L) return

      console.log("Initializing Leaflet map...")

      const L = window.L

      // Créer la carte Leaflet avec animations plus fluides
      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false, // On va créer notre propre contrôle
        attributionControl: true,
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true,
        zoomAnimationThreshold: 4,
      })

      // Ajouter la couche Positron
      const tileLayer = L.tileLayer(mapStyle.url, {
        attribution: mapStyle.attribution,
        maxZoom: 19,
        updateWhenIdle: false,
        updateWhenZooming: false,
      }).addTo(map)

      // Événements de zoom optimisés
      map.on("zoom", () => {
        try {
          const zoom = map.getZoom()
          setCurrentZoom(zoom)
        } catch (error) {
          console.error("Zoom error:", error)
        }
      })

      map.on("zoomstart", () => setIsAnimating(true))
      map.on("zoomend", () => setIsAnimating(false))
      map.on("movestart", () => setIsAnimating(true))
      map.on("moveend", () => setIsAnimating(false))

      mapInstanceRef.current = map
      setIsMapReady(true)
      setLoadError(null)
      console.log("Leaflet map initialized successfully")
    } catch (error) {
      console.error("Error initializing Leaflet map:", error)
      setLoadError(`Erreur d'initialisation: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Animation vers une destination plus fluide
  const animateToDestination = async (lat: number, lng: number, targetZoom = 6) => {
    try {
      if (!mapInstanceRef.current || isAnimating) return

      setIsAnimating(true)
      const map = mapInstanceRef.current

      map.flyTo([lat, lng], targetZoom, {
        duration: 1.5,
        easeLinearity: 0.1,
      })

      setTimeout(() => {
        setIsAnimating(false)
      }, 1600)
    } catch (error) {
      console.error("Animation error:", error)
      setIsAnimating(false)
    }
  }

  // Centrer sur une destination
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !mapCenter) return

    try {
      const map = mapInstanceRef.current

      // Supprimer l'ancien marqueur
      if (searchMarkerRef.current) {
        map.removeLayer(searchMarkerRef.current)
        searchMarkerRef.current = null
      }

      // Animer vers la destination
      const targetZoom = mapCenter.zoom || 6
      animateToDestination(mapCenter.lat, mapCenter.lng, targetZoom).then(() => {
        try {
          const L = window.L

          // Créer un marqueur personnalisé coloré
          const customIcon = L.divIcon({
            className: "custom-search-marker",
            html: `
              <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
                <span class="text-white text-sm">📍</span>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })

          searchMarkerRef.current = L.marker([mapCenter.lat, mapCenter.lng], {
            icon: customIcon,
          }).addTo(map)
        } catch (error) {
          console.error("Marker creation error:", error)
        }
      })
    } catch (error) {
      console.error("Map center error:", error)
    }
  }, [mapCenter, isMapReady])

  // Mettre à jour les marqueurs des tripers
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) return

    try {
      const map = mapInstanceRef.current

      // Supprimer les anciens marqueurs
      markersRef.current.forEach((marker) => {
        try {
          map.removeLayer(marker)
        } catch (error) {
          console.error("Error removing marker:", error)
        }
      })
      markersRef.current = []

      // N'afficher que si zoom suffisant
      if (currentZoom < 7) return

      // Ajouter les nouveaux marqueurs
      const L = window.L

      tripers.forEach((triper) => {
        try {
          const isSelected = selectedTriper?.id === triper.id

          const customIcon = L.divIcon({
            className: "custom-triper-marker",
            html: `
              <div class="relative ${isSelected ? "scale-125" : ""} transition-all duration-300">
                <div class="w-12 h-12 rounded-full border-4 ${
                  isSelected ? "border-orange-500" : "border-white"
                } shadow-xl overflow-hidden bg-white hover:scale-110 transition-transform">
                  <img 
                    src="${triper.avatar_url || "/placeholder.svg?height=48&width=48"}" 
                    alt="${triper.name}"
                    class="w-full h-full object-cover"
                    onerror="this.src='/placeholder.svg?height=48&width=48'"
                  />
                </div>
                <div class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <span class="text-xs font-bold text-white">${triper.rating}</span>
                </div>
              </div>
            `,
            iconSize: [48, 48],
            iconAnchor: [24, 48],
          })

          const marker = L.marker([triper.latitude, triper.longitude], {
            icon: customIcon,
          }).addTo(map)

          marker.on("click", () => {
            onTriperClick(triper)
          })

          markersRef.current.push(marker)
        } catch (error) {
          console.error("Error creating triper marker:", error)
        }
      })
    } catch (error) {
      console.error("Error updating markers:", error)
    }
  }, [tripers, isMapReady, selectedTriper, onTriperClick, currentZoom])

  // Retourner à la vue mondiale
  const goToWorldView = () => {
    try {
      if (!mapInstanceRef.current || isAnimating) return

      setIsAnimating(true)
      const map = mapInstanceRef.current

      // Supprimer le marqueur de recherche
      if (searchMarkerRef.current) {
        map.removeLayer(searchMarkerRef.current)
        searchMarkerRef.current = null
      }

      map.flyTo([20, 0], 2, {
        duration: 1.5,
        easeLinearity: 0.1,
      })

      setTimeout(() => {
        setIsAnimating(false)
      }, 1600)
    } catch (error) {
      console.error("Error returning to world view:", error)
      setIsAnimating(false)
    }
  }

  // Affichage d'erreur
  if (loadError) {
    return (
      <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{loadError}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Recharger la page
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {/* Carte */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Styles CSS */}
      <style jsx global>{`
        .leaflet-container {
          font-family: inherit;
        }

        .custom-search-marker {
          background: transparent !important;
          border: none !important;
        }

        .custom-triper-marker {
          background: transparent !important;
          border: none !important;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }

        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.8) !important;
          font-size: 10px !important;
        }

        .leaflet-zoom-anim .leaflet-zoom-animated {
          transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);
        }
      `}</style>

      {/* Bouton retour vue mondiale coloré */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Button
          onClick={goToWorldView}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg border-0 transition-all duration-200"
          size="sm"
          disabled={isAnimating}
        >
          <Home className="h-4 w-4 mr-2" />
          Vue Mondiale
        </Button>
      </div>

      {/* Indicateur de chargement coloré */}
      {!isMapReady && !loadError && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center z-[1000]">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
            </div>
            <p className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Chargement de la carte...
            </p>
            <p className="text-sm text-gray-600">Préparation de votre exploration</p>
          </div>
        </div>
      )}
    </div>
  )
}
