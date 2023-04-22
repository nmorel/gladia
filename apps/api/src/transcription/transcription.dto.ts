import {createZodDto} from '@anatine/zod-nestjs'
import {AudioToText, Transcription, VideoToText} from '@gladia/zod-types'
import {ApiProperty} from '@nestjs/swagger'

export class AudioToTextDto extends createZodDto(AudioToText) {
  @ApiProperty({type: 'string', format: 'binary', required: false})
  audio: Express.Multer.File
}

export class VideoToTextDto extends createZodDto(VideoToText) {
  @ApiProperty({type: 'string', format: 'binary', required: false})
  video: Express.Multer.File
}

export class TranscriptionResponseDto extends createZodDto(Transcription) {}
