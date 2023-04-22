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
import {AudioToTextDto, TranscriptionResponseDto, VideoToTextDto} from './transcription.dto'
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
  @ApiCreatedResponse({type: TranscriptionResponseDto})
  audioToText(
    @Body() body: AudioToTextDto,
    @UploadedFile() audio?: Express.Multer.File
  ): Promise<TranscriptionResponseDto> {
    return this.transcriptionService.audioToText({
      ...body,
      audio,
    })
  }

  @Post('video-to-text')
  @UseInterceptors(FileInterceptor('video'))
  @ApiOperation({operationId: 'video-to-text'})
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({type: TranscriptionResponseDto})
  videoToText(
    @Body() body: VideoToTextDto,
    @UploadedFile() video?: Express.Multer.File
  ): Promise<TranscriptionResponseDto> {
    return this.transcriptionService.videoToText({
      ...body,
      video,
    })
  }
}
