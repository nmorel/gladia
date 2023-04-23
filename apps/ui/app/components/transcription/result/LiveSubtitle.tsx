import {type TranscriptionResponseDto} from '@gladia/sdk'
import {useState, type MutableRefObject, useEffect} from 'react'

function parseSrtTime(time: string) {
  const result = /([0-9]{2}):([0-9]{2}):([0-9]{2}[,.][0-9]{3})/.exec(time)
  if (!result) return null
  const [, hh, mm, ss] = result
  return parseFloat(ss.replace(',', '.')) + parseInt(mm, 10) * 60 + parseInt(hh, 10) * 60 * 60
}

export function LiveSubtitle({
  data,
  property,
  mediaEltRef,
}: {
  data: TranscriptionResponseDto
  property: NonNullable<keyof TranscriptionResponseDto>
  mediaEltRef: MutableRefObject<HTMLAudioElement | HTMLVideoElement | null>
}) {
  const [timestamp, setTimestamp] = useState(0)
  useEffect(() => {
    const mediaElt = mediaEltRef.current
    if (!mediaElt) return

    setTimestamp(mediaElt.currentTime)
    const cb = () => {
      setTimestamp(mediaElt.currentTime)
    }
    mediaElt.addEventListener('timeupdate', cb)
    return () => {
      mediaElt.removeEventListener('timeupdate', cb)
    }
  }, [mediaEltRef])

  if (!data[property]) return null

  let parsedValue:
    | Array<
        Pick<
          NonNullable<TranscriptionResponseDto['json']>[number],
          'transcription' | 'time_begin' | 'time_end' | 'speaker'
        >
      >
    | undefined

  if (property === 'json') {
    parsedValue = data[property]
  } else if (property === 'srt' || property === 'vtt') {
    parsedValue = (data[property] ?? '')
      .split('\n\n')
      .map((line) => {
        console.log({line})
        const [, time, text] = line.split('\n')
        const [, timeBegin, timeEnd] = /^([0-9:,.]+) --> ([0-9:,.]+)$/.exec(time) ?? []
        if (!timeBegin || !timeEnd || !text) return null

        const time_begin = parseSrtTime(timeBegin)
        const time_end = parseSrtTime(timeEnd)
        if (time_begin === null || time_end === null) return null

        return {
          transcription: text,
          time_begin,
          time_end,
          speaker: 'not_activated',
        } as const
      })
      .filter(function <T>(val: T): val is NonNullable<T> {
        return !!val
      })
  }

  if (!parsedValue?.length) {
    return <span>No transcription</span>
  }

  const {transcription, speaker} =
    parsedValue?.find(({time_begin, time_end}) => {
      return time_begin <= timestamp && time_end >= timestamp
    }) ?? {}

  if (!transcription) {
    return <span>&nbsp;</span>
  }

  let speakerName: string | undefined
  if (typeof speaker === 'number') {
    speakerName = `Speaker ${speaker.toString().padStart(2, '0')}`
  } else if ((speaker ?? 'not_activated') === 'not_activated') {
    speakerName = ''
  } else {
    speakerName = speaker
  }

  return <span>{`${speakerName ? `${speakerName}: ` : ''}${transcription}`}</span>
}
