import {Injectable} from '@nestjs/common'

@Injectable()
export class TranscriptionService {
  async audioToText(data: {audio: Express.Multer.File}) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'audio') {
        formData.set(key, new Blob([value.buffer]), value.filename)
      } else {
        // @ts-ignore
        formData.set(key, value)
      }
    })
    const response = await fetch(
      `https://api.gladia.io/audio/text/audio-transcription/?model=large-v2`,
      {
        method: 'POST',
        headers: {
          'x-gladia-key': `1b275cc1-220c-49b5-922d-46a0e2000e34`,
        },
        body: formData,
      }
    )
    console.log(response)
    const result = await response.text()
    console.log(result)
    return result
  }
  async videoToText() {
    return null
  }
}
