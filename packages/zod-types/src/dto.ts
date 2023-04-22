import {z} from 'zod'
import {
  diarizationMaxSpeakers,
  email,
  id,
  language,
  languageBehaviour,
  media,
  mediaUrl,
  name,
  outputFormat,
  password,
  toggle,
  token,
  transcriptionHint,
} from './properties'

export const SignIn = z.object({
  email,
  password,
})

export const SignUp = SignIn.extend({
  name,
})

export const UserToken = z.object({
  token,
})

export const Profile = z.object({
  id,
  email,
  name,
})

const AudioOrVideoToText = z.object({
  language_behaviour: languageBehaviour,
  language: language.optional(),

  toggle_noise_reduction: toggle.optional(),

  transcription_hint: transcriptionHint.optional(),

  toggle_diarization: toggle.optional(),
  diarization_max_speakers: diarizationMaxSpeakers.optional(),

  toggle_direct_translate: toggle.optional(),
  target_translation_language: language.optional(),

  toggle_text_emotion_recognition: toggle.optional(),

  toggle_summarization: toggle.optional(),

  toggle_chapterization: toggle.optional(),

  output_format: outputFormat,
})

export const AudioToText = AudioOrVideoToText.extend({
  audio: media.optional(),
  audio_url: mediaUrl.optional(),
})

export const VideoToText = AudioOrVideoToText.extend({
  video: media.optional(),
  video_url: mediaUrl.optional(),
})

export const Transcription = z.object({
  json: z
    .array(
      z.object({
        channel: z.string(),
        original_language: z.string().optional(),
        language: z.string(),
        speaker: z.enum(['not_activated']).or(z.number()),
        emotion: z.string().optional(),
        time_begin: z.number(),
        time_end: z.number(),
        transcription: z.string(),
        words: z.array(
          z.object({
            confidence: z.number(),
            word: z.string(),
            time_begin: z.number(),
            time_end: z.number(),
          })
        ),
      })
    )
    .optional(),
  srt: z.string().optional(),
  vtt: z.string().optional(),
  txt: z.string().optional(),
  plain: z.string().optional(),
  prediction_raw: z
    .object({
      metadata: z.object({}),
      transcription: z.string(),
      chapterization: z.enum(['not_activated']).or(z.array(z.object({}))),
      summarization: z.enum(['not_activated']).or(z.string()),
      emotion: z.string().optional(),
    })
    .optional(),
})
