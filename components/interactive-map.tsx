"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InteractiveMapProps {
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

export default function InteractiveMap({ tripers, onTriperClick, selectedTriper }: InteractiveMapProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  // Convertir les coordonnées géographiques en coordonnées de pixel
  const latLngToPixel = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 1000
    const y = ((90 - lat) / 180) * 500
    return { x, y }
  }

  // Gérer le début du drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  // Gérer le mouvement de la souris
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  // Gérer la fin du drag
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Gérer le zoom avec la molette
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)))
  }

  // Réinitialiser la vue
  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Centrer sur un triper
  const centerOnTriper = (triper: any) => {
    const pixel = latLngToPixel(triper.latitude, triper.longitude)
    const mapRect = mapRef.current?.getBoundingClientRect()
    if (mapRect) {
      setPan({
        x: mapRect.width / 2 - pixel.x * zoom,
        y: mapRect.height / 2 - pixel.y * zoom,
      })
      setZoom(2)
    }
  }

  // Centrer automatiquement quand un triper est sélectionné
  useEffect(() => {
    if (selectedTriper) {
      centerOnTriper(selectedTriper)
    }
  }, [selectedTriper])

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
      {/* Carte interactive */}
      <div
        ref={mapRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* SVG de la carte du monde */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            style={{ background: "linear-gradient(to bottom, #87CEEB, #4682B4)" }}
          >
            {/* Océans */}
            <rect width="1000" height="500" fill="#4682B4" />

            {/* Amérique du Nord */}
            <path
              d="M50 100 L200 80 L250 120 L280 150 L250 200 L200 220 L150 200 L100 180 L50 150 Z"
              fill="#228B22"
              stroke="#006400"
              strokeWidth="2"
            />

            {/* Amérique du Sud */}
            <path
              d="M180 250 L220 240 L240 280 L250 350 L220 400 L180 380 L160 320 L170 280 Z"
              fill="#32CD32"
              stroke="#006400"
              strokeWidth="2"
            />

            {/* Europe */}
            <path
              d="M450 120 L520 110 L550 140 L530 170 L480 180 L450 150 Z"
              fill="#90EE90"
              stroke="#006400"
              strokeWidth="2"
            />

            {/* Afrique */}
            <path
              d="M480 180 L550 170 L580 200 L590 280 L570 350 L520 380 L480 360 L460 300 L470 220 Z"
              fill="#FFD700"
              stroke="#DAA520"
              strokeWidth="2"
            />

            {/* Asie */}
            <path
              d="M550 100 L750 90 L800 130 L820 180 L780 220 L720 200 L650 180 L580 160 L550 140 Z"
              fill="#DDA0DD"
              stroke="#9370DB"
              strokeWidth="2"
            />

            {/* Australie */}
            <path d="M720 320 L800 310 L820 340 L800 370 L720 360 Z" fill="#F0E68C" stroke="#BDB76B" strokeWidth="2" />

            {/* Groenland */}
            <path d="M350 50 L400 45 L420 70 L400 90 L350 85 Z" fill="#F5F5F5" stroke="#D3D3D3" strokeWidth="2" />
          </svg>

          {/* Marqueurs des Tripers */}
          {tripers.map((triper) => {
            const pixel = latLngToPixel(triper.latitude, triper.longitude)
            const isSelected = selectedTriper?.id === triper.id

            return (
              <div
                key={triper.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                  isSelected ? "scale-125 z-30" : "z-20"
                }`}
                style={{
                  left: `${pixel.x}px`,
                  top: `${pixel.y}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onTriperClick(triper)
                }}
              >
                {/* Pin de localisation */}
                <div
                  className={`relative w-12 h-12 ${
                    isSelected ? "bg-red-600" : "bg-blue-600"
                  } rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-lg transition-colors duration-300`}
                >
                  {triper.name.charAt(0)}

                  {/* Badge de rating */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-black">
                    {triper.rating}
                  </div>

                  {/* Pulse animation pour le triper sélectionné */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Tooltip au survol */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {triper.name} - {triper.location}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Contrôles de zoom */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-40">
        <Button
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-white shadow-lg"
          onClick={() => setZoom((prev) => Math.min(3, prev + 0.2))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 bg-white shadow-lg"
          onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.2))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="w-10 h-10 p-0 bg-white shadow-lg" onClick={resetView}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-40">
        <h4 className="font-semibold text-sm mb-2">Légende</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            <span>Guides disponibles</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span>Guide sélectionné</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <span>Note du guide</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-40">
        <div className="text-xs text-gray-600 space-y-1">
          <div>🖱️ Cliquez et glissez pour naviguer</div>
          <div>🔍 Molette pour zoomer</div>
          <div>📍 Cliquez sur un marqueur</div>
        </div>
      </div>

      {/* Indicateur de zoom */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 z-40">
        <div className="text-xs text-gray-600">Zoom: {Math.round(zoom * 100)}%</div>
      </div>
    </div>
  )
}
