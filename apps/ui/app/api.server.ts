import {Gladia} from '@gladia/sdk'

export const apiClient = new Gladia({BASE: process.env.API_URL})

export function parseApiError(err: any): {code: number; text: string} {
  const statusCode = err.status ?? 500
  const statusText = err.body?.message ?? err.statusText ?? err.message ?? 'An error occurred'
  return {code: statusCode, text: statusText}
}
