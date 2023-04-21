import type {ActionFunction} from '@remix-run/node'
import {Form, useActionData, useNavigation, useParams} from '@remix-run/react'
import {Checkbox, FileInput, FormError, NumberInput, Select, TextInput} from '~/components/form'

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  console.log(Object.fromEntries(formData))
  return null
}

export default function Transcription() {
  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  const data = useActionData()

  const {kind} = useParams<{kind: 'audio' | 'video'}>()
  if (!kind) return null

  return (
    <>
      {!!data?.error && <FormError statusCode={data.error} />}
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
          required
          disabled={isSubmitting}
        />

        <Select
          label="Language behaviour"
          name="language_behaviour"
          options={[
            {value: 'manual', label: 'Manual'},
            {value: 'automatic single language', label: 'Automatic single language'},
            {value: 'automatic multiple languages', label: 'Automatic multiple languages'},
          ]}
          defaultValue="automatic single language"
          disabled={isSubmitting}
        />

        {/* TODO add language select if manual is selected above */}

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

        {/* TODO add language select if direct translate is selected */}
        {/* <div className="form-control">
          <label className="cursor-pointer label font-semibold" htmlFor="target_translation_language">
            <span className="label-text">Target translation language</span>
          </label>
          <select
            id="target_translation_language"
            name="target_translation_language"
            className="select select-accent"
            defaultValue="english"
            disabled={isSubmitting}
          >
            <option value="manual">Manual</option>
            <option value="automatic single language">Automatic single language</option>
            <option value="automatic multiple languages">Automatic multiple languages</option>
          </select>
        </div> */}

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
          options={[
            {value: 'json', label: 'Json'},
            {value: 'srt', label: 'Srt'},
            {value: 'vtt', label: 'Vtt'},
            {value: 'txt', label: 'Txt'},
            {value: 'plain', label: 'Plain'},
          ]}
          defaultValue="json"
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
