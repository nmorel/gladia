import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {UsersModule} from 'src/users/users.module'
import {AuthController} from './auth.controller'
import {AuthGuard} from './auth.guard'
import {AuthService} from './auth.service'

/** Module responsible of authenticating users and creating new one */
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '604800s'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
