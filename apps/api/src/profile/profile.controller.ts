import {Body, Controller, Delete, Get, Patch, Req, UseGuards} from '@nestjs/common'
import {ProfileService} from './profile.service'
import {AuthGuard, UserRequest} from 'src/auth/auth.guard'

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() {user}: UserRequest) {
    return this.profileService.getProfile(user.id)
  }

  @Patch()
  updateProfile(@Req() {user}: UserRequest, @Body() body: {name: string}) {
    return this.profileService.updateProfile(user.id, body)
  }

  @Delete()
  deleteProfile(@Req() {user}: UserRequest) {
    return this.profileService.deleteProfile(user.id)
  }
}
