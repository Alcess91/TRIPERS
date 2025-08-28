"use client"

import { useState } from "react"
import { ArrowLeft, Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

const languages = [
  { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
]

const regions = [
  { code: "auto", name: "Automatique", description: "Basé sur votre localisation" },
  { code: "europe", name: "Europe", description: "Format européen (DD/MM/YYYY)" },
  { code: "us", name: "États-Unis", description: "Format américain (MM/DD/YYYY)" },
  { code: "asia", name: "Asie", description: "Format asiatique (YYYY/MM/DD)" },
]

export default function LanguagePage() {
  const { language: selectedLanguage, setLanguage, t } = useLanguage()
  const [selectedRegion, setSelectedRegion] = useState("auto")
  const [isChanging, setIsChanging] = useState(false)

  const handleLanguageChange = async (languageCode: string) => {
    setIsChanging(true)

    setTimeout(() => {
      setLanguage(languageCode as any)
      setIsChanging(false)
      alert(t("language.changed"))
    }, 1000)
  }

  const handleRegionChange = (regionCode: string) => {
    setSelectedRegion(regionCode)
    // Ici, vous pourriez implémenter la logique de changement de région
    alert(`Région changée vers ${regions.find((r) => r.code === regionCode)?.name}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-4 py-6">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">{t("language.title")}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Langue de l'application */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>{t("language.app")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedLanguage} onValueChange={handleLanguageChange} disabled={isChanging}>
              <div className="space-y-3">
                {languages.map((language) => (
                  <div key={language.code} className="flex items-center space-x-3">
                    <RadioGroupItem value={language.code} id={language.code} disabled={isChanging} />
                    <Label htmlFor={language.code} className="flex items-center space-x-3 cursor-pointer flex-1">
                      <span className="text-2xl">{language.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium">{language.nativeName}</div>
                        <div className="text-sm text-gray-600">{language.name}</div>
                      </div>
                      {selectedLanguage === language.code && <Check className="h-5 w-5 text-green-600" />}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {isChanging && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">🔄 {t("language.changing")}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Format régional */}
        <Card>
          <CardHeader>
            <CardTitle>{t("language.regional")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Choisissez le format pour les dates, heures et nombres</p>
            <RadioGroup value={selectedRegion} onValueChange={handleRegionChange}>
              <div className="space-y-3">
                {regions.map((region) => (
                  <div key={region.code} className="flex items-center space-x-3">
                    <RadioGroupItem value={region.code} id={region.code} />
                    <Label htmlFor={region.code} className="flex items-center justify-between cursor-pointer flex-1">
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-gray-600">{region.description}</div>
                      </div>
                      {selectedRegion === region.code && <Check className="h-5 w-5 text-green-600" />}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Aperçu des formats */}
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date :</span>
              <span className="font-medium">
                {selectedRegion === "us" ? "12/25/2024" : selectedRegion === "asia" ? "2024/12/25" : "25/12/2024"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">Heure :</span>
              <span className="font-medium">{selectedRegion === "us" ? "2:30 PM" : "14:30"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">Nombre :</span>
              <span className="font-medium">{selectedRegion === "us" ? "1,234.56" : "1 234,56"}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">Devise :</span>
              <span className="font-medium">
                {selectedLanguage === "en"
                  ? "$25.00"
                  : selectedLanguage === "de"
                    ? "25,00 €"
                    : selectedLanguage === "ja"
                      ? "¥2,500"
                      : "25,00 €"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Langues de contenu */}
        <Card>
          <CardHeader>
            <CardTitle>{t("language.content")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Choisissez les langues dans lesquelles vous souhaitez voir le contenu des guides
            </p>
            <div className="space-y-2">
              {["Français", "English", "Español", "Deutsch"].map((lang) => (
                <Label key={lang} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={lang === "Français"} />
                  <span>{lang}</span>
                </Label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informations */}
        <Card>
          <CardContent className="p-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Bon à savoir</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Le changement de langue prend effet immédiatement</li>
                <li>• Certains contenus peuvent ne pas être traduits</li>
                <li>• Les messages des guides restent dans leur langue d'origine</li>
                <li>• Vous pouvez changer de langue à tout moment</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
