import type {GetProfileResponseDto} from '@gladia/sdk'
import type {LoaderFunction, V2_MetaFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import {apiClient} from '~/api.server'
import {userTokenCookie} from '~/cookies.server'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Gladia'}]
}

export const loader: LoaderFunction = async ({request}) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))
  if (!userToken) {
    return redirect('/login')
  }

  let profile: GetProfileResponseDto
  try {
    profile = await apiClient.profile.getProfile({
      authorization: `Bearer ${userToken}`,
    })
  } catch (err) {
    return redirect('/logout')
  }

  return {profile}
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
