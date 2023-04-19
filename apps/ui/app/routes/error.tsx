import {type V2_MetaFunction} from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Error'}]
}

export default function Error() {
  return (
    <>
      <h1>An error occured</h1>
      <p>Sorry 🤷</p>
    </>
  )
}
