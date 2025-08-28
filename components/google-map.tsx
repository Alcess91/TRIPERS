"use client"

import { useEffect, useRef } from "react"

interface GoogleMapProps {
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

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMap({ tripers, onTriperClick, selectedTriper }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any | null>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    // Charger Google Maps avec votre clé API
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCeHZS3WXF543ebcsCSohkPVnAw1vN7U-0&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers()
    }
  }, [tripers])

  const initMap = () => {
    if (!mapRef.current) return

    // Créer la carte centrée sur l'Europe
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 3,
      center: { lat: 48.8566, lng: 2.3522 }, // Paris
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#4682B4" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{ color: "#90EE90" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#006400" }, { weight: 1 }],
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    })

    mapInstanceRef.current = map
    updateMarkers()
  }

  const updateMarkers = () => {
    if (!mapInstanceRef.current) return

    // Supprimer les anciens marqueurs
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // Ajouter les nouveaux marqueurs
    tripers.forEach((triper) => {
      // Créer un marqueur personnalisé avec l'avatar
      const marker = new window.google.maps.Marker({
        position: { lat: triper.latitude, lng: triper.longitude },
        map: mapInstanceRef.current,
        title: triper.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="50" height="60" xmlns="http://www.w3.org/2000/svg">
              <!-- Pin principal -->
              <path d="M25 5 C15 5, 7 13, 7 23 C7 35, 25 55, 25 55 S43 35, 43 23 C43 13, 35 5, 25 5 Z" 
                    fill="#3B82F6" stroke="white" strokeWidth="2"/>
              
              <!-- Cercle pour l'avatar -->
              <circle cx="25" cy="23" r="12" fill="white" stroke="#3B82F6" strokeWidth="2"/>
              
              <!-- Initiale du nom -->
              <text x="25" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3B82F6">
                ${triper.name.charAt(0)}
              </text>
              
              <!-- Étoile pour le rating -->
              <polygon points="25,10 27,16 33,16 28,20 30,26 25,22 20,26 22,20 17,16 23,16" 
                       fill="#FFD700" stroke="#FFA500" strokeWidth="0.5"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(50, 60),
          anchor: new window.google.maps.Point(25, 60),
        },
        animation: window.google.maps.Animation.DROP,
      })

      // Ajouter un effet de survol
      marker.addListener("mouseover", () => {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(() => marker.setAnimation(null), 750)
      })

      // Ajouter l'événement de clic
      marker.addListener("click", () => {
        onTriperClick(triper)
        // Centrer la carte sur le marqueur
        mapInstanceRef.current.panTo(marker.getPosition())
        mapInstanceRef.current.setZoom(8)
      })

      // Créer une InfoWindow pour chaque marqueur
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; color: #3B82F6;">${triper.name}</h3>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 12px;">${triper.location}</p>
            <p style="margin: 0 0 8px 0; font-size: 11px;">${triper.bio}</p>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${triper.specialties
                .slice(0, 2)
                .map(
                  (specialty) =>
                    `<span style="background: #E5E7EB; padding: 2px 6px; border-radius: 12px; font-size: 10px;">${specialty}</span>`,
                )
                .join("")}
            </div>
          </div>
        `,
      })

      // Ouvrir l'InfoWindow au survol
      marker.addListener("mouseover", () => {
        infoWindow.open(mapInstanceRef.current, marker)
      })

      // Fermer l'InfoWindow quand on quitte le marqueur
      marker.addListener("mouseout", () => {
        infoWindow.close()
      })

      markersRef.current.push(marker)
    })
  }

  return (
    <div className="relative w-full h-full">
      {/* Conteneur de la carte Google Maps */}
      <div ref={mapRef} className="w-full h-full rounded-lg">
        {/* Loading state */}
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Chargement de la carte...</p>
            <p className="text-sm opacity-75">Connexion à Google Maps</p>
          </div>
        </div>
      </div>

      {/* Légende de la carte */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <h4 className="font-semibold text-sm mb-2">Légende</h4>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          <span>Guides disponibles</span>
        </div>
        <div className="flex items-center space-x-2 text-xs mt-1">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span>Guides premium</span>
        </div>
      </div>

      {/* Contrôles personnalisés */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-10">
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setZoom(3)
              mapInstanceRef.current.setCenter({ lat: 48.8566, lng: 2.3522 })
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
