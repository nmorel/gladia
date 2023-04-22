import {createZodDto} from '@anatine/zod-nestjs'
import {Profile} from '@gladia/zod-types'

export class GetProfileResponseDto extends createZodDto(Profile) {}
