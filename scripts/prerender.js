// Inlines the server-rendered app into dist/index.html, then removes the
// throwaway SSR bundle. Runs after both `vite build` passes.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const htmlPath = `${root}dist/index.html`
const ssrDir = `${root}dist-ssr`

const { render } = await import(`${ssrDir}/entry-server.js`)
const html = await readFile(htmlPath, 'utf8')

const placeholder = '<div id="root"></div>'
if (!html.includes(placeholder)) throw new Error(`${placeholder} not found in dist/index.html`)

await writeFile(htmlPath, html.replace(placeholder, `<div id="root">${render()}</div>`))
await rm(ssrDir, { recursive: true, force: true })
console.log('Prerendered dist/index.html')
