import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {type V2_MetaFunction} from '@remix-run/node'
import {Form, Link, useNavigation} from '@remix-run/react'
import {userTokenCookie} from '~/cookies.server'

export const loader: LoaderFunction = async ({request}) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))
  if (userToken) {
    return redirect('/')
  }

  return null
}

export const meta: V2_MetaFunction = () => {
  return [{title: 'Create a new account'}]
}

export const action: ActionFunction = async ({request}) => {
  const body = await request.formData()
  const email = body.get('email')
  if (typeof email !== 'string') {
    return {}
  }
  const password = body.get('password')
  if (typeof password !== 'string') {
    return {}
  }
  const name = body.get('fullName')
  if (typeof name !== 'string') {
    return {}
  }

  try {
    const signUpResponse = await fetch(new URL('auth/sign-up', process.env.API_URL), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': '',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })

    if (!signUpResponse.ok) {
      return {}
    }

    const userToken = await signUpResponse.json()
    return redirect('/', {
      headers: {
        'Set-Cookie': await userTokenCookie.serialize(userToken),
      },
    })
  } catch (err) {
    return {}
  }
}

export default function Register() {
  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  return (
    <div className="w-screen h-screen max-w-xs mx-auto flex items-center">
      <Form method="post" action="/register" className="w-full flex flex-col gap-5">
        <h1 className="text-center text-3xl mt-5">Create a new account</h1>

        <div className="form-control w-full">
          <label className="label" htmlFor="email">
            <span className="label-text">Email:</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="username"
            required
            disabled={isSubmitting}
            className="input input-sm input-accent w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="password">
            <span className="label-text">Password:</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            minLength={6}
            autoComplete="current-password"
            required
            disabled={isSubmitting}
            className="input input-sm input-accent w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label" htmlFor="fullName">
            <span className="label-text">Name:</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your name"
            required
            disabled={isSubmitting}
            className="input input-sm input-accent w-full"
          />
        </div>

        <div className="text-right">
          <Link to="/login" className="btn btn-outline">
            Cancel
          </Link>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Create
          </button>
        </div>
      </Form>
    </div>
  )
}
