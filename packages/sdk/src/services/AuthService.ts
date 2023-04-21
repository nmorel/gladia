/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {SignInDto} from '../models/SignInDto'
import type {SignInUpResponseDto} from '../models/SignInUpResponseDto'
import type {SignUpDto} from '../models/SignUpDto'

import type {CancelablePromise} from '../core/CancelablePromise'
import type {BaseHttpRequest} from '../core/BaseHttpRequest'

export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * @returns SignInUpResponseDto
   * @throws ApiError
   */
  public signIn({requestBody}: {requestBody: SignInDto}): CancelablePromise<SignInUpResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/sign-in',
      body: requestBody,
      mediaType: 'application/json',
    })
  }

  /**
   * @returns SignInUpResponseDto
   * @throws ApiError
   */
  public signUp({requestBody}: {requestBody: SignUpDto}): CancelablePromise<SignInUpResponseDto> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/sign-up',
      body: requestBody,
      mediaType: 'application/json',
    })
  }
}
