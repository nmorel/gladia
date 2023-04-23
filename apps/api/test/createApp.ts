import {Test, TestingModule} from '@nestjs/testing'
import {AppModule} from '../src/app.module'

import * as request from 'supertest'
import {TranscriptionApi} from '../src/transcription/transcription.api'

export async function createApp() {
  const transcriptionApiMock = {
    mediaToText: jest.fn(),
  }
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(TranscriptionApi)
    .useValue(transcriptionApiMock)
    .compile()

  const app = moduleFixture.createNestApplication()
  await app.init()
  return {app, transcriptionApiMock}
}

export async function createAppAndRetriveJohnDoeToken() {
  const app = await createApp()
  const response = await request(app.app.getHttpServer())
    .post('/auth/sign-in')
    .send(
      JSON.stringify({
        email: 'john.doe@gmail.com',
        password: 'azerty',
      })
    )
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')

  return {...app, token: response.body.token as string}
}
