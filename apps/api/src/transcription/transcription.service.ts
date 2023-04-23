import {AudioToText, Transcription, VideoToText} from '@gladia/zod-types'
import {BadRequestException, Injectable} from '@nestjs/common'
import {z} from 'zod'
import {TokenService} from '../token/token.service'
import {TranscriptionApi} from './transcription.api'

@Injectable()
export class TranscriptionService {
  constructor(private tokenService: TokenService, private transcriptionApi: TranscriptionApi) {}

  audioToText(data: Omit<z.infer<typeof AudioToText>, 'audio'> & {audio?: Express.Multer.File}) {
    if (!data.audio && !data.audio_url) throw new BadRequestException()
    return this.mediaToText('audio', data)
  }

  videoToText(data: Omit<z.infer<typeof VideoToText>, 'video'> & {video?: Express.Multer.File}) {
    if (!data.video && !data.video_url) throw new BadRequestException()
    return this.mediaToText('video', data)
  }

  async mediaToText(
    kind: 'audio' | 'video',
    data:
      | (Omit<z.infer<typeof AudioToText>, 'audio'> & {audio?: Express.Multer.File})
      | (Omit<z.infer<typeof VideoToText>, 'video'> & {video?: Express.Multer.File})
  ): Promise<z.infer<typeof Transcription>> {
    const token = (await this.tokenService.getToken()).token
    return this.transcriptionApi.mediaToText(kind, data, token)
  }
}
