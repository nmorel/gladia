import {createZodDto} from '@anatine/zod-nestjs'
import {Profile, UpdateProfile} from '@gladia/zod-types'

export class GetProfileResponseDto extends createZodDto(Profile) {}

export class UpdateProfileDto extends createZodDto(UpdateProfile) {}
