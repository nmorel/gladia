import {Module} from '@nestjs/common'
import {PrismaModule} from 'nestjs-prisma'
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from './auth/auth.module'
import {ProfileModule} from './profile/profile.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
