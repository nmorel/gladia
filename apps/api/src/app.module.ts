import {Module} from '@nestjs/common'
import {CustomPrismaModule} from 'nestjs-prisma'
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from './auth/auth.module'
import {ProfileModule} from './profile/profile.module'
import {TranscriptionModule} from './transcription/transcription.module'
import {PrismaClient} from '@gladia/db'
import {TokenModule} from './token/token.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomPrismaModule.forRoot({
      isGlobal: true,
      name: 'PrismaDatabase',
      client: new PrismaClient(),
    }),
    AuthModule,
    ProfileModule,
    TranscriptionModule,
    TokenModule,
  ],
})
export class AppModule {}
