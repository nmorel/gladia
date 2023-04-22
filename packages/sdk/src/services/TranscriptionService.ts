/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {AudioToTextDto} from '../models/AudioToTextDto'
import type {TranscriptionResponseDto} from '../models/TranscriptionResponseDto'
import type {VideoToTextDto} from '../models/VideoToTextDto'

import type {CancelablePromise} from '../core/CancelablePromise'
import type {BaseHttpRequest} from '../core/BaseHttpRequest'

export class TranscriptionService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns TranscriptionResponseDto
   * @throws ApiError
   */
  public audioToText({
    authorization,
    formData,
  }: {
    /**
     * Bearer token
     */
    authorization: string
    formData: AudioToTextDto
  }): CancelablePromise<TranscriptionResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/transcription/audio-to-text',
      headers: {
        Authorization: authorization,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
    })
  }

  /**
   * @returns TranscriptionResponseDto
   * @throws ApiError
   */
  public videoToText({
    authorization,
    formData,
  }: {
    /**
     * Bearer token
     */
    authorization: string
    formData: VideoToTextDto
  }): CancelablePromise<TranscriptionResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/transcription/video-to-text',
      headers: {
        Authorization: authorization,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
    })
  }
}
