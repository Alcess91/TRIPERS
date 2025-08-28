"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { useProfileRedirect } from "@/hooks/useProfileRedirect"

export default function HomePage() {
  const { t } = useLanguage()
  useProfileRedirect() // Redirection automatique si profil incomplet

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50">
      <section className="w-full max-w-4xl px-6 text-center">
        {/* Logo / titre */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight
                     bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500
                     bg-clip-text text-transparent"
        >
          TRIPERS
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-slate-600"
        >
          {t("home.subtitle")}
        </motion.p>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <Link href="/auth">
            <Button
              className="px-8 py-6 text-base sm:text-lg font-medium shadow-lg
                         bg-gradient-to-r from-sky-600 to-emerald-600
                         hover:from-sky-700 hover:to-emerald-700 text-white"
            >
              {t("home.start")}
            </Button>
          </Link>
        </motion.div>

        {/* Lignes d’aide (facultatif) */}
        <p className="mt-4 text-sm text-slate-500">
          {t("home.loading")} {/* ou remplace par un court tagline/phrase d’accroche */}
        </p>
      </section>
    </main>
  )
}
