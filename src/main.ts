import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

async function main (): Promise<void> {
  const [folderName] = process.argv.slice(2)

  const folderPath = join(__dirname, folderName)
  const mainFile = join(folderPath, `${folderName}.ts`)
  const testFile = join(folderPath, `${folderName}.test.ts`)

  await mkdir(folderPath)
  await writeFile(mainFile, '')
  await writeFile(testFile, '')
}

main()
  .then(() => { console.log('Successfully terminated!') })
  .catch(err => { console.error(err) })
