import axios from "axios"
import type {
  AuthResponse,
  LoginData,
  RegisterData,
  Book,
  CreateBookData,
  UpdateBookData,
  UpdateProfileData,
  User,
} from "../types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Handle token expiration and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)

    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }

    return Promise.reject(error)
  },
)

export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/login", data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/register", data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get("/auth/profile")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to get profile")
    }
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    try {
      const response = await api.patch("/auth/profile", data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update profile")
    }
  },
}

export const booksAPI = {
  getBooks: async (): Promise<Book[]> => {
    try {
      const response = await api.get("/books")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch books")
    }
  },

  getBook: async (id: number): Promise<Book> => {
    try {
      const response = await api.get(`/books/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch book")
    }
  },

  createBook: async (data: CreateBookData): Promise<Book> => {
    try {
      const response = await api.post("/books", data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create book")
    }
  },

  updateBook: async (id: number, data: UpdateBookData): Promise<Book> => {
    try {
      const response = await api.patch(`/books/${id}`, data)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update book")
    }
  },

  deleteBook: async (id: number): Promise<void> => {
    try {
      await api.delete(`/books/${id}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete book")
    }
  },
}

export const testConnection = async (): Promise<boolean> => {
  try {
    const response = await api.get("/")
    return response.status === 200
  } catch (error) {
    console.error("Backend connection failed:", error)
    return false
  }
}
