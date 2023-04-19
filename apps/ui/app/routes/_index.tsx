import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import {userTokenCookie} from '~/cookies.server'

export const loader: LoaderFunction = async ({request}) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))
  if (!userToken) {
    return redirect('/login')
  }

  return {userToken}
}

export default function () {
  const {userToken} = useLoaderData()
  return (
    <div>
      <h1>Hello {userToken.name}!!</h1>
      <Link to={'/logout'} className="underline">
        Logout
      </Link>
    </div>
  )
}
