"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Globe, MapPin, MessageCircle, Users, Plane, Camera, Heart } from "lucide-react"

type Pos = { x: number; y: number }

export default function DecorParticles() {
  const [positions, setPositions] = useState<Pos[]>([])
  const floatingIcons = [
    { icon: Globe, color: "from-orange-400 to-pink-500", delay: 0 },
    { icon: MapPin, color: "from-cyan-400 to-teal-500", delay: 0.5 },
    { icon: MessageCircle, color: "from-purple-400 to-violet-500", delay: 1 },
    { icon: Users, color: "from-emerald-400 to-green-500", delay: 1.5 },
    { icon: Plane, color: "from-blue-400 to-indigo-500", delay: 2 },
    { icon: Camera, color: "from-rose-400 to-pink-500", delay: 2.5 },
    { icon: Heart, color: "from-red-400 to-rose-500", delay: 3 },
  ]

  useEffect(() => {
    const count = window.innerWidth < 768 ? 4 : 7
    const arr = Array.from({ length: count }, () => ({
      x: Math.random() * (window.innerWidth * 0.9),
      y: Math.random() * (window.innerHeight * 0.8),
    }))
    setPositions(arr)
  }, [])

  if (!positions.length) return null

  return (
    <>
      {/* Icônes flottantes */}
      {floatingIcons.slice(0, positions.length).map((item, index) => (
        <motion.div
          key={index}
          className={`absolute w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
          initial={{ opacity: 0, scale: 0, x: positions[index].x, y: positions[index].y }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0], y: [0, -30, -60, -90], rotate: [0, 180, 360] }}
          transition={{ duration: 4, delay: item.delay, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
        >
          <item.icon className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
        </motion.div>
      ))}

      {/* 👉 Place ici TOUS tes autres points/cercles décoratifs qui changent de position :
          - S’ils sont aléatoires → génère les positions dans useEffect comme ci-dessus.
          - S’ils sont fixes (top-20 left-10 etc.) → tu peux les laisser hors random. */}
    </>
  )
}
