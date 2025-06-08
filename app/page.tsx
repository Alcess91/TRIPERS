"use client"

import { motion } from "framer-motion"
import { Globe, MapPin, MessageCircle, Users, Plane, Camera, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function HomePage() {
  const { t } = useLanguage()
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [isClient, setIsClient] = useState(false)

  const floatingIcons = [
    { icon: Globe, color: "from-orange-400 to-pink-500", delay: 0 },
    { icon: MapPin, color: "from-cyan-400 to-teal-500", delay: 0.5 },
    { icon: MessageCircle, color: "from-purple-400 to-violet-500", delay: 1 },
    { icon: Users, color: "from-emerald-400 to-green-500", delay: 1.5 },
    { icon: Plane, color: "from-blue-400 to-indigo-500", delay: 2 },
    { icon: Camera, color: "from-rose-400 to-pink-500", delay: 2.5 },
    { icon: Heart, color: "from-red-400 to-rose-500", delay: 3 },
  ]

  const rotatingTexts = [t("home.rotating.text1"), t("home.rotating.text2"), t("home.rotating.text3")]

  const backgroundColors = [
    "from-orange-500 via-pink-500 to-purple-500",
    "from-cyan-500 via-teal-500 to-green-500",
    "from-blue-500 via-indigo-500 to-violet-500",
  ]

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    setIsClient(true)

    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)

    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [rotatingTexts.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 via-purple-50 via-cyan-50 to-emerald-50 flex flex-col items-center justify-start relative overflow-hidden">
      {/* Header avec texte rotatif coloré - Responsive */}
      <motion.div
        className={`bg-gradient-to-r ${backgroundColors[currentTextIndex]} px-4 sm:px-6 py-3 sm:py-4 shadow-lg w-full`}
        key={currentTextIndex}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <motion.h1
            className="text-center max-w-xs sm:max-w-md md:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white transition-all duration-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {rotatingTexts[currentTextIndex]}
          </motion.h1>
        </div>
      </motion.div>

      {/* Icônes flottantes animées - Responsive et réduites sur mobile */}
      {isClient &&
        floatingIcons.slice(0, windowSize.width < 768 ? 4 : 7).map((item, index) => (
          <motion.div
            key={index}
            className={`absolute w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * (windowSize.width * 0.9),
              y: Math.random() * (windowSize.height * 0.8),
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              y: [0, -30, -60, -90],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          >
            <item.icon className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
          </motion.div>
        ))}

      {/* Contenu principal - Responsive */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 mt-8 sm:mt-12 md:mt-16 lg:mt-24 px-4 sm:px-6 md:px-8"
      >
        {/* Logo principal avec animation - Responsive */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 sm:mb-8 max-w-full"
        >
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 via-cyan-500 to-emerald-500 text-transparent bg-clip-text mb-2 sm:mb-4 animate-pulse leading-tight">
            TRIPERS
          </div>

          {/* Sous-titre animé - Responsive */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 font-medium max-w-xs sm:max-w-md md:max-w-2xl mx-auto"
          >
            {t("home.subtitle")}
          </motion.p>
        </motion.div>

        {/* Indicateur de chargement coloré - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
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
          <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-md mx-auto">{t("home.loading")}</p>
        </motion.div>

        {/* Bouton d'accès rapide - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-6 sm:mt-8"
        >
          <Link href="/auth">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 max-w-xs sm:max-w-none mx-auto">
              {t("home.start")}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Éléments décoratifs organisés - Version améliorée */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cercles géométriques - disposition harmonieuse */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-pink-400/25 to-red-500/25 rounded-full blur-lg"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-green-400/15 to-teal-500/15 rounded-full blur-2xl"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Formes géométriques modernes */}
        <motion.div
          className="absolute top-32 left-1/3 w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-sm"
          animate={{
            rotate: [45, 50, 45],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-400/25 to-pink-500/25 blur-sm"
          animate={{
            rotate: [12, 17, 12],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Points lumineux organisés */}
        <motion.div
          className="absolute top-16 left-1/4 w-3 h-3 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          className="absolute top-24 right-1/3 w-2 h-2 bg-pink-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          className="absolute bottom-24 left-1/2 w-4 h-4 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        <motion.div
          className="absolute bottom-16 right-1/4 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        {/* Éléments de voyage thématiques */}
        <motion.div
          className="absolute top-1/3 right-12 text-4xl opacity-20"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          ✈️
        </motion.div>

        <motion.div
          className="absolute bottom-1/2 left-12 text-3xl opacity-15"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          🗺️
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-1/3 text-2xl opacity-20"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          🧭
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/3 text-3xl opacity-15"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          🎒
        </motion.div>
      </div>
    </div>
  )
}
