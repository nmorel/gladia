import {INestApplication} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

export function buildOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Gladia API')
    .setDescription('Gladia API')
    .setVersion('1.0')
    .build()
  return SwaggerModule.createDocument(app, config)
}
