import {Module} from '@nestjs/common'
import {PrismaModule} from 'nestjs-prisma'
import {ConfigModule} from '@nestjs/config'
import {UsersModule} from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
