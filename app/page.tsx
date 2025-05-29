"use client"

import { motion } from "framer-motion"
import { Globe, MapPin, MessageCircle, Users, Plane, Camera, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const floatingIcons = [
    { icon: Globe, color: "from-orange-400 to-pink-500", delay: 0 },
    { icon: MapPin, color: "from-cyan-400 to-teal-500", delay: 0.5 },
    { icon: MessageCircle, color: "from-purple-400 to-violet-500", delay: 1 },
    { icon: Users, color: "from-emerald-400 to-green-500", delay: 1.5 },
    { icon: Plane, color: "from-blue-400 to-indigo-500", delay: 2 },
    { icon: Camera, color: "from-rose-400 to-pink-500", delay: 2.5 },
    { icon: Heart, color: "from-red-400 to-rose-500", delay: 3 },
  ]

  const rotatingTexts = ["Découvrez des lieux uniques", "Planifiez votre prochain voyage", "Partagez vos aventures"]

  const backgroundColors = [
    "from-orange-500 via-pink-500 to-purple-500",
    "from-cyan-500 via-teal-500 to-green-500",
    "from-blue-500 via-indigo-500 to-violet-500",
  ]

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 via-purple-50 via-cyan-50 to-emerald-50 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Header avec texte rotatif coloré - SANS le logo TRIPERS */}
      <motion.div
        className={`bg-gradient-to-r ${backgroundColors[currentTextIndex]} px-4 py-3 shadow-lg w-full`}
        key={currentTextIndex}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <motion.h1
            className="text-lg font-semibold text-white transition-all duration-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {rotatingTexts[currentTextIndex]}
          </motion.h1>
        </div>
      </motion.div>

      {/* Icônes flottantes animées */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -50, -100, -150],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        >
          <item.icon className="h-8 w-8 text-white" />
        </motion.div>
      ))}

      {/* Contenu principal */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 mt-24"
      >
        {/* Logo principal avec animation */}
        <motion.div initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="mb-8">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 via-cyan-500 to-emerald-500 text-transparent bg-clip-text mb-4 animate-pulse">
            TRIPERS
          </div>

          {/* Sous-titre animé */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-2xl md:text-3xl text-gray-700 font-medium"
          >
            Votre aventure commence ici
          </motion.p>
        </motion.div>

        {/* Cercles colorés animés autour du logo */}
        <div className="relative">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${
                [
                  "from-orange-400 to-pink-500",
                  "from-cyan-400 to-teal-500",
                  "from-purple-400 to-violet-500",
                  "from-emerald-400 to-green-500",
                  "from-blue-400 to-indigo-500",
                  "from-rose-400 to-pink-500",
                ][i]
              }`}
              style={{
                left: `${50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                top: `${50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </div>

        {/* Indicateur de chargement coloré */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>
          <p className="text-gray-600">Préparation de votre voyage...</p>
        </motion.div>

        {/* Bouton d'accès rapide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8"
        >
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Commencer l'aventure
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Particules de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>
    </div>
  )
}
