import {Injectable, NotFoundException} from '@nestjs/common'

@Injectable()
export class TokenService {
  async getToken(): Promise<{token: string}> {
    // Since we can't control the token generation, the same token is always returned
    if (!process.env.GLADIA_API_TOKEN) throw new NotFoundException()
    return {token: process.env.GLADIA_API_TOKEN}
  }
}
