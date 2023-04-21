import {Module} from '@nestjs/common'
import {PrismaModule} from 'nestjs-prisma'
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from './auth/auth.module'
import {ProfileModule} from './profile/profile.module'
import {TranscriptionModule} from './transcription/transcription.module'

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
    TranscriptionModule,
  ],
})
export class AppModule {}
