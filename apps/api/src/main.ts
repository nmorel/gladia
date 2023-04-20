import {NestFactory} from '@nestjs/core'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import {AppModule} from './app.module'
import {patchNestjsSwagger} from '@anatine/zod-nestjs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
  patchNestjsSwagger()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document, {customSiteTitle: 'Gladia API'})
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
