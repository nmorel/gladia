import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import {redirect} from '@remix-run/node'
import {type V2_MetaFunction} from '@remix-run/node'
import {Form, Link, useActionData, useNavigation} from '@remix-run/react'
import {z} from 'zod'
import {apiClient, parseApiError} from '~/api.server'
import {EmailInput, FormError, PasswordInput, TextInput} from '~/components/form'
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
      {!!data?.error && <FormError statusCode={data.error} />}
      <Form method="post" action="/register" className="w-full flex flex-col gap-5">
        <h1 className="text-center text-3xl mt-5">Create a new account</h1>

        <EmailInput
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
          disabled={isSubmitting}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          minLength={6}
          required
          disabled={isSubmitting}
        />

        <TextInput
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
