"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, Check, X, Eye, UserPlus, Video, FileText, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface GuideApplication {
  id: number
  user_id: number
  name: string
  email: string
  avatar_url?: string
  location: string
  bio: string
  languages: string[]
  specialties: string[]
  experience: string
  motivation_type: "video" | "text"
  motivation_text?: string
  motivation_video_url?: string
  certifications: string[]
  hourly_rate: string
  response_time: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [applications, setApplications] = useState<GuideApplication[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<GuideApplication | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  // Fetch applications
  useEffect(() => {
    fetchApplications()
  }, [statusFilter])

  const fetchApplications = async () => {
    try {
      const response = await fetch(`/api/guide-applications?status=${statusFilter}`)
      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      }
    } catch (error) {
      console.error("Error fetching applications:", error)
      // Fallback data for demo
      setApplications([
        {
          id: 1,
          user_id: 1,
          name: "Elena Rodriguez",
          email: "elena@example.com",
          location: "Madrid, Spain",
          bio: "Professional flamenco dancer passionate about sharing authentic Spanish culture with travelers.",
          languages: ["Spanish", "English", "French"],
          specialties: ["Flamenco", "Gastronomy", "Art & Culture"],
          experience: "5 years as a local guide in Madrid, certified by the Spanish Tourism Board.",
          motivation_type: "text",
          motivation_text:
            "I want to share the real Madrid with travelers, not just the tourist spots but the hidden gems where locals go.",
          certifications: ["Official Madrid Guide", "Flamenco Instructor"],
          hourly_rate: "45",
          response_time: "< 1 hour",
          status: "pending",
          created_at: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          user_id: 2,
          name: "Ahmed Hassan",
          email: "ahmed@example.com",
          location: "Marrakech, Morocco",
          bio: "Local artisan and guide specializing in traditional Moroccan crafts and medina tours.",
          languages: ["Arabic", "French", "English"],
          specialties: ["Traditional Crafts", "Historical Tours", "Local Markets"],
          experience: "Born and raised in Marrakech, 8 years experience guiding tourists through the medina.",
          motivation_type: "video",
          motivation_video_url: "/uploads/motivation-videos/2-1642234567.mp4",
          certifications: ["Certified Artisan", "Tourism Guide License"],
          hourly_rate: "35",
          response_time: "< 2 hours",
          status: "pending",
          created_at: "2024-01-14T15:45:00Z",
        },
      ])
    }
  }

  const handleApplicationAction = async (applicationId: number, action: "approve" | "reject") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/guide-applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          adminNotes,
        }),
      })

      if (response.ok) {
        // Remove from current list
        setApplications((prev) => prev.filter((app) => app.id !== applicationId))
        setSelectedApplication(null)
        setAdminNotes("")
        alert(`Application ${action}d successfully!`)
      } else {
        alert(`Failed to ${action} application`)
      }
    } catch (error) {
      console.error(`Error ${action}ing application:`, error)
      alert(`Error ${action}ing application`)
    }
    setIsLoading(false)
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const stats = {
    pending: applications.filter((app) => app.status === "pending").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    total: applications.length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link href="/explore">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Guide Applications Admin</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex space-x-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <Card key={application.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={application.avatar_url || "/placeholder.svg"} alt={application.name} />
                      <AvatarFallback>
                        {application.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{application.name}</h3>
                          <p className="text-sm text-gray-600">{application.email}</p>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Applied {new Date(application.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">
                          {application.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Location</p>
                          <p className="text-sm text-gray-600">{application.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Rate</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {application.hourly_rate}/hour
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Languages</p>
                        <div className="flex flex-wrap gap-1">
                          {application.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-1">
                          {application.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedApplication(application)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Guide Application - {application.name}</DialogTitle>
                            </DialogHeader>

                            {selectedApplication && (
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-medium mb-2">Bio</h4>
                                  <p className="text-sm text-gray-700">{selectedApplication.bio}</p>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Experience</h4>
                                  <p className="text-sm text-gray-700">{selectedApplication.experience}</p>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Motivation</h4>
                                  {selectedApplication.motivation_type === "text" ? (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center mb-2">
                                        <FileText className="h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium">Text Message</span>
                                      </div>
                                      <p className="text-sm text-gray-700">{selectedApplication.motivation_text}</p>
                                    </div>
                                  ) : (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center mb-2">
                                        <Video className="h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium">Video Message</span>
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        Video file: {selectedApplication.motivation_video_url}
                                      </p>
                                      <Button size="sm" variant="outline" className="mt-2">
                                        Play Video
                                      </Button>
                                    </div>
                                  )}
                                </div>

                                {selectedApplication.certifications.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-2">Certifications</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedApplication.certifications.map((cert) => (
                                        <Badge key={cert} variant="secondary">
                                          {cert}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
                                  <Textarea
                                    id="adminNotes"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Add notes for the applicant..."
                                    className="mt-2"
                                  />
                                </div>

                                <div className="flex space-x-2">
                                  <Button
                                    onClick={() => handleApplicationAction(selectedApplication.id, "approve")}
                                    disabled={isLoading}
                                    className="bg-green-600 hover:bg-green-700 flex-1"
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    {isLoading ? "Processing..." : "Approve"}
                                  </Button>
                                  <Button
                                    onClick={() => handleApplicationAction(selectedApplication.id, "reject")}
                                    disabled={isLoading}
                                    variant="destructive"
                                    className="flex-1"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    {isLoading ? "Processing..." : "Reject"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">
                  <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No applications found</p>
                  <p className="text-sm mt-2">Applications will appear here when submitted</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Espacement pour la navigation */}
      <div className="h-20"></div>
    </div>
  )
}
