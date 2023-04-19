import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {userTokenCookie} from '~/cookies.server'

export const loader: LoaderFunction = async () => {
  return redirect('/login', {
    headers: {
      'Set-Cookie': await userTokenCookie.serialize('', {maxAge: 0}),
    },
  })
}
