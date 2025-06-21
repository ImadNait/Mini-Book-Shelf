import { IsEmail, IsOptional, MinLength, MaxLength } from "class-validator"

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: "Please provide a valid email address" })
  email?: string

  @IsOptional()
  @MaxLength(50, { message: "Username must not exceed 50 characters" })
  username?: string

  @IsOptional()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @MaxLength(50, { message: "Password must not exceed 50 characters" })
  password?: string

  @IsOptional()
  bookIds: number[]
}
