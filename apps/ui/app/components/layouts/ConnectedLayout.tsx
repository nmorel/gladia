import type {GetProfileResponseDto} from '@gladia/sdk'
import {Link, Outlet} from '@remix-run/react'

export function ConnectedLayout({profile}: {profile: GetProfileResponseDto}) {
  return (
    <>
      <header className="sticky top-0 h-16 bg-base-300 grid grid-cols-3 items-center px-4">
        <div>{/* Left zone */}</div>
        <div className="text-center text-2xl">
          <Link to="/">Gladia</Link>
        </div>
        <div className="text-right">
          <Link to={'/profile'} className="hover:underline">
            {profile.name}
          </Link>
          <span className="mx-4">|</span>
          <Link to={'/logout'} className="hover:underline">
            Logout
          </Link>
        </div>
      </header>
      <main className="min-h-[calc(100vh_-_theme(space.16))] max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  )
}
