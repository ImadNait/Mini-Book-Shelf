"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Book } from "../types"
import { booksAPI } from "../services/api"
import Layout from "../components/Layout"
import BookCard from "../components/BookCard"
import BookForm from "../components/BookForm"

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const data = await booksAPI.getBooks()
      setBooks(data)
      setError("")
    } catch (err: any) {
      console.error("Error fetching books:", err)
      setError(err.message || "Failed to fetch books")
    } finally {
      setLoading(false)
    }
  }

  const handleAddBook = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleDeleteBook = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await booksAPI.deleteBook(id)
        setBooks(books.filter((book) => book.id !== id))
        setError("")
      } catch (err: any) {
        console.error("Error deleting book:", err)
        setError(err.message || "Failed to delete book")
      }
    }
  }

  const handleFormSubmit = async (bookData: any) => {
    try {
      if (editingBook) {
        const updatedBook = await booksAPI.updateBook(editingBook.id, bookData)
        setBooks(books.map((book) => (book.id === editingBook.id ? updatedBook : book)))
      } else {
        const newBook = await booksAPI.createBook(bookData)
        setBooks([newBook, ...books])
      }
      setShowForm(false)
      setEditingBook(null)
      setError("")
    } catch (err: any) {
      console.error("Error saving book:", err)
      setError(err.message || "Failed to save book")
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">Loading your books...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">My Books</h1>
            <p className="text-gray-400">Manage your personal book collection</p>
          </div>
          <button onClick={handleAddBook} className="btn-primary">
            + Add Book
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-900 border border-red-700 text-red-300 rounded-lg text-sm">
            {error}
            <button onClick={() => setError("")} className="ml-2 text-red-200 hover:text-red-100">
              ✕
            </button>
          </div>
        )}

        {showForm && <BookForm book={editingBook} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 mb-4 text-4xl">📚</div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">No books yet</h3>
              <p className="text-gray-500 mb-4">Start building your digital library</p>
              <button onClick={handleAddBook} className="btn-primary">
                Add Your First Book
              </button>
            </div>
          ) : (
            books.map((book) => (
              <BookCard key={book.id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Books
