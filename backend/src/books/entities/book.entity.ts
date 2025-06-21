import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BookStatus } from "./enum/book-status.enum"

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  author: string

  @Column("text")
  description: string

  @Column({ type: "enum", enum: BookStatus, default: BookStatus.UNREAD })
  status: BookStatus
}
