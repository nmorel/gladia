import {MutableRefObject, RefCallback, forwardRef} from 'react'

export const MediaPlayer = forwardRef(function MediaPlayer(
  {
    kind,
    src,
  }: {
    kind: 'audio' | 'video'
    src: string
  },
  _ref:
    | RefCallback<HTMLAudioElement | HTMLVideoElement | null>
    | MutableRefObject<HTMLAudioElement | HTMLVideoElement | null>
    | null
) {
  // To please TS, otherwise the video ref is complaining
  const ref = (elt: HTMLAudioElement | HTMLVideoElement | null) => {
    if (typeof _ref === 'function') {
      _ref(elt)
    } else if (_ref) {
      _ref.current = elt
    }
  }
  return kind === 'audio' ? (
    <audio ref={ref} src={src} controls className="w-full" />
  ) : (
    <video ref={ref} src={src} controls className="w-full" />
  )
})
