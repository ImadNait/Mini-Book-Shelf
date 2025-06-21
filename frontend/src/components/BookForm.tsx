"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Book, CreateBookData } from "../types"

interface BookFormProps {
  book?: Book | null
  onSubmit: (data: CreateBookData) => void
  onCancel: () => void
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    status: "unread" as "read" | "unread" | "reading",
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description || "",
        status: book.status,
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">{book ? "Edit Book" : "Add New Book"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            className="input-field"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
          <input
            type="text"
            name="author"
            required
            className="input-field"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
          <select name="status" className="input-field" value={formData.status} onChange={handleChange}>
            <option value="unread">Unread</option>
            <option value="reading">Currently Reading</option>
            <option value="read">Finished</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            className="input-field resize-none"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description (optional)"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {book ? "Update" : "Add"} Book
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
