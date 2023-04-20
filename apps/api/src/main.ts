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
    .addTag('gladia')
    .build()
  patchNestjsSwagger()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
