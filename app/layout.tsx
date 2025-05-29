import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MessagesProvider } from "@/hooks/useMessages.tsx"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TRIPERS - Connectez-vous avec des guides locaux",
  description: "Découvrez le monde avec des guides locaux authentiques",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProvider>
          <MessagesProvider>{children}</MessagesProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
