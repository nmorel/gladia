import {AudioToText, Transcription, VideoToText} from '@gladia/zod-types'
import {Injectable, InternalServerErrorException} from '@nestjs/common'
import {TokenService} from 'src/token/token.service'
import {z} from 'zod'

function isFile(
  value: string | number | boolean | Express.Multer.File
): value is Express.Multer.File {
  return typeof value === 'object'
}

@Injectable()
export class TranscriptionService {
  constructor(private tokenService: TokenService) {}

  audioToText(data: Omit<z.infer<typeof AudioToText>, 'audio'> & {audio?: Express.Multer.File}) {
    return this.mediaToText('audio', data)
  }

  videoToText(data: Omit<z.infer<typeof VideoToText>, 'video'> & {video?: Express.Multer.File}) {
    return this.mediaToText('video', data)
  }

  async mediaToText(
    kind: 'audio' | 'video',
    data:
      | (Omit<z.infer<typeof AudioToText>, 'audio'> & {audio?: Express.Multer.File})
      | (Omit<z.infer<typeof VideoToText>, 'video'> & {video?: Express.Multer.File})
  ): Promise<z.infer<typeof Transcription>> {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) {
        return
      }

      if (isFile(value)) {
        formData.set(key, new Blob([value.buffer]), value.filename)
      } else {
        formData.set(key, `${value}`)
      }
    })
    const response = await fetch(
      new URL(`${kind}/text/${kind}-transcription/?model=large-v2`, process.env.GLADIA_API_URL),
      {
        method: 'POST',
        headers: {
          'x-gladia-key': (await this.tokenService.getToken()).token,
        },
        body: formData,
      }
    )
    if (!response.ok) {
      console.error(`Error during transcription: [${response.status}] ${response.statusText}`)
      throw new InternalServerErrorException()
    }
    if (data.output_format === 'plain') {
      const text = await response.text()
      return {plain: text}
    } else {
      const json = await response.json()
      return {
        [data.output_format]: json.prediction,
        prediction_raw: json.prediction_raw,
      }
    }
  }
}
