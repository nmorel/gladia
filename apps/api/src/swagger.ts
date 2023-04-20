import {INestApplication} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

export function buildOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Gladia API')
    .setDescription('Gladia API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'User token',
        description: 'Enter user token you got in response of /auth/sign-in or /auth/sign-up apis',
        in: 'header',
      },
      'UserToken'
    )
    .build()
  return SwaggerModule.createDocument(app, config)
}
