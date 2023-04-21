import {createZodDto} from '@anatine/zod-nestjs'
import {ApiProperty} from '@nestjs/swagger'
import {z} from 'zod'

const AudioOrVideoToText = z.object({
  toggle_noise_reduction: z.coerce.boolean().optional(),
})

export class AudioToTextDto extends createZodDto(AudioOrVideoToText) {
  @ApiProperty({type: 'string', format: 'binary', required: true})
  audio: Express.Multer.File
}

export class VideoToTextDto extends createZodDto(AudioOrVideoToText) {
  @ApiProperty({type: 'string', format: 'binary', required: true})
  video: Express.Multer.File
}
