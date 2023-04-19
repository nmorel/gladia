/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

export {}

declare global {
  type Token = {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
  }

  namespace NodeJS {
    interface ProcessEnv {
      PWD: string
      CLIENT_ID: string
      CLIENT_SECRET: string
    }
  }
}
