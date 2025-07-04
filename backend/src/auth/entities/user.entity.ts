import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column("int", { array: true, default: [] })
  bookIds: number[]
}
