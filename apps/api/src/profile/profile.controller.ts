import {ZodValidationPipe} from '@anatine/zod-nestjs'
import {Body, Controller, Delete, Get, Patch, Req, UseGuards, UsePipes} from '@nestjs/common'
import {ApiCreatedResponse, ApiHeaders, ApiOperation, ApiTags} from '@nestjs/swagger'
import {AuthGuard, UserRequest} from 'src/auth/auth.guard'
import {GetProfileResponseDto, UpdateProfileDto} from './profile.dto'
import {ProfileService} from './profile.service'

@Controller('profile')
@UseGuards(AuthGuard)
@ApiTags('profile')
@ApiHeaders([{name: 'Authorization', description: 'Bearer token', required: true}])
@UsePipes(ZodValidationPipe)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    operationId: 'get-profile',
    summary: 'Return profile informations of the authenticated user',
  })
  @ApiCreatedResponse({
    type: GetProfileResponseDto,
  })
  getProfile(@Req() {user}: UserRequest): Promise<GetProfileResponseDto> {
    return this.profileService.getProfile(user.id)
  }

  @Patch()
  @ApiOperation({
    operationId: 'update-profile',
    summary: 'Update profile informations of the authenticated user',
  })
  @ApiCreatedResponse()
  updateProfile(@Req() {user}: UserRequest, @Body() body: UpdateProfileDto): Promise<void> {
    return this.profileService.updateProfile(user.id, body)
  }

  @Delete()
  @ApiOperation({operationId: 'delete-profile', summary: 'Delete user account'})
  @ApiCreatedResponse()
  deleteProfile(@Req() {user}: UserRequest): Promise<void> {
    return this.profileService.deleteProfile(user.id)
  }
}
