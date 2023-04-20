import {Injectable} from '@nestjs/common'
import {PrismaService} from 'nestjs-prisma'
import {User} from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(userId: User['id']): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({where: {id: userId}})
  }

  findByEmail(email: User['email']): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({where: {email}})
  }

  createUser(newUser: Omit<User, 'id'>) {
    return this.prisma.user.create({
      data: newUser,
    })
  }

  updateUser(userId: User['id'], data: Partial<Omit<User, 'id' | 'email' | 'password'>>) {
    return this.prisma.user.update({where: {id: userId}, data})
  }

  async deleteUser(userId: User['id']) {
    return await this.prisma.user.delete({where: {id: userId}})
  }
}
