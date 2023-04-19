import {redirect} from '@remix-run/node'

export async function loader() {
  const token = false
  if (!token) {
    return redirect('/login')
  }

  return {}
}

export default function () {
  return <div>Hello</div>
}
