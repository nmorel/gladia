import type {TranscriptionResponseDto} from '@gladia/sdk'
import {Copy, Download} from '~/icons'

export function CopyAndDownload({
  data,
  property,
}: {
  data: TranscriptionResponseDto
  property: NonNullable<keyof TranscriptionResponseDto>
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
        <Copy />
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
        <Download />
      </button>
    </div>
  )
}
