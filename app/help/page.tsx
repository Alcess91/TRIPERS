"use client"

import { useState } from "react"
import { ArrowLeft, Search, MessageCircle, Book, Phone, Mail, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

const faqData = [
  {
    question: "Comment créer un compte TRIPERS ?",
    answer:
      "Pour créer un compte, cliquez sur 'Commencer l'aventure' depuis la page d'accueil, puis sélectionnez 'S'inscrire'. Remplissez vos informations et confirmez votre email.",
  },
  {
    question: "Comment trouver un guide local ?",
    answer:
      "Utilisez la page 'Explorer' pour rechercher des guides dans votre destination. Vous pouvez filtrer par langue, spécialité et disponibilité.",
  },
  {
    question: "Comment modifier mon profil ?",
    answer:
      "Allez dans votre profil, puis cliquez sur 'Modifier le profil'. Vous pouvez changer vos informations, photo, langues parlées et centres d'intérêt.",
  },
  {
    question: "Comment contacter un guide ?",
    answer: "Depuis le profil d'un guide, cliquez sur 'Envoyer un message' pour démarrer une conversation privée.",
  },
  {
    question: "Comment signaler un problème ?",
    answer: "Utilisez le bouton 'Signaler' sur le profil concerné ou contactez notre support via cette page d'aide.",
  },
  {
    question: "Comment changer la langue de l'application ?",
    answer: "Allez dans Profil > Paramètres > Langue pour choisir parmi les langues disponibles.",
  },
]

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Chat en direct",
    description: "Réponse immédiate",
    action: "Démarrer le chat",
    color: "bg-blue-500",
  },
  {
    icon: Mail,
    title: "Email",
    description: "support@tripers.com",
    action: "Envoyer un email",
    color: "bg-green-500",
  },
  {
    icon: Phone,
    title: "Téléphone",
    description: "+33 1 23 45 67 89",
    action: "Appeler",
    color: "bg-purple-500",
  },
]

export default function HelpPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaq = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-4 py-6">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Aide & Support</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Barre de recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Méthodes de contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>Contactez-nous</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${method.color}`}>
                    <method.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{method.title}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="h-5 w-5" />
              <span>Questions fréquentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaq.length === 0 && searchQuery && (
              <div className="text-center py-8 text-gray-500">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun résultat trouvé pour "{searchQuery}"</p>
                <p className="text-sm mt-2">Essayez avec d'autres mots-clés ou contactez notre support</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guides utiles */}
        <Card>
          <CardHeader>
            <CardTitle>Guides utiles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Guide du voyageur débutant",
              "Comment bien choisir son guide",
              "Conseils de sécurité en voyage",
              "Utiliser TRIPERS efficacement",
            ].map((guide, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span className="font-medium">{guide}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Informations de contact */}
        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">🕒 Heures d'ouverture</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Lundi - Vendredi : 9h00 - 18h00</p>
                <p>Samedi : 10h00 - 16h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">⚡ Temps de réponse</h4>
              <div className="text-sm text-green-800 space-y-1">
                <p>Chat en direct : Immédiat</p>
                <p>Email : Sous 24h</p>
                <p>Téléphone : Immédiat</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
