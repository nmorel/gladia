import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import type {V2_MetaFunction} from '@remix-run/react'
import {Links, LiveReload, Meta, Scripts, ScrollRestoration, useLoaderData} from '@remix-run/react'

import stylesheet from '~/tailwind.css'
import {userTokenCookie} from './cookies.server'
import type {GetProfileResponseDto} from '@gladia/sdk'
import {apiClient} from './api.server'
import {ConnectedLayout, NonConnectedLayout} from './components/layouts'

export const links: LinksFunction = () => [{rel: 'stylesheet', href: stylesheet}]

export const loader: LoaderFunction = async ({request}) => {
  const pathname = new URL(request.url).pathname
  if (pathname === '/login' || pathname === '/logout') return null

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

export const meta: V2_MetaFunction = () => {
  return [{title: 'Gladia'}]
}

export default function App() {
  const data = useLoaderData()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {data?.profile ? <ConnectedLayout profile={data?.profile} /> : <NonConnectedLayout />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
