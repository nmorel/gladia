import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {Controller, Get, UseGuards, UsePipes} from '@nestjs/common'
import {ApiCreatedResponse, ApiHeaders, ApiOperation, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from 'src/auth/auth.guard'
import {GetTokenResponseDto} from './token.dto'
import {TokenService} from './token.service'

@Controller('token')
@UseGuards(AuthGuard)
@ApiTags('token')
@ApiHeaders([{name: 'Authorization', description: 'Bearer token', required: true}])
@UsePipes(ZodValidationPipe)
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @ApiOperation({
    operationId: 'get-token',
    summary: 'Get the Gladia API token of the authenticated user',
  })
  @ApiCreatedResponse({
    type: GetTokenResponseDto,
  })
  getToken(): Promise<GetTokenResponseDto> {
    return this.tokenService.getToken()
  }
}
