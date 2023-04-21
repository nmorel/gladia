/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {AudioToTextDto} from '../models/AudioToTextDto'

import type {CancelablePromise} from '../core/CancelablePromise'
import type {BaseHttpRequest} from '../core/BaseHttpRequest'

export class TranscriptionService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns any
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
  }): CancelablePromise<any> {
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
}
