import type {TranscriptionResponseDto} from '@gladia/sdk'
import {getLiveSubtitle, parseSrtTime} from './LiveSubtitle'

describe('parseSrtTime', () => {
  test('should handle comma', () => {
    expect(parseSrtTime('00:01:34,345')).toEqual(94.345)
  })
  test('should handle dot', () => {
    expect(parseSrtTime('02:01:34.345')).toEqual(7294.345)
  })
  test('should return null if incorrect data', () => {
    expect(parseSrtTime('02 01 34.345')).toBeNull()
  })
})

const jsonData = {
  json: [
    {
      transcription: ' Split infinity in a time when less is more, where too much is never enough.',
      time_begin: 1.1780000000000002,
      time_end: 7.798,
      speaker: 'not_activated',
    },
    {
      transcription: ' There is always hope for the future. The future can be read from the past.',
      time_begin: 8.618,
      time_end: 14.138,
      speaker: 'not_activated',
    },
    {
      transcription: " The past foreshadows the present and the present hasn't been written yet.",
      time_begin: 14.658000000000001,
      time_end: 19.977999999999998,
      speaker: 'not_activated',
    },
  ],
} as TranscriptionResponseDto

const srtData = {
  srt: `1
00:00:01,170 --> 00:00:07,790
 Split infinity in a time when less is more, where too much is never enough.

2
00:00:08,610 --> 00:00:14,130
 There is always hope for the future. The future can be read from the past.

3
00:00:14,650 --> 00:00:19,970
 The past foreshadows the present and the present hasn't been written yet.
`,
} as TranscriptionResponseDto

const vttData = {
  vtt: `WEBVTT

1
00:00:01.178 --> 00:00:07.798
 Split infinity in a time when less is more, where too much is never enough.

2
00:00:08.618 --> 00:00:14.137
 There is always hope for the future. The future can be read from the past.

3
00:00:14.658 --> 00:00:19.977
 The past foreshadows the present and the present hasn't been written yet.
`,
} as TranscriptionResponseDto

describe('getLiveSubtitle', () => {
  test('should return `No transcription` if data are empty or invalid', () => {
    expect(getLiveSubtitle({}, 'json', 3)).toEqual('No transcription')
    expect(getLiveSubtitle({vtt: 'WEBVTT\n\n'}, 'vtt', 3)).toEqual('No transcription')
  })

  test("should return empty string if current time doesn't match", () => {
    expect(getLiveSubtitle(jsonData, 'json', 0.345)).toEqual(`\u00A0`)
  })

  test('should return correct line if current time match with json format', () => {
    expect(getLiveSubtitle(jsonData, 'json', 7.798)).toEqual(
      ' Split infinity in a time when less is more, where too much is never enough.'
    )
    expect(getLiveSubtitle(jsonData, 'json', 8.618)).toEqual(
      ' There is always hope for the future. The future can be read from the past.'
    )
    expect(getLiveSubtitle(jsonData, 'json', 18)).toEqual(
      " The past foreshadows the present and the present hasn't been written yet."
    )
  })

  test('should return correct line if current time match with srt format', () => {
    expect(getLiveSubtitle(srtData, 'srt', 7.79)).toEqual(
      ' Split infinity in a time when less is more, where too much is never enough.'
    )
    expect(getLiveSubtitle(srtData, 'srt', 8.61)).toEqual(
      ' There is always hope for the future. The future can be read from the past.'
    )
    expect(getLiveSubtitle(srtData, 'srt', 18)).toEqual(
      " The past foreshadows the present and the present hasn't been written yet."
    )
  })

  test('should return correct line if current time match with vtt format', () => {
    expect(getLiveSubtitle(vttData, 'vtt', 7.798)).toEqual(
      ' Split infinity in a time when less is more, where too much is never enough.'
    )
    expect(getLiveSubtitle(vttData, 'vtt', 8.618)).toEqual(
      ' There is always hope for the future. The future can be read from the past.'
    )
    expect(getLiveSubtitle(vttData, 'vtt', 18)).toEqual(
      " The past foreshadows the present and the present hasn't been written yet."
    )
  })
})
