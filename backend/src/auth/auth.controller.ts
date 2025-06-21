import { Controller, Post, UseGuards, Get, Patch, Req, HttpCode, HttpStatus } from "@nestjs/common"
import { Body as BodyDecorator } from "@nestjs/common"
import  { AuthService } from "./auth.service"
import  { LoginDto } from "./dto/login.dto"
import  { RegisterDto } from "./dto/register.dto"
import  { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@BodyDecorator() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@BodyDecorator() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch("profile")
  async updateProfile(@Req() req, @BodyDecorator() updateUserDto: UpdateUserDto) {
    return this.authService.updateProfile(req.user.id, updateUserDto)
  }
}
