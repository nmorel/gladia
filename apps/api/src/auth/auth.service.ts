import {type User} from '@gladia/db'
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import {UsersService} from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn({email, password}: {email: string; password: string}): Promise<{token: string}> {
    let user: User
    try {
      user = await this.usersService.findByEmail(email)
    } catch (err) {
      // throw the same exception to avoid giving hint to an attacker about known email
      throw new UnauthorizedException()
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      // throw the same exception to avoid giving hint to an attacker about known email
      throw new UnauthorizedException()
    }
    const token = await this.jwtService.signAsync({email: user.email, sub: user.id})
    return {token}
  }

  async signUp({
    email,
    password,
    name,
  }: {
    email: string
    password: string
    name: string
  }): Promise<{token: string}> {
    password = await bcrypt.hash(password, 10)

    let user: User
    try {
      user = await this.usersService.createUser({email, password, name})
    } catch (err) {
      if (err.code === 'P2002') {
        // unique constraint error
        throw new ConflictException()
      }
      console.log(err)
      throw new InternalServerErrorException()
    }

    const token = await this.jwtService.signAsync({email: user.email, sub: user.id})
    return {token}
  }
}
