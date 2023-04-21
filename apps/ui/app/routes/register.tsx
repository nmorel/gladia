import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {type V2_MetaFunction} from '@remix-run/node'
import {Form, Link, useActionData, useNavigation} from '@remix-run/react'
import {z} from 'zod'
import {apiClient, parseApiError} from '~/api.server'
import {FormError} from '~/components/FormError'
import {userTokenCookie} from '~/cookies.server'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Create a new account'}]
}

export const loader: LoaderFunction = async ({request}) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))
  if (userToken) {
    return redirect('/')
  }

  return null
}

export const action: ActionFunction = async ({request}) => {
  const formPayload = Object.fromEntries(await request.formData())
  const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
  })

  let signUpPayload: z.infer<typeof signUpSchema>
  try {
    signUpPayload = signUpSchema.parse(formPayload)
  } catch (err) {
    return {error: 400}
  }

  let token: string
  try {
    const response = await apiClient.auth.signUp({
      requestBody: signUpPayload,
    })
    token = response.token
  } catch (err) {
    const {code, text} = parseApiError(err)
    console.error('Sign-up error', `[${code}] ${text}`)
    return {error: code}
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await userTokenCookie.serialize(token),
    },
  })
}

export default function Register() {
  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  const data = useActionData()
  return (
    <>
      {!!data?.error && <FormError statusCode={data?.error} />}
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
            <label className="label" htmlFor="name">
              <span className="label-text">Name:</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              disabled={isSubmitting}
              className="input input-sm input-accent w-full"
            />
          </div>

          <div className="text-right">
            <Link to="/login" className="btn btn-outline mr-4">
              Cancel
            </Link>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Create
            </button>
          </div>
        </Form>
      </div>
    </>
  )
}
