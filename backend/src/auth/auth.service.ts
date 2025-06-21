import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import  { Repository } from "typeorm"
import  { JwtService } from "@nestjs/jwt"
import  { LoginDto } from "./dto/login.dto"
import  { RegisterDto } from "./dto/register.dto"
import  { UpdateUserDto } from "./dto/update-user.dto"
import { User } from "./entities/user.entity"
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  private usersRepository: Repository<User>
  constructor(
    @InjectRepository(User) usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.usersRepository = usersRepository
  }

  async register(registerDto: RegisterDto) {
    console.log("registerDto:", registerDto)

    const existingUserByEmail = await this.findByEmail(registerDto.email)
    if (existingUserByEmail) {
      throw new ConflictException("User with this email already exists")
    }

    const existingUserByUsername = await this.findByUsername(registerDto.username)
    if (existingUserByUsername) {
      throw new ConflictException("User with this username already exists")
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)
    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
      bookIds: [], 
    })

    const savedUser = await this.usersRepository.save(user)
    const payload = { username: savedUser.username, sub: savedUser.id, email: savedUser.email }

    console.log("User registered successfully!")
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      },
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.findByUsername(loginDto.username)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await this.validatePassword(loginDto.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const payload = { username: user.username, sub: user.id, email: user.email }
    console.log("User logged in successfully!")

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    }
  }

  async getProfile(userId: number) {
    const user = await this.findById(userId)
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    }
  }

  async updateProfile(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(userId)

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email)
      if (existingUser) {
        throw new ConflictException("Email already in use")
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findByUsername(updateUserDto.username)
      if (existingUser) {
        throw new ConflictException("Username already in use")
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    Object.assign(user, updateUserDto)
    const updatedUser = await this.usersRepository.save(user)

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
    }
  }

  async validateUser(userId: number) {
    return this.findById(userId)
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } })
  }

  private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}
