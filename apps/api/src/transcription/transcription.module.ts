import {Module} from '@nestjs/common'
import {TokenModule} from '../token/token.module'
import {TranscriptionApi} from './transcription.api'
import {TranscriptionController} from './transcription.controller'
import {TranscriptionService} from './transcription.service'

/** Module responsible of the audio/video transcription and the calls to Gladia API */
@Module({
  imports: [TokenModule],
  controllers: [TranscriptionController],
  providers: [TranscriptionService, TranscriptionApi],
})
export class TranscriptionModule {}
