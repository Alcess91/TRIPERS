"use client"

import type React from "react"

import { useState, createContext, useContext, useCallback } from "react"

interface Message {
  id: number
  conversation_id: number
  sender_id: number
  sender_name: string
  sender_avatar: string
  content: string
  created_at: string
  is_read?: boolean
}

interface Conversation {
  id: number
  other_user_name: string
  other_user_avatar: string
  other_user_id: number
  last_message: string
  last_message_time: string
  unread_count: number
}

interface MessagesContextType {
  conversations: Conversation[]
  totalUnreadCount: number
  markConversationAsRead: (conversationId: number) => void
  addMessage: (conversationId: number, message: Message) => void
  updateConversations: (newConversations: Conversation[]) => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider")
  }
  return context
}

// Données de démonstration pour les conversations avec messages non lus
const initialConversations: Conversation[] = [
  {
    id: 1,
    other_user_name: "Marie Dubois",
    other_user_avatar: "/placeholder.svg?height=40&width=40&query=french woman guide",
    other_user_id: 2,
    last_message: "Parfait ! Je vous retrouve devant le Louvre à 14h",
    last_message_time: "Il y a 5 min",
    unread_count: 2,
  },
  {
    id: 2,
    other_user_name: "Kenji Tanaka",
    other_user_avatar: "/placeholder.svg?height=40&width=40&query=japanese man guide",
    other_user_id: 4,
    last_message: "Arigatou gozaimasu! See you tomorrow",
    last_message_time: "Il y a 1h",
    unread_count: 0,
  },
  {
    id: 3,
    other_user_name: "Carlos Rodriguez",
    other_user_avatar: "/placeholder.svg?height=40&width=40&query=spanish man guide",
    other_user_id: 5,
    last_message: "La Sagrada Familia est magnifique en soirée",
    last_message_time: "Hier",
    unread_count: 1,
  },
]

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)

  // Calculer le nombre total de messages non lus avec useMemo pour éviter les recalculs
  const totalUnreadCount = conversations.reduce((total, conv) => total + conv.unread_count, 0)

  // Utiliser useCallback pour éviter la recréation des fonctions à chaque rendu
  const markConversationAsRead = useCallback((conversationId: number) => {
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unread_count: 0 } : conv)))
  }, [])

  // Ajouter un nouveau message
  const addMessage = useCallback((conversationId: number, message: Message) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          // Si le message vient de l'autre utilisateur, incrémenter unread_count
          const isFromOtherUser = message.sender_id !== 1 // 1 est l'ID de l'utilisateur actuel
          return {
            ...conv,
            last_message: message.content,
            last_message_time: "À l'instant",
            unread_count: isFromOtherUser ? conv.unread_count + 1 : conv.unread_count,
          }
        }
        return conv
      }),
    )
  }, [])

  // Mettre à jour les conversations
  const updateConversations = useCallback((newConversations: Conversation[]) => {
    setConversations(newConversations)
  }, [])

  return (
    <MessagesContext.Provider
      value={{
        conversations,
        totalUnreadCount,
        markConversationAsRead,
        addMessage,
        updateConversations,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}
