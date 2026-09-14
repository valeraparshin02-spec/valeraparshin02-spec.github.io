import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const vite = resolve('node_modules/vite/bin/vite.js')
execFileSync(process.execPath, [vite, 'build', '--config', 'vite.github.config.js', '--outDir', 'dist-github'], { stdio: 'inherit' })
execFileSync(process.execPath, [vite, 'build', '--config', 'vite.github.config.js', '--ssr', 'src/entry-prerender.jsx', '--outDir', '.qa/prerender'], { stdio: 'inherit' })
const { render } = await import(pathToFileURL(resolve('.qa/prerender/entry-prerender.js')).href)
const htmlFile = resolve('dist-github/index.html')
const html = readFileSync(htmlFile, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('Expected empty root for prerendering')
const markup = render()
if (!markup.includes('Из интереса') || !markup.includes('new.alteraestate.ru')) throw new Error('Incomplete portfolio markup')
writeFileSync(htmlFile, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`))
console.log('Static portfolio rendered: content is available before JavaScript loads.')
