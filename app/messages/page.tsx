"use client"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  MapPin,
  Calendar,
  MessageCircle,
  UserX,
  Flag,
  Archive,
  Mail,
  UserCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useMessages } from "@/hooks/useMessages.tsx"
import { useLanguage } from "@/contexts/LanguageContext"

export default function MessagesPage() {
  const { t } = useLanguage()
  const { conversations, markConversationAsRead, addMessage } = useMessages()
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filtrer les conversations
  const filteredConversations = conversations.filter((conv) =>
    conv.other_user_name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Marquer la conversation comme lue
  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation.id)
      // Charger les messages pour cette conversation (vide pour l'instant)
      setMessages([])
    }
  }, [selectedConversation, markConversationAsRead])

  // Défiler vers le bas des messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedConversation) return

    const newMsg = {
      id: messages.length + 1,
      conversation_id: selectedConversation.id,
      sender_id: 1, // ID de l'utilisateur actuel
      sender_name: "Vous",
      sender_avatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      created_at: new Date().toISOString(),
    }

    setMessages([...messages, newMsg])
    addMessage(selectedConversation.id, newMsg)
    setNewMessage("")
  }

  const handleCall = () => {
    if (!selectedConversation) return
    alert(`Appel en cours vers ${selectedConversation.other_user_name}...`)
  }

  const handleVideoCall = () => {
    if (!selectedConversation) return
    alert(`Appel vidéo en cours vers ${selectedConversation.other_user_name}...`)
  }

  const handleBlockUser = () => {
    if (!selectedConversation) return
    alert(`${selectedConversation.other_user_name} a été bloqué`)
  }

  const handleReportUser = () => {
    if (!selectedConversation) return
    alert(`${selectedConversation.other_user_name} a été signalé`)
  }

  const handleArchiveConversation = () => {
    if (!selectedConversation) return
    alert(`Conversation avec ${selectedConversation.other_user_name} archivée`)
  }

  const handleShareLocation = () => {
    setShowLocationDialog(false)
    if (!selectedConversation) return

    const locationMsg = {
      id: messages.length + 1,
      conversation_id: selectedConversation.id,
      sender_id: 1,
      sender_name: "Vous",
      sender_avatar: "/placeholder.svg?height=40&width=40",
      content: "📍 Position partagée : Paris, France",
      created_at: new Date().toISOString(),
    }
    setMessages([...messages, locationMsg])
  }

  const handleProposeAppointment = () => {
    if (appointmentDetails.trim() === "" || !selectedConversation) return

    const appointmentMsg = {
      id: messages.length + 1,
      conversation_id: selectedConversation.id,
      sender_id: 1,
      sender_name: "Vous",
      sender_avatar: "/placeholder.svg?height=40&width=40",
      content: `📅 Rendez-vous proposé : ${appointmentDetails}`,
      created_at: new Date().toISOString(),
    }
    setMessages([...messages, appointmentMsg])
    setAppointmentDetails("")
    setShowAppointmentDialog(false)
  }

  const handleSendPhoto = () => {
    if (!selectedConversation) return

    const photoMsg = {
      id: messages.length + 1,
      conversation_id: selectedConversation.id,
      sender_id: 1,
      sender_name: "Vous",
      sender_avatar: "/placeholder.svg?height=40&width=40",
      content: "📸 Photo envoyée",
      created_at: new Date().toISOString(),
    }
    setMessages([...messages, photoMsg])
  }

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-violet-50 flex flex-col overflow-hidden">
      {/* Header coloré */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-3 flex-shrink-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">TRIPERS</div>
          <div className="flex items-center space-x-3">
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">{t("messages.title")}</h1>
          </div>
        </div>
      </div>

      {/* Contenu principal - flex sans overflow */}
      <div className="flex flex-1 min-h-0">
        {/* Liste des conversations - scrollable */}
        <div className="w-1/3 border-r border-purple-200 bg-white flex flex-col">
          <div className="p-3 flex-shrink-0 bg-gradient-to-r from-purple-50 to-violet-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
              <Input
                placeholder={t("messages.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-purple-200 focus:ring-purple-500/20"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-purple-100">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-purple-500">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <p className="font-medium">Aucune conversation</p>
                <p className="text-sm mt-2">Commencez à explorer pour rencontrer des guides !</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 cursor-pointer hover:bg-purple-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? "bg-purple-100 border-r-4 border-purple-500" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.other_user_avatar || "/placeholder.svg"}
                          alt={conversation.other_user_name}
                        />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {conversation.other_user_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unread_count > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                          {conversation.unread_count}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate text-gray-800">{conversation.other_user_name}</h3>
                        <span className="text-xs text-purple-500">{conversation.last_message_time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.last_message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Conversation active */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* En-tête de la conversation - fixe */}
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-3 flex items-center justify-between flex-shrink-0 shadow-md">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={selectedConversation.other_user_avatar || "/placeholder.svg"}
                      alt={selectedConversation.other_user_name}
                    />
                    <AvatarFallback className="bg-white text-purple-600">
                      {selectedConversation.other_user_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.other_user_name}</h3>
                    <div className="flex items-center text-xs text-purple-200">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></div>
                      <span>{t("messages.online")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleCall} className="text-white hover:bg-white/20">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleVideoCall} className="text-white hover:bg-white/20">
                    <Video className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleArchiveConversation}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archiver la conversation
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleReportUser} className="text-orange-600">
                        <Flag className="h-4 w-4 mr-2" />
                        Signaler l'utilisateur
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleBlockUser} className="text-red-600">
                        <UserX className="h-4 w-4 mr-2" />
                        Bloquer l'utilisateur
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages - scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-white">
                {messages.length === 0 ? (
                  <div className="text-center text-purple-500 mt-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-lg font-medium">Commencez la conversation</p>
                    <p className="text-sm">Envoyez votre premier message à {selectedConversation.other_user_name}</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === 1 ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.sender_id === 1
                            ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                            : "bg-white text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg border border-purple-100"
                        } p-3 shadow-sm`}
                      >
                        <p>{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${message.sender_id === 1 ? "text-purple-200" : "text-purple-500"}`}
                        >
                          {formatMessageTime(message.created_at)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Actions rapides - fixe */}
              <div className="bg-purple-50 p-2 border-t border-purple-200 flex space-x-2 overflow-x-auto flex-shrink-0">
                <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
                  <DialogTrigger asChild>
                    <Badge className="bg-gradient-to-r from-purple-400 to-violet-500 text-white hover:from-purple-500 hover:to-violet-600 cursor-pointer whitespace-nowrap border-0">
                      <Calendar className="h-3 w-3 mr-1" />
                      Proposer un rendez-vous
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Proposer un rendez-vous</DialogTitle>
                      <DialogDescription>Décrivez le rendez-vous que vous souhaitez proposer</DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Ex: Visite du Louvre demain à 14h"
                      value={appointmentDetails}
                      onChange={(e) => setAppointmentDetails(e.target.value)}
                      className="border-purple-200 focus:ring-purple-500/20"
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAppointmentDialog(false)}>
                        Annuler
                      </Button>
                      <Button
                        onClick={handleProposeAppointment}
                        className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                      >
                        Proposer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
                  <DialogTrigger asChild>
                    <Badge className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white hover:from-cyan-500 hover:to-teal-600 cursor-pointer whitespace-nowrap border-0">
                      <MapPin className="h-3 w-3 mr-1" />
                      Partager un lieu
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Partager votre position</DialogTitle>
                      <DialogDescription>Votre position actuelle sera partagée avec ce contact</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowLocationDialog(false)}>
                        Annuler
                      </Button>
                      <Button
                        onClick={handleShareLocation}
                        className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700"
                      >
                        Partager
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Badge
                  className="bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600 cursor-pointer whitespace-nowrap border-0"
                  onClick={handleSendPhoto}
                >
                  📸 Envoyer une photo
                </Badge>
              </div>

              {/* Saisie de message - fixe */}
              <div className="bg-white p-3 border-t border-purple-200 flex items-center space-x-2 flex-shrink-0">
                <Input
                  placeholder={t("messages.type.message")}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1 border-purple-200 focus:ring-purple-500/20"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ""}
                  className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                >
                  <Send className="h-4 w-4 mr-1" />
                  {t("messages.send")}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-50">
              <div className="text-center p-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-purple-800">Aucune conversation sélectionnée</h3>
                <p className="text-purple-600">Sélectionnez une conversation pour commencer à discuter</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation inférieure colorée */}
      <div className="bg-white border-t border-gray-200 flex-shrink-0 shadow-lg">
        <div className="flex justify-around py-3">
          <Link href="/explore" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-orange-600 group-hover:text-orange-700">{t("nav.explore")}</span>
          </Link>
          <Link href="/activities" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-cyan-600 group-hover:text-cyan-700">{t("nav.activities")}</span>
          </Link>
          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mb-1">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-purple-600">{t("nav.messages")}</span>
          </div>
          <Link href="/profile" className="flex flex-col items-center p-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-emerald-600 group-hover:text-emerald-700">{t("nav.profile")}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
