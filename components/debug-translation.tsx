"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function DebugTranslation() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50">
      <div className="mb-2">
        <strong>🐛 Debug Translation</strong>
      </div>
      <div>Current: {language}</div>
      <div>Test: {t("nav.explore")}</div>
      <div className="flex gap-2 mt-2">
        <button onClick={() => setLanguage("fr")} className="bg-blue-500 px-2 py-1 rounded text-xs">
          FR
        </button>
        <button onClick={() => setLanguage("en")} className="bg-green-500 px-2 py-1 rounded text-xs">
          EN
        </button>
        <button onClick={() => setLanguage("es")} className="bg-red-500 px-2 py-1 rounded text-xs">
          ES
        </button>
        <button onClick={() => setLanguage("de")} className="bg-yellow-500 px-2 py-1 rounded text-xs">
          DE
        </button>
      </div>
    </div>
  )
}
