import type {TranscriptionResponseDto} from '@gladia/sdk'
import {
  AudioToText,
  LANGUAGES,
  LANGUAGE_BEHAVIOURS,
  OUTPUT_FORMATS,
  VideoToText,
} from '@gladia/zod-types'
import type {ActionArgs, ActionFunction, SerializeFrom} from '@remix-run/node'
import {Form, useActionData, useNavigation, useParams} from '@remix-run/react'
import type {z} from 'zod'
import {apiClient} from '~/api.server'
import {
  Checkbox,
  FileInput,
  FormError,
  NumberInput,
  Select,
  TextInput,
  UrlInput,
} from '~/components/form'
import {Tabs} from '~/components/transcription'
import {userTokenCookie} from '~/cookies.server'

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
        console.log(err)
        return {error: 400}
      }

      response = await apiClient.transcription.audioToText({
        authorization: `Bearer ${userToken}`,
        formData: payload,
      })
      break
    }
    case 'video': {
      let payload: z.infer<typeof VideoToText>
      try {
        payload = VideoToText.parse(formPayload)
      } catch (err) {
        return {error: 400}
      }

      response = await apiClient.transcription.videoToText({
        authorization: `Bearer ${userToken}`,
        formData: payload,
      })
      break
    }
    default: {
      return {error: 400}
    }
  }
  return response
}

function hasError(data: any): data is {error: number} {
  return !!data && 'error' in data
}

export default function Transcription() {
  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  const data = useActionData<typeof action>()

  const {kind} = useParams<{kind: 'audio' | 'video'}>()
  if (!kind) return null

  return (
    <>
      {hasError(data) && <FormError statusCode={data.error} />}
      <Tabs kind={kind} />
      <Form
        method="post"
        encType="multipart/form-data"
        action={`/transcription/${kind}`}
        className="w-full flex flex-col gap-5 max-w-sm mx-auto"
      >
        <h1 className="text-center text-3xl mt-5">
          <span className="capitalize">{kind}</span> Transcription
        </h1>

        <FileInput
          label={`Select your ${kind} file:`}
          name={kind}
          accept={`${kind}/*`}
          disabled={isSubmitting}
        />
        <UrlInput
          label={`Or paste an url to the ${kind} file:`}
          name={`${kind}_url`}
          defaultValue={
            kind === 'audio'
              ? 'http://files.gladia.io/example/audio-transcription/split_infinity.wav'
              : 'http://files.gladia.io/example/video-transcription/short-video.mp4'
          }
          disabled={isSubmitting}
        />

        <Select
          label="Language behaviour"
          name="language_behaviour"
          options={LANGUAGE_BEHAVIOURS}
          defaultValue={LANGUAGE_BEHAVIOURS['Automatic single language']}
          required
          disabled={isSubmitting}
        />

        {/* TODO show language select only if manual is selected above */}
        <Select
          label="Language"
          name="language"
          options={LANGUAGES}
          defaultValue={LANGUAGES['English']}
          disabled={isSubmitting}
        />

        <Checkbox
          label="Toggle noise reduction"
          name="toggle_noise_reduction"
          disabled={isSubmitting}
        />

        <TextInput
          label="Transcription hint"
          name="transcription_hint"
          placeholder="Enter a hint"
          className="input input-accent"
          disabled={isSubmitting}
        />

        <Checkbox label="Toggle diarization" name="toggle_diarization" disabled={isSubmitting} />

        {/* TODO show input if diarization checked */}
        <NumberInput
          label="Diarization max speakers"
          name="diarization_max_speakers"
          min="2"
          max="10"
          step="1"
          defaultValue="2"
          disabled={isSubmitting}
        />

        <Checkbox
          label="Toggle direct translate"
          name="toggle_direct_translate"
          disabled={isSubmitting}
        />

        {/* TODO show language select if direct translate is selected */}
        <Select
          label="Target translation language"
          name="target_translation_language"
          options={LANGUAGES}
          defaultValue={LANGUAGES['English']}
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
    </>
  )
}
