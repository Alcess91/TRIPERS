"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MapPin, Mail, Calendar, UserCircle } from 'lucide-react'

export default function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around py-3">
        <Link href="/" className="flex flex-col items-center p-2 group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
            pathname === '/' 
              ? 'bg-gradient-to-r from-sky-500 to-emerald-500' 
              : 'bg-gradient-to-r from-sky-400 to-emerald-400'
          }`}>
            <Home className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xs group-hover:text-sky-700 ${
            pathname === '/' ? 'font-medium text-sky-600' : 'text-sky-600'
          }`}>Accueil</span>
        </Link>

        <Link href="/explore" className="flex flex-col items-center p-2 group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
            pathname === '/explore' 
              ? 'bg-gradient-to-r from-orange-500 to-pink-500' 
              : 'bg-gradient-to-r from-orange-400 to-pink-400'
          }`}>
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xs group-hover:text-orange-700 ${
            pathname === '/explore' ? 'font-medium text-orange-600' : 'text-orange-600'
          }`}>Explorer</span>
        </Link>

        <Link href="/messages" className="flex flex-col items-center p-2 group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
            pathname === '/messages' 
              ? 'bg-gradient-to-r from-purple-400 to-violet-500' 
              : 'bg-gradient-to-r from-purple-300 to-violet-400'
          }`}>
            <Mail className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xs group-hover:text-purple-700 ${
            pathname === '/messages' ? 'font-medium text-purple-600' : 'text-purple-600'
          }`}>Messages</span>
        </Link>

        <Link href="/activities" className="flex flex-col items-center p-2 group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
            pathname === '/activities' 
              ? 'bg-gradient-to-r from-cyan-400 to-teal-500' 
              : 'bg-gradient-to-r from-cyan-300 to-teal-400'
          }`}>
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xs group-hover:text-cyan-700 ${
            pathname === '/activities' ? 'font-medium text-cyan-600' : 'text-cyan-600'
          }`}>Activités</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center p-2 group">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${
            pathname === '/profile' 
              ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
              : 'bg-gradient-to-r from-emerald-300 to-green-400'
          }`}>
            <UserCircle className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xs group-hover:text-emerald-700 ${
            pathname === '/profile' ? 'font-medium text-emerald-600' : 'text-emerald-600'
          }`}>Profil</span>
        </Link>
      </div>
    </div>
  )
}
