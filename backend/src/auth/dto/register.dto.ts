import { IsEmail, IsNotEmpty, MaxLength, IsString } from "class-validator"

export class RegisterDto {
  @IsEmail({}, { message: "Please provide a valid email address!" })
  @IsNotEmpty({ message: "Email is required!" })
  email: string
  
  @IsNotEmpty({ message: "username is required!" })
  @IsString({ message:"Username must be a string!" })
  @MaxLength(70, { message: "Username is too long!" })
  username: string

  @IsNotEmpty({ message: "Password is required!" })
  @IsString({ message:"Passowrd must be a string!" })
  password: string

}
