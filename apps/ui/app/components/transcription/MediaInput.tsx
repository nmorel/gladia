import type {Dispatch, SetStateAction} from 'react'
import {useRef} from 'react'
import {Input} from '../form'

export type MediaFile = {file: File; dataUrl: string} | null

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
  return (
    <>
      <Input
        type="url"
        label={`Paste an url to ${kind === 'audio' ? 'an audio' : 'a video'} file:`}
        name={`${kind}_url`}
        hidden={!!file}
        defaultValue={
          kind === 'audio'
            ? 'http://files.gladia.io/example/audio-transcription/split_infinity.wav'
            : 'http://files.gladia.io/example/video-transcription/short-video.mp4'
        }
        disabled={disabled || !!file}
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
            setFile({file, dataUrl: URL.createObjectURL(file)})
          } else {
            setFile(null)
          }
        }}
      />
      {!!file && (
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">
              Selected {kind} file <span className="italic">{file.file.name}</span>
            </span>
          </label>
          {kind === 'audio' ? (
            <audio src={file.dataUrl} controls className="w-full" />
          ) : (
            <video src={file.dataUrl} controls className="w-full" />
          )}
          <button
            type="button"
            className="btn btn-accent btn-outline mt-2"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
              setFile(null)
            }}
          >
            Pick another file
          </button>
        </div>
      )}
    </>
  )
}
