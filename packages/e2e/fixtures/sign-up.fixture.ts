import {PrismaClient} from '@gladia/db'
import {Page, test} from '@playwright/test'

export const signUpTest = test.extend<{
  email: string
  page: Page
}>({
  email: 'test.e2e@gmail.com',
  page: async ({page, email}, use) => {
    const prismaClient = new PrismaClient()
    await prismaClient.user.deleteMany({
      where: {email},
    })

    await use(page)

    await prismaClient.user.deleteMany({
      where: {email},
    })
    await prismaClient.$disconnect()
  },
})
