import {Outlet} from '@remix-run/react'

export function NonConnectedLayout() {
  return (
    <div className="w-screen h-screen max-w-xs mx-auto flex items-center">
      <Outlet />
    </div>
  )
}
