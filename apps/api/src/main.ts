import {patchNestjsSwagger} from '@anatine/zod-nestjs'
import {NestFactory} from '@nestjs/core'
import {SwaggerModule} from '@nestjs/swagger'
import {AppModule} from './app.module'
import {buildOpenApiDocument} from './swagger'

async function bootstrap() {
  // Patch required to make zod-nestjs and @nestjs/swagger work together
  patchNestjsSwagger()

  const app = await NestFactory.create(AppModule)

  const document = buildOpenApiDocument(app)
  SwaggerModule.setup('doc', app, document, {customSiteTitle: 'Gladia API'})

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
