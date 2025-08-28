import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MessagesProvider } from "@/hooks/useMessages"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AuthProvider } from "@/hooks/useAuth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TRIPERS - Connect with local guides",
  description: "Discover the world with authentic local guides",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <MessagesProvider>{children}</MessagesProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
