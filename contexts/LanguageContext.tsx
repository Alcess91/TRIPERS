"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en" | "es" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Dictionnaire de traductions
const translations = {
  fr: {
    // Navigation
    "nav.explore": "Explorer",
    "nav.activities": "Activités",
    "nav.messages": "Messages",
    "nav.profile": "Profil",

    // Page Explorer
    "explore.title": "Découvrez le monde avec des guides locaux",
    "explore.subtitle": "Connectez-vous avec des guides authentiques pour des expériences uniques",
    "explore.search.placeholder": "Rechercher une destination...",
    "explore.search.button": "Rechercher",
    "explore.popular": "Destinations populaires",
    "explore.guides": "Guides recommandés",
    "explore.rating": "étoiles",
    "explore.reviews": "avis",
    "explore.from": "À partir de",
    "explore.per.person": "par personne",

    // Page Activités
    "activities.title": "Mes Activités",
    "activities.upcoming": "À venir",
    "activities.past": "Passées",
    "activities.with": "avec",
    "activities.participants": "participants",
    "activities.modify": "Modifier",
    "activities.cancel": "Annuler le rendez-vous",
    "activities.cancel.reason": "Raison de l'annulation (optionnel)",
    "activities.cancel.confirm": "Confirmer l'annulation",
    "activities.cancel.success": "Rendez-vous annulé avec succès",

    // Page Messages
    "messages.title": "Messages",
    "messages.search": "Rechercher dans les conversations...",
    "messages.online": "En ligne",
    "messages.typing": "En train d'écrire...",
    "messages.type.message": "Tapez votre message...",
    "messages.send": "Envoyer",

    // Page Profil
    "profile.title": "Mon Profil",
    "profile.edit": "Modifier le profil",
    "profile.level": "Niveau",
    "profile.points": "points",
    "profile.stats.trips": "Voyages",
    "profile.stats.guides": "Guides connectés",
    "profile.stats.destinations": "Destinations",
    "profile.tabs.overview": "Aperçu",
    "profile.tabs.trips": "Voyages",
    "profile.tabs.achievements": "Succès",
    "profile.tabs.settings": "Paramètres",
    "profile.bio": "Biographie",
    "profile.languages": "Langues parlées",
    "profile.interests": "Centres d'intérêt",
    "profile.favorites": "Destinations favorites",
    "profile.settings.notifications": "Gérer les notifications",
    "profile.settings.privacy": "Confidentialité",
    "profile.settings.language": "Langue et région",
    "profile.settings.help": "Aide et support",
    "profile.settings.logout": "Se déconnecter",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.push": "Notifications push",
    "notifications.push.enable": "Activer les notifications push",
    "notifications.push.test": "Tester les notifications",
    "notifications.types": "Types de notifications",
    "notifications.messages": "Nouveaux messages",
    "notifications.bookings": "Réservations",
    "notifications.promotions": "Promotions",
    "notifications.channels": "Canaux de notification",
    "notifications.email": "Email",
    "notifications.sms": "SMS",
    "notifications.quiet.hours": "Heures silencieuses",

    // Confidentialité
    "privacy.title": "Confidentialité",
    "privacy.profile.visibility": "Visibilité du profil",
    "privacy.location": "Localisation",
    "privacy.messages": "Messages",
    "privacy.data": "Données et analyse",

    // Langue
    "language.title": "Langue et région",
    "language.app": "Langue de l'application",
    "language.regional": "Format régional",
    "language.content": "Langues de contenu préférées",
    "language.changing": "Changement de langue en cours...",
    "language.changed": "Langue changée avec succès !",

    // Commun
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.back": "Retour",
    "common.loading": "Chargement...",
    "common.error": "Une erreur s'est produite",
    "common.success": "Succès !",
  },
  en: {
    // Navigation
    "nav.explore": "Explore",
    "nav.activities": "Activities",
    "nav.messages": "Messages",
    "nav.profile": "Profile",

    // Page Explorer
    "explore.title": "Discover the world with local guides",
    "explore.subtitle": "Connect with authentic guides for unique experiences",
    "explore.search.placeholder": "Search for a destination...",
    "explore.search.button": "Search",
    "explore.popular": "Popular destinations",
    "explore.guides": "Recommended guides",
    "explore.rating": "stars",
    "explore.reviews": "reviews",
    "explore.from": "From",
    "explore.per.person": "per person",

    // Page Activités
    "activities.title": "My Activities",
    "activities.upcoming": "Upcoming",
    "activities.past": "Past",
    "activities.with": "with",
    "activities.participants": "participants",
    "activities.modify": "Modify",
    "activities.cancel": "Cancel appointment",
    "activities.cancel.reason": "Cancellation reason (optional)",
    "activities.cancel.confirm": "Confirm cancellation",
    "activities.cancel.success": "Appointment cancelled successfully",

    // Page Messages
    "messages.title": "Messages",
    "messages.search": "Search conversations...",
    "messages.online": "Online",
    "messages.typing": "Typing...",
    "messages.type.message": "Type your message...",
    "messages.send": "Send",

    // Page Profil
    "profile.title": "My Profile",
    "profile.edit": "Edit profile",
    "profile.level": "Level",
    "profile.points": "points",
    "profile.stats.trips": "Trips",
    "profile.stats.guides": "Connected guides",
    "profile.stats.destinations": "Destinations",
    "profile.tabs.overview": "Overview",
    "profile.tabs.trips": "Trips",
    "profile.tabs.achievements": "Achievements",
    "profile.tabs.settings": "Settings",
    "profile.bio": "Biography",
    "profile.languages": "Spoken languages",
    "profile.interests": "Interests",
    "profile.favorites": "Favorite destinations",
    "profile.settings.notifications": "Manage notifications",
    "profile.settings.privacy": "Privacy",
    "profile.settings.language": "Language and region",
    "profile.settings.help": "Help and support",
    "profile.settings.logout": "Sign out",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.push": "Push notifications",
    "notifications.push.enable": "Enable push notifications",
    "notifications.push.test": "Test notifications",
    "notifications.types": "Notification types",
    "notifications.messages": "New messages",
    "notifications.bookings": "Bookings",
    "notifications.promotions": "Promotions",
    "notifications.channels": "Notification channels",
    "notifications.email": "Email",
    "notifications.sms": "SMS",
    "notifications.quiet.hours": "Quiet hours",

    // Confidentialité
    "privacy.title": "Privacy",
    "privacy.profile.visibility": "Profile visibility",
    "privacy.location": "Location",
    "privacy.messages": "Messages",
    "privacy.data": "Data and analytics",

    // Langue
    "language.title": "Language and region",
    "language.app": "App language",
    "language.regional": "Regional format",
    "language.content": "Preferred content languages",
    "language.changing": "Changing language...",
    "language.changed": "Language changed successfully!",

    // Commun
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success!",
  },
  es: {
    // Navigation
    "nav.explore": "Explorar",
    "nav.activities": "Actividades",
    "nav.messages": "Mensajes",
    "nav.profile": "Perfil",

    // Page Explorer
    "explore.title": "Descubre el mundo con guías locales",
    "explore.subtitle": "Conéctate con guías auténticos para experiencias únicas",
    "explore.search.placeholder": "Buscar un destino...",
    "explore.search.button": "Buscar",
    "explore.popular": "Destinos populares",
    "explore.guides": "Guías recomendados",
    "explore.rating": "estrellas",
    "explore.reviews": "reseñas",
    "explore.from": "Desde",
    "explore.per.person": "por persona",

    // Page Activités
    "activities.title": "Mis Actividades",
    "activities.upcoming": "Próximas",
    "activities.past": "Pasadas",
    "activities.with": "con",
    "activities.participants": "participantes",
    "activities.modify": "Modificar",
    "activities.cancel": "Cancelar cita",
    "activities.cancel.reason": "Razón de cancelación (opcional)",
    "activities.cancel.confirm": "Confirmar cancelación",
    "activities.cancel.success": "Cita cancelada exitosamente",

    // Page Messages
    "messages.title": "Mensajes",
    "messages.search": "Buscar conversaciones...",
    "messages.online": "En línea",
    "messages.typing": "Escribiendo...",
    "messages.type.message": "Escribe tu mensaje...",
    "messages.send": "Enviar",

    // Page Profil
    "profile.title": "Mi Perfil",
    "profile.edit": "Editar perfil",
    "profile.level": "Nivel",
    "profile.points": "puntos",
    "profile.stats.trips": "Viajes",
    "profile.stats.guides": "Guías conectados",
    "profile.stats.destinations": "Destinos",
    "profile.tabs.overview": "Resumen",
    "profile.tabs.trips": "Viajes",
    "profile.tabs.achievements": "Logros",
    "profile.tabs.settings": "Configuración",
    "profile.bio": "Biografía",
    "profile.languages": "Idiomas hablados",
    "profile.interests": "Intereses",
    "profile.favorites": "Destinos favoritos",
    "profile.settings.notifications": "Gestionar notificaciones",
    "profile.settings.privacy": "Privacidad",
    "profile.settings.language": "Idioma y región",
    "profile.settings.help": "Ayuda y soporte",
    "profile.settings.logout": "Cerrar sesión",

    // Notifications
    "notifications.title": "Notificaciones",
    "notifications.push": "Notificaciones push",
    "notifications.push.enable": "Activar notificaciones push",
    "notifications.push.test": "Probar notificaciones",
    "notifications.types": "Tipos de notificaciones",
    "notifications.messages": "Nuevos mensajes",
    "notifications.bookings": "Reservas",
    "notifications.promotions": "Promociones",
    "notifications.channels": "Canales de notificación",
    "notifications.email": "Email",
    "notifications.sms": "SMS",
    "notifications.quiet.hours": "Horas silenciosas",

    // Confidentialité
    "privacy.title": "Privacidad",
    "privacy.profile.visibility": "Visibilidad del perfil",
    "privacy.location": "Ubicación",
    "privacy.messages": "Mensajes",
    "privacy.data": "Datos y análisis",

    // Langue
    "language.title": "Idioma y región",
    "language.app": "Idioma de la aplicación",
    "language.regional": "Formato regional",
    "language.content": "Idiomas de contenido preferidos",
    "language.changing": "Cambiando idioma...",
    "language.changed": "¡Idioma cambiado exitosamente!",

    // Commun
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.confirm": "Confirmar",
    "common.back": "Volver",
    "common.loading": "Cargando...",
    "common.error": "Ocurrió un error",
    "common.success": "¡Éxito!",
  },
  de: {
    // Navigation
    "nav.explore": "Entdecken",
    "nav.activities": "Aktivitäten",
    "nav.messages": "Nachrichten",
    "nav.profile": "Profil",

    // Page Explorer
    "explore.title": "Entdecke die Welt mit lokalen Guides",
    "explore.subtitle": "Verbinde dich mit authentischen Guides für einzigartige Erfahrungen",
    "explore.search.placeholder": "Nach einem Ziel suchen...",
    "explore.search.button": "Suchen",
    "explore.popular": "Beliebte Ziele",
    "explore.guides": "Empfohlene Guides",
    "explore.rating": "Sterne",
    "explore.reviews": "Bewertungen",
    "explore.from": "Ab",
    "explore.per.person": "pro Person",

    // Page Activités
    "activities.title": "Meine Aktivitäten",
    "activities.upcoming": "Bevorstehend",
    "activities.past": "Vergangen",
    "activities.with": "mit",
    "activities.participants": "Teilnehmer",
    "activities.modify": "Ändern",
    "activities.cancel": "Termin absagen",
    "activities.cancel.reason": "Grund für Absage (optional)",
    "activities.cancel.confirm": "Absage bestätigen",
    "activities.cancel.success": "Termin erfolgreich abgesagt",

    // Page Messages
    "messages.title": "Nachrichten",
    "messages.search": "Unterhaltungen durchsuchen...",
    "messages.online": "Online",
    "messages.typing": "Tippt...",
    "messages.type.message": "Nachricht eingeben...",
    "messages.send": "Senden",

    // Page Profil
    "profile.title": "Mein Profil",
    "profile.edit": "Profil bearbeiten",
    "profile.level": "Level",
    "profile.points": "Punkte",
    "profile.stats.trips": "Reisen",
    "profile.stats.guides": "Verbundene Guides",
    "profile.stats.destinations": "Ziele",
    "profile.tabs.overview": "Übersicht",
    "profile.tabs.trips": "Reisen",
    "profile.tabs.achievements": "Erfolge",
    "profile.tabs.settings": "Einstellungen",
    "profile.bio": "Biografie",
    "profile.languages": "Gesprochene Sprachen",
    "profile.interests": "Interessen",
    "profile.favorites": "Lieblingsziele",
    "profile.settings.notifications": "Benachrichtigungen verwalten",
    "profile.settings.privacy": "Datenschutz",
    "profile.settings.language": "Sprache und Region",
    "profile.settings.help": "Hilfe und Support",
    "profile.settings.logout": "Abmelden",

    // Notifications
    "notifications.title": "Benachrichtigungen",
    "notifications.push": "Push-Benachrichtigungen",
    "notifications.push.enable": "Push-Benachrichtigungen aktivieren",
    "notifications.push.test": "Benachrichtigungen testen",
    "notifications.types": "Benachrichtigungstypen",
    "notifications.messages": "Neue Nachrichten",
    "notifications.bookings": "Buchungen",
    "notifications.promotions": "Aktionen",
    "notifications.channels": "Benachrichtigungskanäle",
    "notifications.email": "E-Mail",
    "notifications.sms": "SMS",
    "notifications.quiet.hours": "Ruhezeiten",

    // Confidentialité
    "privacy.title": "Datenschutz",
    "privacy.profile.visibility": "Profilsichtbarkeit",
    "privacy.location": "Standort",
    "privacy.messages": "Nachrichten",
    "privacy.data": "Daten und Analyse",

    // Langue
    "language.title": "Sprache und Region",
    "language.app": "App-Sprache",
    "language.regional": "Regionales Format",
    "language.content": "Bevorzugte Inhaltssprachen",
    "language.changing": "Sprache wird geändert...",
    "language.changed": "Sprache erfolgreich geändert!",

    // Commun
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.confirm": "Bestätigen",
    "common.back": "Zurück",
    "common.loading": "Laden...",
    "common.error": "Ein Fehler ist aufgetreten",
    "common.success": "Erfolg!",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  // Charger la langue depuis le localStorage au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("tripers-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("tripers-language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language]?.[key]
    if (!translation) {
      // Retourner la traduction française par défaut si elle existe
      return translations.fr[key] || key
    }
    return translation
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
