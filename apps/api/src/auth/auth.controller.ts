import {Body, Controller, Post, UsePipes} from '@nestjs/common'
import {AuthService} from './auth.service'
import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {ApiCreatedResponse} from '@nestjs/swagger'
import {SignInDto, SignInUpResponseDto, SignUpDto} from './auth.dto'

@Controller('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiCreatedResponse({
    type: SignInUpResponseDto,
  })
  signIn(@Body() body: SignInDto): Promise<SignInUpResponseDto> {
    return this.authService.signIn(body)
  }

  @Post('sign-up')
  @ApiCreatedResponse({
    type: SignInUpResponseDto,
  })
  signUp(@Body() body: SignUpDto): Promise<SignInUpResponseDto> {
    return this.authService.signUp(body)
  }
}
