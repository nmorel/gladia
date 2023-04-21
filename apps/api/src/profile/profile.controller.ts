import {Body, Controller, Delete, Get, Patch, Req, UseGuards, UsePipes} from '@nestjs/common'
import {ProfileService} from './profile.service'
import {AuthGuard, UserRequest} from 'src/auth/auth.guard'
import {ApiCreatedResponse, ApiHeaders, ApiOperation, ApiTags} from '@nestjs/swagger'
import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {GetProfileResponseDto} from './profile.dto'

@Controller('profile')
@UseGuards(AuthGuard)
@ApiTags('profile')
@ApiHeaders([{name: 'Authorization', description: 'Bearer token', required: true}])
@UsePipes(ZodValidationPipe)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({operationId: 'get-profile'})
  @ApiCreatedResponse({
    type: GetProfileResponseDto,
  })
  getProfile(@Req() {user}: UserRequest): Promise<GetProfileResponseDto> {
    return this.profileService.getProfile(user.id)
  }

  @Patch()
  @ApiOperation({operationId: 'update-profile'})
  @ApiCreatedResponse()
  updateProfile(@Req() {user}: UserRequest, @Body() body: {name: string}): Promise<void> {
    return this.profileService.updateProfile(user.id, body)
  }

  @Delete()
  @ApiOperation({operationId: 'delete-profile'})
  @ApiCreatedResponse()
  deleteProfile(@Req() {user}: UserRequest): Promise<void> {
    return this.profileService.deleteProfile(user.id)
  }
}
