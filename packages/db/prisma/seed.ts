import {PrismaClient} from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: {email: 'john.doe@gmail.com'},
    update: {},
    create: {
      email: 'john.doe@gmail.com',
      password: await bcrypt.hash('azerty', 10),
      name: 'John Doe',
    },
  })
  console.log('Default users added')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
