import {Injectable} from '@nestjs/common'
import {PrismaService} from 'nestjs-prisma'
import {User} from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmailAndPassword(email: string, password: string) {
    const user = await this.prisma.user.findUniqueOrThrow({where: {email}})
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new Error('Not found')
    }
    return this.filterUser(user)
  }

  async createUser(newUser: Omit<User, 'id'>) {
    const hashedPassword = await bcrypt.hash(newUser.password, 10)
    return this.filterUser(
      await this.prisma.user.create({
        data: {
          ...newUser,
          password: hashedPassword,
        },
      })
    )
  }

  async deleteUser(userId: User['id']) {
    return this.filterUser(await this.prisma.user.delete({where: {id: userId}}))
  }

  private filterUser({password, ...user}: User): Omit<User, 'password'> {
    return user
  }
}
