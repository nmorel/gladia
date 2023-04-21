import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import {FileInterceptor} from '@nestjs/platform-express'
import {ApiConsumes, ApiCreatedResponse, ApiHeaders, ApiOperation, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from 'src/auth/auth.guard'
import {AudioToTextDto} from './transcription.dto'
import {TranscriptionService} from './transcription.service'

@Controller('transcription')
@UseGuards(AuthGuard)
@ApiTags('transcription')
@ApiHeaders([{name: 'Authorization', description: 'Bearer token', required: true}])
@UsePipes(ZodValidationPipe)
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('audio-to-text')
  @UseInterceptors(FileInterceptor('audio'))
  @ApiOperation({operationId: 'audio-to-text'})
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse()
  audioToText(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AudioToTextDto
  ): Promise<void> {
    console.log(file)
    // @ts-ignore
    return this.transcriptionService.audioToText({
      ...body,
      // audio: file,
      // @ts-ignore
      audio_url: 'http://files.gladia.io/example/audio-transcription/split_infinity.wav',
    })
  }
}
