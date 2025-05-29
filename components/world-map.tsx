"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WorldMapProps {
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

export default function WorldMap({ tripers, onTriperClick, selectedTriper }: WorldMapProps) {
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
        {/* VRAIE CARTE DU MONDE EN SVG */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          <svg viewBox="0 0 1000 500" className="w-full h-full" style={{ background: "#4A90E2" }}>
            {/* Océans */}
            <rect width="1000" height="500" fill="#4A90E2" />

            {/* AMÉRIQUE DU NORD - Contours réalistes */}
            <path
              d="M158 110 L180 95 L200 85 L220 80 L240 85 L260 90 L280 100 L300 115 L315 130 L325 145 L330 160 L325 175 L315 185 L300 195 L280 200 L260 195 L240 185 L220 175 L200 165 L180 155 L165 140 L158 125 Z"
              fill="#2ECC71"
              stroke="#27AE60"
              strokeWidth="1"
            />

            {/* GROENLAND */}
            <path
              d="M320 60 L340 55 L360 60 L375 70 L380 85 L375 100 L360 105 L340 100 L325 90 L320 75 Z"
              fill="#ECF0F1"
              stroke="#BDC3C7"
              strokeWidth="1"
            />

            {/* AMÉRIQUE CENTRALE */}
            <path
              d="M200 200 L220 195 L240 200 L250 210 L245 220 L235 225 L220 220 L205 215 Z"
              fill="#27AE60"
              stroke="#229954"
              strokeWidth="1"
            />

            {/* AMÉRIQUE DU SUD - Forme réaliste */}
            <path
              d="M220 230 L240 225 L260 230 L275 245 L285 265 L290 285 L295 305 L290 325 L285 345 L275 365 L265 380 L250 390 L235 385 L220 375 L210 360 L205 340 L210 320 L215 300 L220 280 L225 260 L220 245 Z"
              fill="#58D68D"
              stroke="#52C370"
              strokeWidth="1"
            />

            {/* EUROPE - Contours détaillés */}
            <path
              d="M480 120 L500 115 L520 120 L535 125 L545 135 L550 145 L545 155 L535 165 L520 170 L500 165 L485 155 L480 145 L485 135 Z"
              fill="#F39C12"
              stroke="#E67E22"
              strokeWidth="1"
            />

            {/* SCANDINAVIE */}
            <path
              d="M500 80 L515 75 L525 85 L530 100 L525 115 L515 120 L505 115 L500 100 Z"
              fill="#F39C12"
              stroke="#E67E22"
              strokeWidth="1"
            />

            {/* AFRIQUE - Forme caractéristique */}
            <path
              d="M480 180 L500 175 L520 180 L540 190 L555 205 L565 225 L570 245 L575 265 L570 285 L565 305 L555 325 L540 340 L520 350 L500 345 L485 335 L475 320 L470 300 L475 280 L480 260 L485 240 L490 220 L485 200 Z"
              fill="#E74C3C"
              stroke="#C0392B"
              strokeWidth="1"
            />

            {/* MADAGASCAR */}
            <path d="M580 320 L590 315 L595 330 L590 345 L580 340 Z" fill="#E74C3C" stroke="#C0392B" strokeWidth="1" />

            {/* ASIE - Contours réalistes */}
            <path
              d="M550 100 L580 95 L610 100 L640 105 L670 110 L700 115 L730 120 L750 130 L765 145 L770 160 L765 175 L750 185 L730 190 L700 185 L670 180 L640 175 L610 170 L580 165 L560 155 L550 140 L555 125 Z"
              fill="#9B59B6"
              stroke="#8E44AD"
              strokeWidth="1"
            />

            {/* INDE */}
            <path
              d="M620 200 L640 195 L655 205 L665 220 L660 235 L645 240 L630 235 L620 220 Z"
              fill="#9B59B6"
              stroke="#8E44AD"
              strokeWidth="1"
            />

            {/* CHINE */}
            <path
              d="M680 140 L710 135 L735 145 L750 160 L745 175 L730 180 L710 175 L690 165 L680 155 Z"
              fill="#9B59B6"
              stroke="#8E44AD"
              strokeWidth="1"
            />

            {/* JAPON */}
            <path d="M780 160 L790 155 L795 165 L790 175 L780 170 Z" fill="#9B59B6" stroke="#8E44AD" strokeWidth="1" />

            {/* AUSTRALIE - Forme reconnaissable */}
            <path
              d="M720 350 L750 345 L780 350 L800 360 L805 375 L800 390 L780 395 L750 390 L730 380 L720 365 Z"
              fill="#F1C40F"
              stroke="#F39C12"
              strokeWidth="1"
            />

            {/* NOUVELLE-ZÉLANDE */}
            <path d="M820 380 L830 375 L835 385 L830 395 L820 390 Z" fill="#F1C40F" stroke="#F39C12" strokeWidth="1" />
            <path d="M825 400 L835 395 L840 405 L835 415 L825 410 Z" fill="#F1C40F" stroke="#F39C12" strokeWidth="1" />

            {/* ROYAUME-UNI */}
            <path d="M470 110 L480 105 L485 115 L480 125 L470 120 Z" fill="#F39C12" stroke="#E67E22" strokeWidth="1" />

            {/* ISLANDE */}
            <path d="M440 90 L450 85 L455 95 L450 105 L440 100 Z" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1" />
          </svg>

          {/* Marqueurs des Tripers sur la vraie carte */}
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
                {/* Pin de localisation moderne */}
                <div className="relative">
                  <div
                    className={`w-8 h-10 ${
                      isSelected ? "bg-red-500" : "bg-blue-500"
                    } rounded-t-full rounded-b-none relative shadow-lg border-2 border-white`}
                    style={{
                      clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                    }}
                  >
                    <div
                      className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 ${
                        isSelected ? "bg-red-600" : "bg-blue-600"
                      } rounded-full flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {triper.name.charAt(0)}
                    </div>
                  </div>

                  {/* Badge de rating */}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-black">
                    {triper.rating}
                  </div>

                  {/* Animation pulse pour le triper sélectionné */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75"></div>
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
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Guides disponibles</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
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
