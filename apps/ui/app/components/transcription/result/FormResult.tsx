import {type TranscriptionResponseDto} from '@gladia/sdk'
import {type MediaFile} from '../types'
import {MediaPlayer} from '../MediaPlayer'
import {useEffect, useRef, useState} from 'react'
import {cx} from '~/helpers/classnames'
import {JsonTree} from '~/components/json-tree'
import {CopyAndDownload} from './CopyAndDownload'
import {LiveSubtitle} from './LiveSubtitle'

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

  const mediaEltRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null)

  const outputFormat = Object.keys(data).find((f) => f !== 'prediction_raw') as Exclude<
    NonNullable<keyof TranscriptionResponseDto>,
    'prediction_raw'
  >
  const [tab, setTab] = useState<NonNullable<keyof TranscriptionResponseDto> | 'live'>(outputFormat)
  const showJsonTree = tab === 'prediction_raw' || tab === 'json'
  const showLive = (!!data.json && !!Object.keys(data.json).length) || !!data.srt || !!data.vtt
  const hasRawResult = !!data.prediction_raw
  const showTabs = showLive || hasRawResult

  return (
    <div ref={containerRef} className="min-h-screen">
      <div className="divider my-12">Result</div>
      <div className="flex flex-col mx-auto max-w-5xl">
        <label className="label font-semibold">
          <span className="label-text italic">{file.file?.name ?? file.url}</span>
        </label>
        <MediaPlayer ref={mediaEltRef} kind={kind} src={file.dataUrl ?? file.url} />
      </div>
      {showTabs && (
        <div className="tabs justify-center">
          <button
            type="button"
            className={cx('tab tab-bordered', {'tab-active': tab === outputFormat})}
            onClick={() => setTab(outputFormat)}
          >
            {outputFormat.toUpperCase()}
          </button>
          {showLive && (
            <button
              type="button"
              className={cx('tab tab-bordered', {'tab-active': tab === 'live'})}
              onClick={() => setTab('live')}
            >
              LIVE
            </button>
          )}
          {hasRawResult && (
            <button
              type="button"
              className={cx('tab tab-bordered', {'tab-active': tab === 'prediction_raw'})}
              onClick={() => setTab('prediction_raw')}
            >
              RAW
            </button>
          )}
        </div>
      )}

      <div
        className={cx(
          'relative border border-accent rounded-md px-2 py-1 mt-4 font-mono text-sm bg-base-300',
          {
            'whitespace-pre-line': !showJsonTree,
          }
        )}
      >
        {tab === 'prediction_raw' ? (
          <JsonTree
            data={data.prediction_raw}
            expandNode={(path, lvl) => lvl <= 2 && path[path.length - 1] !== 'metadata'}
          />
        ) : tab === 'live' ? (
          <LiveSubtitle data={data} property={outputFormat} mediaEltRef={mediaEltRef} />
        ) : !data[tab] ? (
          'No result'
        ) : tab === 'json' ? (
          <JsonTree data={data.json} />
        ) : (
          data[tab]
        )}

        {tab !== 'live' && !!data[tab] && <CopyAndDownload data={data} property={tab} />}
      </div>
    </div>
  )
}
