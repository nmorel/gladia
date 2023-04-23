import {Module} from '@nestjs/common'
import {TranscriptionService} from './transcription.service'
import {TranscriptionController} from './transcription.controller'
import {TokenModule} from 'src/token/token.module'

@Module({
  imports: [TokenModule],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
})
export class TranscriptionModule {}
