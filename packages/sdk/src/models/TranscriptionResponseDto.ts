/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TranscriptionResponseDto = {
  json?: Array<{
    channel: string
    original_language?: string
    language: string
    speaker: 'not_activated' | number
    emotion?: string
    time_begin: number
    time_end: number
    transcription: string
    words: Array<{
      confidence: number
      word: string
      time_begin: number
      time_end: number
    }>
  }>
  srt?: string
  vtt?: string
  txt?: string
  plain?: string
  prediction_raw?: {
    metadata?: any
    transcription?: string
    chapterization?: 'not_activated'
    summarization?: 'not_activated' | string
    emotion?: string
  }
}
