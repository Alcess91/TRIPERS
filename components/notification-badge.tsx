"use client"

import type React from "react"

interface NotificationBadgeProps {
  count: number
  children: React.ReactNode
  className?: string
}

export function NotificationBadge({ count, children, className = "" }: NotificationBadgeProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {count > 0 && (
        <div className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-lg animate-pulse">
          {count > 99 ? "99+" : count}
        </div>
      )}
    </div>
  )
}
