"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, AuthResponse, LoginData, RegisterData, UpdateProfileData } from "../types"
import { authAPI } from "../services/api"

interface AuthContextType {
  user: User | null
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  updateProfile: (data: UpdateProfileData) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (data: LoginData) => {
    try {
      const response: AuthResponse = await authAPI.login(data)
      localStorage.setItem("token", response.access_token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await authAPI.register(data)
      localStorage.setItem("token", response.access_token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const updatedUser = await authAPI.updateProfile(data)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    updateProfile,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
