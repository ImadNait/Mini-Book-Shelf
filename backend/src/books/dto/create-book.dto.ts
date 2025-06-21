import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { BookStatus } from '../entities/enum/book-status.enum';

export class CreateBookDto {
  @IsString({ message:"Title must be a string!" })
  @IsNotEmpty({ message:"Book's title is required!" })
  @MaxLength(100, { message: "Title is too long" })
  title: string;

  @IsString({ message:"Author must be a string!" })
  @IsNotEmpty({ message:"Author's name is required!" })
  author: string;

  @IsString({ message:"Description must be a string!" })
  @IsOptional()
  @MaxLength(900, { message:"Too much long description!" })
  description?: string;
  @IsOptional()
  @IsEnum(BookStatus)
  status: BookStatus;

}
