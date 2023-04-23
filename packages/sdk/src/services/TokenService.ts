/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {GetTokenResponseDto} from '../models/GetTokenResponseDto'

import type {CancelablePromise} from '../core/CancelablePromise'
import type {BaseHttpRequest} from '../core/BaseHttpRequest'

export class TokenService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns GetTokenResponseDto
   * @throws ApiError
   */
  public getToken({
    authorization,
  }: {
    /**
     * Bearer token
     */
    authorization: string
  }): CancelablePromise<GetTokenResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/token',
      headers: {
        Authorization: authorization,
      },
    })
  }
}
