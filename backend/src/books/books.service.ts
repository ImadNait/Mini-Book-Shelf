import { Injectable, NotFoundException } from "@nestjs/common"
import  { CreateBookDto } from "./dto/create-book.dto"
import  { UpdateBookDto } from "./dto/update-book.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, In } from "typeorm"
import { Book } from "./entities/book.entity"
import { User } from "../auth/entities/user.entity"

@Injectable()
export class BooksService {
  private booksRepository: Repository<Book>
  private usersRepository: Repository<User>
  constructor(
    @InjectRepository(Book)
    booksRepository: Repository<Book>,
    @InjectRepository(User)
    usersRepository: Repository<User>,
  ) {
    this.booksRepository = booksRepository
    this.usersRepository = usersRepository
  }

  async create(createBookDto: CreateBookDto, userId: number) {
    const book = this.booksRepository.create(createBookDto)
    const savedBook = await this.booksRepository.save(book)

    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    user.bookIds = [...(user.bookIds || []), savedBook.id]
    await this.usersRepository.save(user)

    console.log("Book created and added to user's collection")
    return savedBook
  }

  async findAllByUser(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (!user.bookIds || user.bookIds.length === 0) {
      return []
    }

    return await this.booksRepository.find({
      where: { id: In(user.bookIds) },
      order: { id: "DESC" },
    })
  }

  async findOne(id: number, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (!user.bookIds || !user.bookIds.includes(id)) {
      throw new NotFoundException("Book not found or you don't have access to it")
    }

    return await this.booksRepository.findOne({
      where: { id },
    })
  }

  async update(id: number, updateBookDto: UpdateBookDto, userId: number) {
    const book = await this.findOne(id, userId)
    if (!book) {
      throw new NotFoundException("Book not found")
    }

    Object.assign(book, updateBookDto)
    return await this.booksRepository.save(book)
  }

  async remove(id: number, userId: number) {
    const book = await this.findOne(id, userId)
    if (!book) {
      throw new NotFoundException("Book not found")
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (user && user.bookIds) {
      user.bookIds = user.bookIds.filter((bookId) => bookId !== id)
      await this.usersRepository.save(user)
    }

    return await this.booksRepository.delete(book.id)
  }
}
