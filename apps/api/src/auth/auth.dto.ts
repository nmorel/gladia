import {createZodDto} from '@anatine/zod-nestjs'
import {z} from 'zod'

const SignIn = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export class SignInDto extends createZodDto(SignIn) {}

const SignUp = SignIn.extend({
  name: z.string(),
})
export class SignUpDto extends createZodDto(SignUp) {}

const SignInUpResponse = z.object({
  token: z.string(),
})
export class SignInUpResponseDto extends createZodDto(SignInUpResponse) {}
