import {Module} from '@nestjs/common'
import {TranscriptionService} from './transcription.service'
import {TranscriptionController} from './transcription.controller'
import {TokenModule} from 'src/token/token.module'

/** Module responsible of the audio/video transcription and the calls to Gladia API */
@Module({
  imports: [TokenModule],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
})
export class TranscriptionModule {}
