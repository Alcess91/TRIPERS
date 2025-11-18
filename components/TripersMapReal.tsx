'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { guidesMapData } from '@/lib/guidesMapData';

export default function TripersMapReal() {
  const [isMounted, setIsMounted] = useState(false);
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Créer un pin SVG personnalisé avec la couleur jaune du hero
    const svgIcon = `
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 26 16 26s16-17.163 16-26C32 7.163 24.837 0 16 0z" 
              fill="#FACC15" 
              stroke="#1F2937" 
              stroke-width="1.5"/>
        <circle cx="16" cy="15" r="6" fill="#1F2937"/>
      </svg>
    `;
    
    const newIcon = new L.Icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(svgIcon),
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -42],
    });
    
    setIcon(newIcon);
    setIsMounted(true);
  }, []);

  if (!isMounted || !icon) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <MapContainer
        center={[20, -10]}
        zoom={2.5}
        className="w-full h-full"
        scrollWheelZoom={true}
        zoomControl={true}
        style={{ background: '#f8f9fa', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        
        {guidesMapData.map((pin) => (
          <Marker 
            key={pin.id} 
            position={pin.position}
            icon={icon}
          >
            <Popup maxWidth={300} className="guide-popup">
              <div className="p-2">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">
                  {pin.city}, {pin.country}
                </h3>
                <div className="space-y-3">
                  {pin.guides.map((guide, index) => (
                    <div key={index} className="border-l-2 border-orange-400 pl-3">
                      <p className="font-semibold text-sm text-gray-900 mb-1">
                        {guide.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {guide.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
