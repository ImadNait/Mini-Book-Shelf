import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BookStatus } from '../entities/enum/book-status.enum';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsOptional()
  @IsString({ message: "Title must be a string!" })
  @MaxLength(100, { message: "Title is too long!" })
  title?: string

  @IsOptional()
  @IsString({ message: "Author must be a string!" })
  @MaxLength(100, { message: "Author must not exceed 100 characters" })
  author?: string

  @IsOptional()
  @IsString({ message: "Description must be a string!" })
  @MaxLength(900, { message: "Description is too long!" })
  description?: string

  @IsOptional()
  @IsEnum(BookStatus)
  status: BookStatus;

}