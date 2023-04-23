import {User} from '@gladia/db'
import {Injectable} from '@nestjs/common'
import {UsersService} from 'src/users/users.service'

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  async getProfile(userId: User['id']): Promise<Omit<User, 'password'>> {
    const {password, ...user} = await this.usersService.findById(userId)
    return user
  }

  async updateProfile(
    userId: User['id'],
    data: Parameters<UsersService['updateUser']>[1]
  ): Promise<void> {
    await this.usersService.updateUser(userId, data)
  }

  async deleteProfile(userId: User['id']): Promise<void> {
    await this.usersService.deleteUser(userId)
  }
}
