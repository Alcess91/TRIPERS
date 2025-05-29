"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-6">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">{t("privacy.title")}</h1>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 pb-20">
        <div className="container mx-auto py-10">
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-3">{t("privacy.profile.visibility")}</h2>
            <p className="text-gray-700">{t("privacy.profile.visibility.description")}</p>
            {/* Add visibility settings here */}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-3">{t("privacy.location")}</h2>
            <p className="text-gray-700">{t("privacy.location.description")}</p>
            {/* Add location settings here */}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium mb-3">{t("privacy.messages")}</h2>
            <p className="text-gray-700">{t("privacy.messages.description")}</p>
            {/* Add message settings here */}
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">{t("privacy.data")}</h2>
            <p className="text-gray-700">{t("privacy.data.description")}</p>
            {/* Add data and analytics settings here */}
          </div>
        </div>
      </div>
    </>
  )
}
