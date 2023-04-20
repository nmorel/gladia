import {createCookie} from '@remix-run/node'

export const userTokenCookie = createCookie('userToken', {
  httpOnly: true,
  sameSite: 'strict',
  secure: true,
  maxAge: 604_800, // one week
})
