import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {Request} from 'express'

type User = {
  id: number
  email: string
}

export interface UserRequest extends Request {
  user: User
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const {email, sub: id} = await this.jwtService.verifyAsync<{email: string; sub: number}>(
        token,
        {
          secret: process.env.JWT_SECRET,
        }
      )
      ;(request as UserRequest).user = {email, id}
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
