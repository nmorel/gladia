import {TranscriptionResponseDto} from '@gladia/sdk'
import {MediaFile} from './MediaInput'
import {MediaPlayer} from './MediaPlayer'
import {useEffect, useRef, useState} from 'react'
import {cx} from '~/helpers/classnames'

export function FormResult({
  kind,
  file,
  data,
}: {
  kind: 'audio' | 'video'
  file: MediaFile
  data: TranscriptionResponseDto
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    containerRef?.current?.scrollIntoView({behavior: 'smooth'})
  }, [])

  const [showRawResult, setShowRawResult] = useState(false)

  return (
    <div ref={containerRef}>
      <div className="divider my-12">Result</div>
      <div className="flex flex-col mx-auto max-w-5xl">
        <label className="label font-semibold">
          <span className="label-text italic">{file.file?.name ?? file.url}</span>
        </label>
        <MediaPlayer kind={kind} src={file.dataUrl ?? file.url} />
      </div>
      {data.prediction_raw && (
        <div className="tabs justify-center mb-4">
          <button
            type="button"
            className={cx('tab tab-bordered', {'tab-active': !showRawResult})}
            onClick={() => setShowRawResult(false)}
          >
            {(Object.keys(data).find((f) => f !== 'prediction_raw') || 'Result').toUpperCase()}
          </button>
          <button
            type="button"
            className={cx('tab tab-bordered', {'tab-active': showRawResult})}
            onClick={() => setShowRawResult(true)}
          >
            RAW
          </button>
        </div>
      )}
      {showRawResult ? (
        <pre>{JSON.stringify(data.prediction_raw, null, 2)}</pre>
      ) : data.plain ?? data.txt ? (
        <div>{data.plain ?? data.txt}</div>
      ) : data.srt ?? data.vtt ? (
        <div>{data.plain ?? data.txt}</div>
      ) : data.json ? (
        <pre>{JSON.stringify(data.json, null, 2)}</pre>
      ) : (
        'No result'
      )}
    </div>
  )
}
