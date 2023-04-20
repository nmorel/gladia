import {createZodDto} from '@anatine/zod-nestjs'
import {z} from 'zod'

const GetProfileResponse = z.object({
  id: z.number().min(1).int(),
  email: z.string().email(),
  name: z.string(),
})
export class GetProfileResponseDto extends createZodDto(GetProfileResponse) {}
