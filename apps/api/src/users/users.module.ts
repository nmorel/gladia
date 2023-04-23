import {Module} from '@nestjs/common'
import {UsersService} from './users.service'

/** Module responsible of the users (create, read, update, delete) */
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
