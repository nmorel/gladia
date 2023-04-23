import {Injectable, NotFoundException} from '@nestjs/common'

@Injectable()
export class TokenService {
  async getToken(): Promise<{token: string}> {
    if (!process.env.GLADIA_API_TOKEN) throw new NotFoundException()
    return {token: process.env.GLADIA_API_TOKEN}
  }
}
