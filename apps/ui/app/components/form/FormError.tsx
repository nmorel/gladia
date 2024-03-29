export function FormError({statusCode}: {statusCode: number}) {
  let errorLabel: string
  switch (statusCode) {
    case 400:
      errorLabel = 'Invalid form'
      break
    case 401:
    case 403:
      errorLabel = 'Incorrect email/password'
      break
    case 404:
      errorLabel = 'Not found'
      break
    default:
      errorLabel = 'An error occurred'
      break
  }
  return (
    <div className="fixed top-0 left-0 p-4 w-screen z-20">
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorLabel}</span>
        </div>
      </div>
    </div>
  )
}
