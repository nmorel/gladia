import type {LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import {userTokenCookie} from '~/cookies.server'

export const loader: LoaderFunction = async ({request}) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))
  if (!userToken) {
    return redirect('/login')
  }

  const userProfileResponse = await fetch(new URL('profile', process.env.API_URL), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': '',
      'Authorization': `Bearer ${userToken}`,
    },
  })
  if (!userProfileResponse.ok) {
    return redirect('/logout')
  }

  return {profile: await userProfileResponse.json()}
}

export default function () {
  const {profile} = useLoaderData()
  return (
    <div>
      <h1>Hello {profile.name}!!</h1>
      <Link to={'/logout'} className="underline">
        Logout
      </Link>
    </div>
  )
}
