import {TranscriptionResponseDto} from '@gladia/sdk'
import {MediaFile} from './MediaInput'
import {MediaPlayer} from './MediaPlayer'
import {useEffect, useRef, useState} from 'react'
import {cx} from '~/helpers/classnames'
import {JsonTree} from '../json-tree'

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
  const showJsonTree = showRawResult || !!data.json

  return (
    <div ref={containerRef} className="min-h-screen">
      <div className="divider my-12">Result</div>
      <div className="flex flex-col mx-auto max-w-5xl">
        <label className="label font-semibold">
          <span className="label-text italic">{file.file?.name ?? file.url}</span>
        </label>
        <MediaPlayer kind={kind} src={file.dataUrl ?? file.url} />
      </div>
      {data.prediction_raw && (
        <div className="tabs justify-center">
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

      <div
        className={cx('border border-accent rounded-md px-2 py-1 mt-4 font-mono text-sm', {
          'whitespace-pre-line': !showJsonTree,
        })}
      >
        {showRawResult ? (
          <JsonTree
            data={data.prediction_raw}
            expandNode={(path, lvl) => lvl <= 2 && path[path.length - 1] !== 'metadata'}
          />
        ) : data.json ? (
          <JsonTree data={data.json} />
        ) : data.srt ?? data.vtt ? (
          data.srt ?? data.vtt
        ) : data.plain ?? data.txt ? (
          data.plain ?? data.txt
        ) : (
          'No result'
        )}
      </div>
    </div>
  )
}
