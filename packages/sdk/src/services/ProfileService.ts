/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {GetProfileResponseDto} from '../models/GetProfileResponseDto'

import type {CancelablePromise} from '../core/CancelablePromise'
import type {BaseHttpRequest} from '../core/BaseHttpRequest'

export class ProfileService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns GetProfileResponseDto
   * @throws ApiError
   */
  public getProfile({
    authorization,
  }: {
    /**
     * Bearer token
     */
    authorization: string
  }): CancelablePromise<GetProfileResponseDto> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/profile',
      headers: {
        Authorization: authorization,
      },
    })
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public updateProfile({
    authorization,
  }: {
    /**
     * Bearer token
     */
    authorization: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'PATCH',
      url: '/profile',
      headers: {
        Authorization: authorization,
      },
    })
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public deleteProfile({
    authorization,
  }: {
    /**
     * Bearer token
     */
    authorization: string
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'DELETE',
      url: '/profile',
      headers: {
        Authorization: authorization,
      },
    })
  }
}
