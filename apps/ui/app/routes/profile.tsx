import type {GetProfileResponseDto} from '@gladia/sdk'
import {UpdateProfile} from '@gladia/zod-types'
import type {ActionFunction, LoaderArgs} from '@remix-run/node'
import {redirect, type V2_MetaFunction} from '@remix-run/node'
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useMatches,
  useNavigation,
} from '@remix-run/react'
import type {z} from 'zod'
import {apiClient, parseApiError} from '~/api.server'
import {FormError, Input} from '~/components/form'
import {userTokenCookie} from '~/cookies.server'
import {Copy} from '~/icons'

export const meta: V2_MetaFunction = () => {
  return [{title: 'My profile'}]
}

export const loader = async ({request}: LoaderArgs) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))

  let apiToken: string | null
  try {
    const result = await apiClient.token.getToken({
      authorization: `Bearer ${userToken}`,
    })
    apiToken = result.token
  } catch (err) {
    const {code, text} = parseApiError(err)
    console.error('Get token error', `[${code}] ${text}`)
    apiToken = null
  }

  return {
    apiToken,
    apiDocUrl: `${process.env.GLADIA_API_URL}/doc`,
  }
}

export const action: ActionFunction = async ({request}) => {
  const userToken = await userTokenCookie.parse(request.headers.get('Cookie'))

  if (request.method === 'DELETE') {
    try {
      await apiClient.profile.deleteProfile({
        authorization: `Bearer ${userToken}`,
      })
    } catch (err) {
      const {code, text} = parseApiError(err)
      console.error('Delete account error', `[${code}] ${text}`)
      return {error: code}
    }
    return redirect('/logout')
  }

  const formData = Object.fromEntries(await request.formData())

  let updateProfilePayload: z.infer<typeof UpdateProfile>
  try {
    updateProfilePayload = UpdateProfile.parse(formData)
  } catch (err) {
    return {error: 400}
  }

  try {
    await apiClient.profile.updateProfile({
      authorization: `Bearer ${userToken}`,
      requestBody: updateProfilePayload,
    })
  } catch (err) {
    const {code, text} = parseApiError(err)
    console.error('Update profile error', `[${code}] ${text}`)
    return {error: code}
  }

  return null
}

export default function Profile() {
  const [{data: rootData}] = useMatches()
  const {profile} = rootData as {profile: GetProfileResponseDto}

  const {apiDocUrl, apiToken} = useLoaderData<typeof loader>()

  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  const actionData = useActionData()
  const fetcher = useFetcher()
  return (
    <>
      {!!actionData?.error && <FormError statusCode={actionData.error} />}
      <div className="max-w-md mx-auto">
        <Form method="post" className="w-full flex flex-col gap-5">
          <h1 className="text-center text-3xl mt-5">My profile</h1>

          <Input
            type="email"
            autoComplete="username"
            label="Email"
            name="email"
            defaultValue={profile.email}
            placeholder="Enter your email"
            disabled
          />

          <Input
            label="Name"
            name="name"
            placeholder="Enter your name"
            required
            min={1}
            disabled={isSubmitting}
            defaultValue={profile.name}
          />

          <div className="flex flex-row gap-4 justify-between">
            <button
              className="btn btn-error btn-outline"
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                fetcher.submit({}, {method: 'DELETE'})
              }}
            >
              Delete my account
            </button>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Update
            </button>
          </div>
        </Form>

        {!!apiToken && (
          <>
            <div className="divider my-8">API</div>

            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text">API Token</span>
              </label>
              <div className="input-group w-full">
                <input
                  type="text"
                  className="input input-accent w-full"
                  defaultValue={apiToken}
                  disabled
                />
                <button
                  type="button"
                  className="btn btn-square p-3"
                  onClick={(evt) => {
                    const input = evt.currentTarget
                      .previousElementSibling as HTMLInputElement | null
                    if (!input) return

                    input.select()
                    input.setSelectionRange(0, 99999)
                    navigator.clipboard.writeText(input.value)

                    evt.currentTarget.focus()
                  }}
                >
                  <Copy />
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt">
                  Use this token to call our{' '}
                  <a href={apiDocUrl} target="_blank" rel="noreferrer" className="underline">
                    api
                  </a>
                  .
                </span>
              </label>
            </div>
          </>
        )}
      </div>
    </>
  )
}
