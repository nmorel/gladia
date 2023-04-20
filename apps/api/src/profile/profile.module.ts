import {Module} from '@nestjs/common'
import {ProfileService} from './profile.service'
import {ProfileController} from './profile.controller'
import {UsersModule} from 'src/users/users.module'
import {AuthModule} from 'src/auth/auth.module'

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
