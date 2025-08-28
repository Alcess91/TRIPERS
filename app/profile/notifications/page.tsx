"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Smartphone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function NotificationsPage() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState({
    pushEnabled: false,
    emailEnabled: true,
    smsEnabled: false,
    newMessages: true,
    bookings: true,
    promotions: false,
    quietHoursEnabled: false,
    quietStart: [22],
    quietEnd: [7],
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSliderChange = (key: string, value: number[]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const testNotification = () => {
    if (settings.pushEnabled) {
      alert("🔔 Notification test envoyée !")
    } else {
      alert("Activez d'abord les notifications push")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-4 py-6">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">{t("notifications.title")}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Notifications Push */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>{t("notifications.push")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-enabled">{t("notifications.push.enable")}</Label>
              <Switch
                id="push-enabled"
                checked={settings.pushEnabled}
                onCheckedChange={() => handleToggle("pushEnabled")}
              />
            </div>
            <Button variant="outline" onClick={testNotification} disabled={!settings.pushEnabled} className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              {t("notifications.push.test")}
            </Button>
          </CardContent>
        </Card>

        {/* Types de notifications */}
        <Card>
          <CardHeader>
            <CardTitle>{t("notifications.types")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <Label htmlFor="new-messages">{t("notifications.messages")}</Label>
              </div>
              <Switch
                id="new-messages"
                checked={settings.newMessages}
                onCheckedChange={() => handleToggle("newMessages")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-green-600" />
                <Label htmlFor="bookings">{t("notifications.bookings")}</Label>
              </div>
              <Switch id="bookings" checked={settings.bookings} onCheckedChange={() => handleToggle("bookings")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-purple-600">🎁</span>
                <Label htmlFor="promotions">{t("notifications.promotions")}</Label>
              </div>
              <Switch
                id="promotions"
                checked={settings.promotions}
                onCheckedChange={() => handleToggle("promotions")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Canaux de notification */}
        <Card>
          <CardHeader>
            <CardTitle>{t("notifications.channels")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <Label htmlFor="email">{t("notifications.email")}</Label>
              </div>
              <Switch id="email" checked={settings.emailEnabled} onCheckedChange={() => handleToggle("emailEnabled")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-green-600" />
                <Label htmlFor="sms">{t("notifications.sms")}</Label>
              </div>
              <Switch id="sms" checked={settings.smsEnabled} onCheckedChange={() => handleToggle("smsEnabled")} />
            </div>
          </CardContent>
        </Card>

        {/* Heures silencieuses */}
        <Card>
          <CardHeader>
            <CardTitle>{t("notifications.quiet.hours")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="quiet-hours">Activer les heures silencieuses</Label>
              <Switch
                id="quiet-hours"
                checked={settings.quietHoursEnabled}
                onCheckedChange={() => handleToggle("quietHoursEnabled")}
              />
            </div>
            {settings.quietHoursEnabled && (
              <div className="space-y-4">
                <div>
                  <Label>Début : {settings.quietStart[0]}h00</Label>
                  <Slider
                    value={settings.quietStart}
                    onValueChange={(value) => handleSliderChange("quietStart", value)}
                    max={23}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Fin : {settings.quietEnd[0]}h00</Label>
                  <Slider
                    value={settings.quietEnd}
                    onValueChange={(value) => handleSliderChange("quietEnd", value)}
                    max={23}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
