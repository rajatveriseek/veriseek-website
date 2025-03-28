"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogOut, Users, MessageSquare, Mail } from "lucide-react"
import Cookies from "js-cookie"

// Import the image utility
import { getImageUrl } from "@/lib/image-utils"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)

    // Check if admin is authenticated
    const isAuthenticated = Cookies.get("admin_auth")
    if (!isAuthenticated && !pathname.includes("/admin/login")) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    Cookies.remove("admin_auth")
    router.push("/admin/login")
  }

  if (!isClient) {
    return null // Prevent SSR issues with cookies
  }

  // Don't show the admin layout on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {/* Replace the logo image */}
            <Image
              src={getImageUrl("logo") || "/placeholder.svg"}
              alt="Veriseek Education Logo"
              width={120}
              height={48}
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="ghost" className="text-white hover:bg-primary/80" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <nav className="space-y-2">
                <Link
                  href="/admin"
                  className={`flex items-center rounded-md p-2 ${
                    pathname === "/admin" ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Registrations
                </Link>
                <Link
                  href="/admin/contact"
                  className={`flex items-center rounded-md p-2 ${
                    pathname === "/admin/contact" ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Submissions
                </Link>
                <Link
                  href="/admin/newsletter"
                  className={`flex items-center rounded-md p-2 ${
                    pathname === "/admin/newsletter" ? "bg-primary text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Newsletter Subscribers
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

