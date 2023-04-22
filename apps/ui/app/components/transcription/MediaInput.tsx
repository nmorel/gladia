import type {Dispatch, SetStateAction} from 'react'
import {useRef} from 'react'
import {Input} from '../form'
import {MediaPlayer} from './MediaPlayer'

export type MediaFile =
  | {file: File; dataUrl: string; url: string}
  | {file?: null; dataUrl?: null; url: string}

export function MediaInput({
  kind,
  disabled,
  file,
  setFile,
}: {
  kind: 'audio' | 'video'
  disabled: boolean
  file: MediaFile
  setFile: Dispatch<SetStateAction<MediaFile>>
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const isLocalFile = !!file?.file
  return (
    <>
      <Input
        type="url"
        label={`Paste an url to ${kind === 'audio' ? 'an audio' : 'a video'} file:`}
        name={`${kind}_url`}
        hidden={isLocalFile}
        value={file.url}
        onChange={(evt) => setFile((f) => ({...f, url: evt.currentTarget.value}))}
        disabled={disabled || isLocalFile}
      />
      <Input
        type="file"
        ref={fileInputRef}
        label={`Or pick a local ${kind} file:`}
        name={kind}
        hidden={!!file}
        accept={`${kind}/*`}
        disabled={disabled}
        onChange={(evt) => {
          const file = evt.currentTarget.files?.[0]
          if (file) {
            setFile((f) => ({file, dataUrl: URL.createObjectURL(file), url: f.url}))
          } else {
            setFile((f) => ({url: f.url}))
          }
        }}
      />
      {isLocalFile && (
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">
              Selected {kind} file <span className="italic">{file.file.name}</span>
            </span>
          </label>
          <MediaPlayer kind={kind} src={file.dataUrl} />
          <button
            type="button"
            className="btn btn-accent btn-outline mt-2"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
              setFile((f) => ({url: f.url}))
            }}
          >
            Pick another file
          </button>
        </div>
      )}
    </>
  )
}
