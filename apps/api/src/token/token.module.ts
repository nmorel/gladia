import {Module} from '@nestjs/common'
import {AuthModule} from '../auth/auth.module'
import {TokenController} from './token.controller'
import {TokenService} from './token.service'

/** Module responsible of Gladia API tokens */
@Module({
  imports: [AuthModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
