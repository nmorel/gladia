import {Inject, Injectable} from '@nestjs/common'
import {CustomPrismaService} from 'nestjs-prisma'
import {PrismaClient, User} from '@gladia/db'

@Injectable()
export class UsersService {
  constructor(@Inject('PrismaDatabase') private prisma: CustomPrismaService<PrismaClient>) {}

  findById(userId: User['id']): Promise<User> {
    return this.prisma.client.user.findUniqueOrThrow({where: {id: userId}})
  }

  findByEmail(email: User['email']): Promise<User> {
    return this.prisma.client.user.findUniqueOrThrow({where: {email}})
  }

  createUser(newUser: Omit<User, 'id'>) {
    return this.prisma.client.user.create({
      data: newUser,
    })
  }

  updateUser(userId: User['id'], data: Partial<Omit<User, 'id' | 'email' | 'password'>>) {
    return this.prisma.client.user.update({where: {id: userId}, data})
  }

  async deleteUser(userId: User['id']) {
    return await this.prisma.client.user.delete({where: {id: userId}})
  }
}
