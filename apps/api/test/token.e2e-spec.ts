import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {createAppAndRetriveJohnDoeToken} from './createApp'

let app: INestApplication
let token: string
let gladiaToken: string | undefined
const fakeApiToken = '11111111-2222-3333-4444-555566667777'

beforeEach(async () => {
  const result = await createAppAndRetriveJohnDoeToken()
  app = result.app
  token = result.token
  gladiaToken = process.env.GLADIA_API_TOKEN
  process.env.GLADIA_API_TOKEN = fakeApiToken
})

afterEach(() => {
  process.env.GLADIA_API_TOKEN = gladiaToken
})

describe('Token - Read', () => {
  it('success', async () => {
    const response = await request(app.getHttpServer())
      .get('/token')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: fakeApiToken,
    })
  })

  it('no user token', async () => {
    const response = await request(app.getHttpServer())
      .get('/token')
      .set('Accept', 'application/json')

    expect(response.status).toEqual(401)
  })

  it('no api token', async () => {
    delete process.env.GLADIA_API_TOKEN
    const response = await request(app.getHttpServer())
      .get('/token')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(404)
  })
})
