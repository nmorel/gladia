import {Body, Controller, Post} from '@nestjs/common'
import {AuthService} from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: {email: string; password: string}) {
    return this.authService.signIn(body)
  }

  @Post('sign-up')
  signUp(@Body() body: {email: string; password: string; name: string}) {
    return this.authService.signUp(body)
  }
}
