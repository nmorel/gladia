import {SignUp} from '@gladia/zod-types'
import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect, type V2_MetaFunction} from '@remix-run/node'
import {Form, Link, useActionData, useNavigation} from '@remix-run/react'
import type {z} from 'zod'
import {apiClient, parseApiError} from '~/api.server'
import {FormError, Input} from '~/components/form'
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
  const formData = Object.fromEntries(await request.formData())

  let signUpPayload: z.infer<typeof SignUp>
  try {
    signUpPayload = SignUp.parse(formData)
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
      {!!data?.error && <FormError statusCode={data.error} />}
      <Form method="post" action="/register" className="w-full flex flex-col gap-5">
        <h1 className="text-center text-3xl mt-5">Create a new account</h1>

        <Input
          type="email"
          autoComplete="username"
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
          disabled={isSubmitting}
        />

        <Input
          type="password"
          autoComplete="current-password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          minLength={6}
          required
          disabled={isSubmitting}
        />

        <Input
          label="Name"
          name="name"
          placeholder="Enter your name"
          required
          disabled={isSubmitting}
        />

        <div className="text-right">
          <Link to="/login" className="btn btn-outline mr-4">
            Cancel
          </Link>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Create
          </button>
        </div>
      </Form>
    </>
  )
}
