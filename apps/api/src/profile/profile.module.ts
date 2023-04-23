import {Module} from '@nestjs/common'
import {AuthModule} from '../auth/auth.module'
import {UsersModule} from '../users/users.module'
import {ProfileController} from './profile.controller'
import {ProfileService} from './profile.service'

/** Module responsible of user profile (read, update, delete) */
@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
