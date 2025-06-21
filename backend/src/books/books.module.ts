import { Module } from "@nestjs/common"
import { BooksService } from "./books.service"
import { BooksController } from "./books.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Book } from "./entities/book.entity"
import { User } from "../auth/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
