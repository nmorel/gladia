import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {createApp} from './createApp'
import {PrismaClient} from '@gladia/db'

let app: INestApplication

beforeEach(async () => {
  app = (await createApp()).app
})

describe('Auth - Sign-in', () => {
  it('success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(
        JSON.stringify({
          email: 'john.doe@gmail.com',
          password: 'azerty',
        })
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(200)
    expect(response.body.token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./)
  })

  it('incorrect format', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(
        JSON.stringify({
          email: 'john@gmail.com',
          password: '<6ch',
        })
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(400)
  })

  it('incorrect email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(
        JSON.stringify({
          email: 'john@gmail.com',
          password: 'azerty',
        })
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(401)
  })

  it('incorrect password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(
        JSON.stringify({
          email: 'john.doe@gmail.com',
          password: 'qwerty',
        })
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(401)
  })
})

describe('Auth - Sign-up', () => {
  afterEach(async () => {
    const prismaClient = new PrismaClient()
    try {
      await prismaClient.user.delete({where: {email: 'jane.doe@gmail.com'}})
    } catch (err) {
      // noope
    }
  })

  it('success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(
        JSON.stringify({
          email: 'jane.doe@gmail.com',
          password: 'qwerty',
          name: 'Jane Doe',
        })
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(200)
    expect(response.body.token).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./)
  })

  it('existing email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(
        JSON.stringify({
          email: 'john.doe@gmail.com',
          password: 'qwerty',
          name: 'John Doe',
        })
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')

    expect(response.status).toEqual(409)
  })
})
