"use client"

import type React from "react"
import type { Book } from "../types"

interface BookCardProps {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (id: number) => void
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  const getStatusBadge = (status: string) => {
    const baseClasses = "status-badge"
    switch (status) {
      case "read":
        return `${baseClasses} status-read`
      case "reading":
        return `${baseClasses} status-reading`
      default:
        return `${baseClasses} status-unread`
    }
  }

  return (
    <div className="card hover:bg-gray-750 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-100 line-clamp-2">{book.title}</h3>
        <span className={getStatusBadge(book.status)}>{book.status}</span>
      </div>

      <p className="text-gray-300 mb-2">by {book.author}</p>

      {book.description && <p className="text-gray-400 text-sm mb-4 line-clamp-3">{book.description}</p>}

      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <button onClick={() => onEdit(book)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Edit
          </button>
          <button onClick={() => onDelete(book.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
