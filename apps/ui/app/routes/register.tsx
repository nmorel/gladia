import type {ActionFunction} from '@remix-run/node'
import {type V2_MetaFunction} from '@remix-run/node'
import {Form, Link, useNavigation} from '@remix-run/react'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Sign up'}]
}

export const action: ActionFunction = () => {
  return {}
}

export default function SignUp() {
  const transition = useNavigation()
  const isSubmitting = transition.state !== 'idle'
  return (
    <div className="w-screen h-screen max-w-xs mx-auto flex items-center">
      <Form method="post" action="/login" className="w-full flex flex-col gap-5">
        <h1 className="text-center text-3xl mt-5">Sign in to Gladia</h1>

        <div className="form-control w-full">
          <label className="label" htmlFor="email">
            <span className="label-text">Email:</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
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
            required
            disabled={isSubmitting}
            className="input input-sm input-accent w-full"
          />
        </div>

        <div className="text-right">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Sign in
          </button>
        </div>

        <div>
          <span>No account? &nbsp;</span>
          <Link to="/register">Create an account</Link>
        </div>
      </Form>
    </div>
  )
}
