"use client"

import type React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Check for 401 errors and redirect to login
    const handleUnauthorized = () => {
      if (!loading && !user) {
        navigate("/login", { replace: true })
      }
    }

    // Listen for storage changes (token removal from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        navigate("/login", { replace: true })
      }
    }

    window.addEventListener("storage", handleStorageChange)
    handleUnauthorized()

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}

export default AuthGuard
