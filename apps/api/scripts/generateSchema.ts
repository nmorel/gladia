import {NestFactory} from '@nestjs/core'
import {buildOpenApiDocument} from '../src/swagger'
import {AppModule} from '../src/app.module'
import {writeFile} from 'node:fs/promises'

async function generate(destFile: string) {
  const app = await NestFactory.create(AppModule)
  const document = buildOpenApiDocument(app)
  await writeFile(destFile, JSON.stringify(document, null, 2), 'utf-8')
  console.log(`Schema written to ${destFile}`)
}
generate(process.argv[process.argv.length - 1])
