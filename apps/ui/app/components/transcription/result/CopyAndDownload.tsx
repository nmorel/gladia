import type {TranscriptionResponseDto} from '@gladia/sdk'

export function CopyAndDownload({
  data,
  property,
}: {
  data: TranscriptionResponseDto
  property: keyof TranscriptionResponseDto & {}
}) {
  const getDataAsText = () => {
    if (property === 'prediction_raw' || property === 'json') {
      return JSON.stringify(data[property], null, 2)
    } else {
      return data[property] ?? ''
    }
  }

  return (
    <div className="absolute top-2 right-2">
      {/* Copy button */}
      <button
        type="button"
        className="btn btn-outline btn-sm w-8 p-2 mr-2"
        onClick={(evt) => {
          const input = document.createElement('textarea')
          input.value = getDataAsText()
          document.body.appendChild(input)
          input.select()
          input.setSelectionRange(0, 99999)
          navigator.clipboard.writeText(input.value)
          document.body.removeChild(input)
          evt.currentTarget.focus()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentcolor"
            d="M 4 2 C 2.895 2 2 2.895 2 4 L 2 17 C 2 17.552 2.448 18 3 18 C 3.552 18 4 17.552 4 17 L 4 4 L 17 4 C 17.552 4 18 3.552 18 3 C 18 2.448 17.552 2 17 2 L 4 2 z M 8 6 C 6.895 6 6 6.895 6 8 L 6 20 C 6 21.105 6.895 22 8 22 L 20 22 C 21.105 22 22 21.105 22 20 L 22 8 C 22 6.895 21.105 6 20 6 L 8 6 z M 8 8 L 20 8 L 20 20 L 8 20 L 8 8 z"
          />
        </svg>
      </button>

      {/* Download button */}
      <button
        type="button"
        className="btn btn-outline btn-sm w-8 p-2"
        onClick={(evt) => {
          let extension: string
          if (property === 'prediction_raw' || property === 'json') {
            extension = 'json'
          } else if (property === 'srt' || property === 'vtt') {
            extension = property
          } else {
            extension = 'txt'
          }

          const blob = new Blob([getDataAsText()], {
            type: 'text/plain',
          })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = `result${property === 'prediction_raw' ? '-raw' : ''}.${extension}`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
          evt.currentTarget.focus()
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentcolor"
            d="M 11 2 C 10.448 2 10 2.448 10 3 L 10 11 L 6.5 11 A 0.5 0.5 0 0 0 6 11.5 A 0.5 0.5 0 0 0 6.1464844 11.853516 A 0.5 0.5 0 0 0 6.1777344 11.882812 L 11.283203 16.697266 L 11.316406 16.728516 A 1 1 0 0 0 12 17 A 1 1 0 0 0 12.683594 16.728516 L 12.697266 16.716797 A 1 1 0 0 0 12.707031 16.705078 L 17.810547 11.892578 A 0.5 0.5 0 0 0 17.839844 11.865234 L 17.847656 11.859375 A 0.5 0.5 0 0 0 17.853516 11.853516 A 0.5 0.5 0 0 0 18 11.5 A 0.5 0.5 0 0 0 17.5 11 L 14 11 L 14 3 C 14 2.448 13.552 2 13 2 L 12 2 L 11 2 z M 3 20 A 1.0001 1.0001 0 1 0 3 22 L 21 22 A 1.0001 1.0001 0 1 0 21 20 L 3 20 z"
          />
        </svg>
      </button>
    </div>
  )
}
