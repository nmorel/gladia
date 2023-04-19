import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common'
import {UsersService} from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('by-email-and-password')
  async findByEmailAndPassword(@Body() {email, password}: {email: string; password: string}) {
    try {
      return await this.usersService.findUserByEmailAndPassword(email, password)
    } catch (err) {
      // always throw the same exception so an attacker cannot guess if an email exists in our db
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  @Post()
  createUser(@Body() body: {email: string; password: string; name: string}) {
    return this.usersService.createUser(body)
  }
}
