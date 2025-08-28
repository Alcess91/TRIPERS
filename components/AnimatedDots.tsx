"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Dot = { left: number; top: number }

const N_DOTS = 12 // ajuste si besoin

export default function AnimatedDots() {
  const [dots, setDots] = useState<Dot[]>([])

  useEffect(() => {
    // Générer les positions aléatoires APRES montage (client only)
    const arr: Dot[] = Array.from({ length: N_DOTS }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
    setDots(arr)
  }, [])

  if (dots.length === 0) return null // SSR rendra null → pas de mismatch

  return (
    <>
      {dots.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-60"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  )
}
