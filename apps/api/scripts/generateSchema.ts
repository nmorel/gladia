import {NestFactory} from '@nestjs/core'
import {buildOpenApiDocument} from '../src/swagger'
import {AppModule} from 'src/app.module'
import {join} from 'node:path'
import {writeFile} from 'node:fs/promises'

async function generate() {
  const app = await NestFactory.create(AppModule)
  const document = buildOpenApiDocument(app)
  await writeFile(
    join(__dirname, '../../../packages/schema/api.json'),
    JSON.stringify(document, null, 2),
    'utf-8'
  )
  console.log('Schema written')
}

generate()
