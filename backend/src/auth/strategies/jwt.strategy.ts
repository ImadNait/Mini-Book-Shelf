import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import  { ConfigService } from "@nestjs/config"
import  { AuthService } from "../auth.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    if(!process.env.JWT_SECRET)
      throw new Error("JWT secret not found.")
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET", process.env.JWT_SECRET),
    })
  }

  async validate(payload: any) {
    console.log("JWT payload received:", payload)

    if (!payload.sub) {
      console.log("No user ID in payload")
      throw new UnauthorizedException("Invalid token payload")
    }

    try {
      const user = await this.authService.validateUser(payload.sub)
      if (!user) {
        console.log("User not found for ID:", payload.sub)
        throw new UnauthorizedException("User not found")
      }

      console.log("User validated successfully:", { id: user.id, username: user.username })
      return user
    } catch (error) {
      console.log("Error validating user:", error.message)
      throw new UnauthorizedException("Token validation failed")
    }
  }
}
