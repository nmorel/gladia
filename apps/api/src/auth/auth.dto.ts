import {createZodDto} from '@anatine/zod-nestjs'
import {SignIn, SignUp, UserToken} from '@gladia/zod-types'

export class SignInDto extends createZodDto(SignIn) {}
export class SignUpDto extends createZodDto(SignUp) {}
export class SignInUpResponseDto extends createZodDto(UserToken) {}
