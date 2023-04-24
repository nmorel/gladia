import {INestApplication} from '@nestjs/common'
import * as request from 'supertest'
import {createAppAndRetriveJohnDoeToken} from './createApp'
import {PrismaClient} from '@gladia/db'
import * as bcrypt from 'bcrypt'

const prismaClient = new PrismaClient()

let app: INestApplication
let token: string

beforeEach(async () => {
  const result = await createAppAndRetriveJohnDoeToken()
  app = result.app
  token = result.token
})

describe('Profile - Read', () => {
  it('success', async () => {
    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      id: 1,
      email: 'john.doe@gmail.com',
      name: 'John Doe',
    })
  })

  it('no token', async () => {
    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Accept', 'application/json')

    expect(response.status).toEqual(401)
  })
})

describe('Profile - Update', () => {
  afterEach(async () => {
    try {
      await prismaClient.user.update({where: {id: 1}, data: {name: 'John Doe'}})
    } catch (err) {
      // noop
    }
  })

  it('success', async () => {
    let response = await request(app.getHttpServer())
      .patch('/profile')
      .send({name: 'John Albert Doe'})
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(204)

    response = await request(app.getHttpServer())
      .get('/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      id: 1,
      email: 'john.doe@gmail.com',
      name: 'John Albert Doe',
    })
  })

  it('no token', async () => {
    const response = await request(app.getHttpServer())
      .patch('/profile')
      .set('Accept', 'application/json')

    expect(response.status).toEqual(401)
  })
})

describe('Profile - Delete', () => {
  afterEach(async () => {
    try {
      await prismaClient.user.create({
        data: {
          id: 1,
          email: 'john.doe@gmail.com',
          password: await bcrypt.hash('azerty', 10),
          name: 'John Doe',
        },
      })
    } catch (err) {
      // noop
    }
  })

  it('success', async () => {
    const response = await request(app.getHttpServer())
      .delete('/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(204)

    const userCount = await prismaClient.user.count()
    expect(userCount).toEqual(0)
  })

  it('invalid token', async () => {
    const response = await request(app.getHttpServer())
      .delete('/profile')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}a`)

    expect(response.status).toEqual(401)
  })
})
