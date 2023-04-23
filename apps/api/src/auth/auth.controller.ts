import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {Body, Controller, HttpCode, Post, UsePipes} from '@nestjs/common'
import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger'
import {SignInDto, SignInUpResponseDto, SignUpDto} from './auth.dto'
import {AuthService} from './auth.service'

@Controller('auth')
@UsePipes(ZodValidationPipe)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  @ApiOperation({operationId: 'sign-in', summary: 'Sign-in to the app'})
  @ApiCreatedResponse({
    type: SignInUpResponseDto,
  })
  signIn(@Body() body: SignInDto): Promise<SignInUpResponseDto> {
    return this.authService.signIn(body)
  }

  @Post('sign-up')
  @HttpCode(200)
  @ApiOperation({operationId: 'sign-up', summary: 'Sign-up to the app'})
  @ApiCreatedResponse({
    type: SignInUpResponseDto,
  })
  signUp(@Body() body: SignUpDto): Promise<SignInUpResponseDto> {
    return this.authService.signUp(body)
  }
}
