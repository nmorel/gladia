import {z} from 'zod'
import {LANGUAGES, LANGUAGE_BEHAVIOURS, OUTPUT_FORMATS} from './enums'

export const id = z.number().min(1).int()
export const email = z.string().email()
export const password = z.string().min(6)
export const name = z.string().min(1)
export const token = z.string()
export const media = z.any()
export const mediaUrl = z.string().url()
export const languageBehaviour = z.nativeEnum(LANGUAGE_BEHAVIOURS)
export const language = z.nativeEnum(LANGUAGES)
export const toggle = z.coerce.boolean()
export const transcriptionHint = z.string()
export const diarizationMaxSpeakers = z.coerce.number().min(2).max(10).int()
export const outputFormat = z.nativeEnum(OUTPUT_FORMATS)
