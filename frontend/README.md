# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled through the native Rust integration of plugin-react (`react({ compiler: true })` in `vite.config.js`, backed by `oxc-transform-react`), without Babel. See [this documentation](https://react.dev/learn/react-compiler) for more information.

## Lint

`npm run lint` ejecuta Oxlint con `.oxlintrc.json`. Además, `vite-plugin-oxlint` lo integra en Vite: en `npm run dev` informa al arrancar y en cada HMR sin bloquear, y `npm run build` falla si hay errores de lint (los warnings no). No corre en `npm test`.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
