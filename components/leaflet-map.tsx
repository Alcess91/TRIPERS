"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface LeafletMapProps {
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
}

export default function LeafletMap({ tripers, onTriperClick, selectedTriper }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [isMapInitialized, setIsMapInitialized] = useState(false)

  // Initialiser la carte Leaflet
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    // Créer la carte
    const map = L.map(mapRef.current, {
      center: [48.8566, 2.3522], // Paris
      zoom: 3,
      zoomControl: false, // On va l'ajouter manuellement à droite
    })

    // Ajouter le contrôle de zoom en haut à droite
    L.control.zoom({ position: "topright" }).addTo(map)

    // Ajouter le fond de carte
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Stocker la référence de la carte
    leafletMapRef.current = map
    setIsMapInitialized(true)

    // Nettoyage à la destruction du composant
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Mettre à jour les marqueurs quand les tripers changent
  useEffect(() => {
    if (!leafletMapRef.current || !isMapInitialized) return

    // Supprimer les anciens marqueurs
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Ajouter les nouveaux marqueurs
    tripers.forEach((triper) => {
      // Créer une icône personnalisée
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="relative">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">
              ${triper.name.charAt(0)}
            </div>
            <div class="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-white font-bold border border-white">
              ${triper.rating}
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })

      // Créer le marqueur
      const marker = L.marker([triper.latitude, triper.longitude], { icon: customIcon })
        .addTo(leafletMapRef.current!)
        .on("click", () => {
          onTriperClick(triper)
          leafletMapRef.current?.setView([triper.latitude, triper.longitude], 8)
        })

      // Ajouter un popup
      marker.bindPopup(`
        <div class="p-2 max-w-[200px]">
          <h3 class="font-bold text-blue-600">${triper.name}</h3>
          <p class="text-gray-600 text-sm">${triper.location}</p>
          <p class="text-xs my-1">${triper.bio.substring(0, 100)}${triper.bio.length > 100 ? "..." : ""}</p>
          <div class="flex flex-wrap gap-1 mt-2">
            ${triper.specialties
              .slice(0, 2)
              .map((specialty) => `<span class="bg-gray-200 text-xs px-2 py-0.5 rounded-full">${specialty}</span>`)
              .join("")}
          </div>
        </div>
      `)

      // Ajouter le marqueur à la référence
      markersRef.current.push(marker)
    })
  }, [tripers, isMapInitialized, onTriperClick])

  // Mettre à jour la vue quand le triper sélectionné change
  useEffect(() => {
    if (!leafletMapRef.current || !selectedTriper) return

    leafletMapRef.current.setView([selectedTriper.latitude, selectedTriper.longitude], 8)

    // Trouver et ouvrir le popup du marqueur sélectionné
    markersRef.current.forEach((marker) => {
      const markerLatLng = marker.getLatLng()
      if (markerLatLng.lat === selectedTriper.latitude && markerLatLng.lng === selectedTriper.longitude) {
        marker.openPopup()
      }
    })
  }, [selectedTriper])

  return (
    <div className="relative w-full h-full">
      {/* Conteneur de la carte Leaflet */}
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Styles pour les marqueurs personnalisés */}
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 8px;
        }
      `}</style>

      {/* Légende de la carte */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Légende</h4>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          <span>Guides disponibles</span>
        </div>
        <div className="flex items-center space-x-2 text-xs mt-1">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span>Note du guide</span>
        </div>
      </div>

      {/* Contrôles personnalisés */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-[1000]">
        <button
          onClick={() => {
            if (leafletMapRef.current) {
              leafletMapRef.current.setView([48.8566, 2.3522], 3)
            }
          }}
          className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded"
        >
          <span>🌍</span>
          <span>Vue mondiale</span>
        </button>
      </div>
    </div>
  )
}
