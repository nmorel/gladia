import type {TranscriptionResponseDto} from '@gladia/sdk'
import {AudioToText, OUTPUT_FORMATS, VideoToText} from '@gladia/zod-types'
import type {ActionArgs} from '@remix-run/node'
import {Form, useActionData, useNavigation, useParams} from '@remix-run/react'
import {useState} from 'react'
import type {z} from 'zod'
import {apiClient, parseApiError} from '~/api.server'
import {Checkbox, FormError, Input, Select} from '~/components/form'
import {
  DiarizationInput,
  FormResult,
  LanguageInput,
  MediaInput,
  Tabs,
  TranslationInput,
  type MediaFile,
} from '~/components/transcription'
import stylesheetUrl from '~/components/transcription/transcription.css'
import {userTokenCookie} from '~/cookies.server'

export function links() {
  return [{rel: 'stylesheet', href: stylesheetUrl}]
}

export const action = async ({request, params: {kind = 'audio'}}: ActionArgs) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))

  const formPayload = Object.fromEntries(await request.formData())

  let response: TranscriptionResponseDto
  switch (kind) {
    case 'audio': {
      let payload: z.infer<typeof AudioToText>
      try {
        payload = AudioToText.parse(formPayload)
      } catch (err) {
        return {error: 400}
      }

      try {
        response = await apiClient.transcription.audioToText({
          authorization: `Bearer ${userToken}`,
          formData: payload,
        })
      } catch (err) {
        const {code, text} = parseApiError(err)
        console.error('Transcription error', `[${code}] ${text}`)
        return {error: code}
      }
      break
    }
    case 'video': {
      let payload: z.infer<typeof VideoToText>
      try {
        payload = VideoToText.parse(formPayload)
      } catch (err) {
        return {error: 400}
      }

      try {
        response = await apiClient.transcription.videoToText({
          authorization: `Bearer ${userToken}`,
          formData: payload,
        })
      } catch (err) {
        const {code, text} = parseApiError(err)
        console.error('Transcription error', `[${code}] ${text}`)
        return {error: code}
      }
      break
    }
    default: {
      return {error: 400}
    }
  }
  return response
}

function hasError(data: object | null | undefined): data is {error: number} {
  return !!data && 'error' in data
}

export default function Transcription() {
  const {kind} = useParams<{kind: 'audio' | 'video'}>()
  if (!kind) return null

  return (
    <>
      <Tabs kind={kind} />
      <TranscriptionForm key={kind} kind={kind} />
    </>
  )
}

function TranscriptionForm({kind}: {kind: 'audio' | 'video'}) {
  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  const data = useActionData<typeof action>()

  const [file, setFile] = useState<MediaFile>({
    url:
      kind === 'audio'
        ? 'http://files.gladia.io/example/audio-transcription/split_infinity.wav'
        : 'http://files.gladia.io/example/video-transcription/short-video.mp4',
  })

  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        action={`/transcription/${kind}`}
        className="w-full flex flex-col gap-5 max-w-md mx-auto"
      >
        <h1 className="text-center text-3xl mt-5">
          <span className="capitalize">{kind}</span> Transcription
        </h1>

        <MediaInput kind={kind} disabled={isSubmitting} file={file} setFile={setFile} />

        <Input
          label="Transcription hint"
          name="transcription_hint"
          placeholder="Enter a hint"
          disabled={isSubmitting}
        />

        <LanguageInput disabled={isSubmitting} />

        <DiarizationInput disabled={isSubmitting} />

        <TranslationInput disabled={isSubmitting} />

        <Checkbox
          label="Toggle noise reduction"
          name="toggle_noise_reduction"
          disabled={isSubmitting}
        />

        <Checkbox
          label="Toggle text emotion recognition"
          name="toggle_text_emotion_recognition"
          disabled={isSubmitting}
        />

        <Checkbox
          label="Toggle summarization"
          name="toggle_summarization"
          disabled={isSubmitting}
        />

        <Checkbox
          label="Toggle chapterization"
          name="toggle_chapterization"
          disabled={isSubmitting}
        />

        <Select
          label="Output format"
          name="output_format"
          options={OUTPUT_FORMATS}
          defaultValue={OUTPUT_FORMATS['Json']}
          required
          disabled={isSubmitting}
        />

        <div className="text-center">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Process
          </button>
        </div>
      </Form>
      {!isSubmitting && data ? (
        hasError(data) ? (
          <FormError statusCode={data.error} />
        ) : (
          <FormResult kind={kind} file={file} data={data} />
        )
      ) : null}
    </>
  )
}
