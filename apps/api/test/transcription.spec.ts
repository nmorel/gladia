import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {createAppAndRetriveJohnDoeToken} from './createApp'

let app: INestApplication
let transcriptionApiMock: {mediaToText: jest.Mock}
let token: string
let gladiaToken: string | undefined
const fakeApiToken = '11111111-2222-3333-4444-555566667777'

beforeEach(async () => {
  const result = await createAppAndRetriveJohnDoeToken()
  app = result.app
  transcriptionApiMock = result.transcriptionApiMock
  token = result.token
  gladiaToken = process.env.GLADIA_API_TOKEN
  process.env.GLADIA_API_TOKEN = fakeApiToken
})

afterEach(() => {
  process.env.GLADIA_API_TOKEN = gladiaToken
  transcriptionApiMock.mediaToText.mockReset()
})

describe('Transcription - Audio', () => {
  it('success with audio file', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({txt: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/audio-to-text')
      .attach('audio', '../../samples/split_infinity.wav')
      .field('output_format', 'txt')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      txt: 'Hello Gladia',
    })
    expect(transcriptionApiMock.mediaToText).toHaveBeenCalledWith(
      'audio',
      {
        audio: expect.anything(),
        output_format: 'txt',
      },
      fakeApiToken
    )
  })

  it('success with audio url', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({plain: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/audio-to-text')
      .field('audio_url', 'http://files.gladia.io/example/audio-transcription/split_infinity.wav')
      .field('output_format', 'plain')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      plain: 'Hello Gladia',
    })
    expect(transcriptionApiMock.mediaToText).toHaveBeenCalledWith(
      'audio',
      {
        audio_url: 'http://files.gladia.io/example/audio-transcription/split_infinity.wav',
        output_format: 'plain',
      },
      fakeApiToken
    )
  })

  it('missing audio', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({plain: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/audio-to-text')
      .field('output_format', 'plain')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(400)
  })

  it('missing output', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({plain: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/audio-to-text')
      .field('audio_url', 'http://files.gladia.io/example/audio-transcription/split_infinity.wav')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(400)
  })

  it('no token', async () => {
    const response = await request(app.getHttpServer())
      .post('/transcription/audio-to-text')
      .set('Accept', 'application/json')

    expect(response.status).toEqual(401)
  })
})

describe('Transcription - Video', () => {
  it('success with video file', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({txt: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/video-to-text')
      .attach('video', '../../samples/short-video.mp4')
      .field('output_format', 'txt')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      txt: 'Hello Gladia',
    })
    expect(transcriptionApiMock.mediaToText).toHaveBeenCalledWith(
      'video',
      {
        video: expect.anything(),
        output_format: 'txt',
      },
      fakeApiToken
    )
  })

  it('success with video url', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({plain: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/video-to-text')
      .field('video_url', 'http://files.gladia.io/example/video-transcription/short-video.mp4')
      .field('output_format', 'plain')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      plain: 'Hello Gladia',
    })
    expect(transcriptionApiMock.mediaToText).toHaveBeenCalledWith(
      'video',
      {
        video_url: 'http://files.gladia.io/example/video-transcription/short-video.mp4',
        output_format: 'plain',
      },
      fakeApiToken
    )
  })

  it('missing video', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({plain: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/video-to-text')
      .field('output_format', 'plain')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(400)
  })

  it('missing output', async () => {
    transcriptionApiMock.mediaToText.mockReturnValueOnce(Promise.resolve({plain: 'Hello Gladia'}))

    const response = await request(app.getHttpServer())
      .post('/transcription/video-to-text')
      .field('video_url', 'http://files.gladia.io/example/video-transcription/short-video.mp4')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(400)
  })

  it('no token', async () => {
    const response = await request(app.getHttpServer())
      .post('/transcription/video-to-text')
      .set('Accept', 'application/json')

    expect(response.status).toEqual(401)
  })
})
