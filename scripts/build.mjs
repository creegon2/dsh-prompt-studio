// Build the published artifacts (index.mjs, client.js) with esbuild.
//
// Every `@deepseek-ai/*` import stays a bare specifier: the running dsh provides those packages to
// plugins (they are declared as peerDependencies), so the output carries no machine-specific paths
// and works against whichever dsh install loads it. React is provided by the web client.
import { build } from 'esbuild'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const scratch = join(root, '.build')
await rm(scratch, { recursive: true, force: true })
await mkdir(scratch, { recursive: true })

await build({
  absWorkingDir: root, entryPoints: ['src/index.ts'], outfile: 'index.mjs',
  bundle: true, platform: 'node', format: 'esm', target: 'node22',
  tsconfigRaw: {}, legalComments: 'none',
  external: ['@deepseek-ai/*'],
})

await build({
  absWorkingDir: root, entryPoints: ['src/client/index.ts'], outfile: join(scratch, 'client.cjs'),
  bundle: true, platform: 'browser', format: 'cjs', target: 'es2022', jsx: 'automatic',
  tsconfigRaw: {}, legalComments: 'none',
  external: ['react', 'react/jsx-runtime', '@deepseek-ai/*'],
})
const js = await readFile(join(scratch, 'client.cjs'), 'utf8')
const css = await readFile(join(scratch, 'client.css'), 'utf8')
// The web client loads plugin UIs through __ModuleLoader__; the factory receives the injected `require`.
await writeFile(join(root, 'client.js'), `window.__ModuleLoader__.load({id:'dsh-prompt-studio',factory:(require)=>{\n`
  + `var module={exports:{}};var exports=module.exports;\n`
  + `const styleKey='dsh-prompt-studio';document.querySelector('style[data-plugin-css="'+styleKey+'"]')?.remove();`
  + `const style=document.createElement('style');style.dataset.pluginCss=styleKey;style.textContent=${JSON.stringify(css)};document.head.appendChild(style);\n`
  + `${js}\nreturn module.exports;\n}});\n`)
await rm(scratch, { recursive: true, force: true })
console.log('Built index.mjs and client.js')
