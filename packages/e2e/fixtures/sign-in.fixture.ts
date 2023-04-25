import {PrismaClient} from '@gladia/db'
import {Page, test} from '@playwright/test'
import * as bcrypt from 'bcrypt'

export const signInTest = test.extend<{
  user: {email: string; password: string; name: string}
  page: Page
}>({
  user: {
    email: 'test.e2e@gmail.com',
    password: 'azerty',
    name: 'Test E2E',
  },
  page: async ({page, user}, use) => {
    const prismaClient = new PrismaClient()
    const password = await bcrypt.hash(user.password, 10)
    await prismaClient.user.upsert({
      where: {email: user.email},
      update: {
        ...user,
        password,
      },
      create: {
        ...user,
        password,
      },
    })

    await use(page)

    await prismaClient.$disconnect()
  },
})
