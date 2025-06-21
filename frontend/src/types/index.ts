export interface User {
  id: number
  email: string
  username: string
}

export interface Book {
  id: number
  title: string
  author: string
  description: string
  status: "read" | "unread" | "reading"
  userId: number
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface CreateBookData {
  title: string
  author: string
  description: string
  status?: "read" | "unread" | "reading"
}

export interface UpdateBookData {
  title?: string
  author?: string
  description?: string
  status?: "read" | "unread" | "reading"
}

export interface UpdateProfileData {
  email?: string
  username?: string
  password?: string
}
