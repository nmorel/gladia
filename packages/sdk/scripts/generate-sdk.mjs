import {join} from 'node:path'
import {$} from 'zx'

const rootFolder = join(__dirname, '..')
const apiFile = join(rootFolder, 'api.json')
const srcFolder = join(rootFolder, 'src')

await $`pnpm --filter "@gladia/api" schema:generate -- ${apiFile}`
await $`pnpm openapi -i ${apiFile} -o ${srcFolder} -c fetch --name Gladia --useUnionTypes --useOptions`
await $`pnpm prettier --write ${srcFolder}`
await $`pnpm tsup ${join(srcFolder, 'index.ts')} --format cjs,esm --dts --clean`
