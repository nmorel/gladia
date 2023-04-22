import {forwardRef} from 'react'

export const MediaPlayer = forwardRef(function MediaPlayer({
  kind,
  src,
}: {
  kind: 'audio' | 'video'
  src: string
}) {
  return kind === 'audio' ? (
    <audio src={src} controls className="w-full" />
  ) : (
    <video src={src} controls className="w-full" />
  )
})
