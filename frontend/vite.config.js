import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// El build se escribe DENTRO del backend: Laravel sirve los assets desde
// backend/public y el index.html compilado se instala como la vista Blade
// `app` (backend/resources/views/app.blade.php).
const publicDir = fileURLToPath(new URL('../backend/public', import.meta.url))
const viewsDir = fileURLToPath(new URL('../backend/resources/views', import.meta.url))

// emptyOutDir queda en false A PROPÓSITO: backend/public contiene archivos del
// esqueleto de Laravel versionados (index.php, .htaccess, robots.txt,
// favicon.ico) y el symlink storage; vaciarlo en un `npm run build` local los
// destruiría. Este plugin limpia solo lo que genera el propio build.
const laravelOutput = () => ({
  name: 'laravel-output',
  apply: 'build',
  buildStart() {
    rmSync(`${publicDir}/assets`, { recursive: true, force: true })
    rmSync(`${publicDir}/index.html`, { force: true })
  },
  // Síncrono (renameSync): a diferencia de un `exec('mv ...')` sin await no hay
  // condición de carrera con el fin del proceso de `vite build`.
  closeBundle() {
    const html = `${publicDir}/index.html`
    if (!existsSync(html)) return
    mkdirSync(viewsDir, { recursive: true })
    renameSync(html, `${viewsDir}/app.blade.php`)
  },
})

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    outDir: '../backend/public',
    emptyOutDir: false,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    laravelOutput(),
    // HTTPS del dev server con un certificado local de mkcert (se guarda en
    // frontend/certs, ignorado por git y por Docker; incluye la clave de la CA).
    // Solo `vite`/`vite dev`: vitest también usa command 'serve', por eso se
    // excluye con process.env.VITEST; `vite build` queda fuera por command.
    command === 'serve' && !process.env.VITEST && mkcert({ savePath: './certs' }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    css: false,
  },
}))
