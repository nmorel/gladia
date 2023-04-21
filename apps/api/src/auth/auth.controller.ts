import {Body, Controller, Post, UsePipes} from '@nestjs/common'
import {AuthService} from './auth.service'
import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger'
import {SignInDto, SignInUpResponseDto, SignUpDto} from './auth.dto'

@Controller('auth')
@UsePipes(ZodValidationPipe)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({operationId: 'sign-in'})
  @ApiCreatedResponse({
    type: SignInUpResponseDto,
  })
  signIn(@Body() body: SignInDto): Promise<SignInUpResponseDto> {
    return this.authService.signIn(body)
  }

  @Post('sign-up')
  @ApiOperation({operationId: 'sign-up'})
  @ApiCreatedResponse({
    type: SignInUpResponseDto,
  })
  signUp(@Body() body: SignUpDto): Promise<SignInUpResponseDto> {
    return this.authService.signUp(body)
  }
}
