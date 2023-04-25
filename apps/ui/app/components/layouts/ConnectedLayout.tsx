import type {GetProfileResponseDto} from '@gladia/sdk'
import {Link, Outlet, useMatches} from '@remix-run/react'
import {Home} from '~/icons'

export function ConnectedLayout({profile}: {profile: GetProfileResponseDto}) {
  const matches = useMatches()
  return (
    <>
      <header
        id="header"
        className="sticky top-0 h-16 bg-base-300 grid grid-cols-3 items-center px-4 z-10"
      >
        <div>
          {matches[matches.length - 1]?.pathname !== '/' && (
            <Link to={'/'} className="block w-16 h-16 p-4" aria-label="Go back to home page">
              <Home />
            </Link>
          )}
        </div>
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
      <main id="main" className="min-h-[calc(100vh_-_theme(space.16))] max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  )
}
