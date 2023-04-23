import {createZodDto} from '@anatine/zod-nestjs'
import {ApiToken} from '@gladia/zod-types'

export class GetTokenResponseDto extends createZodDto(ApiToken) {}
