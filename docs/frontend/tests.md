# Build, lint y tests del frontend

Desde `frontend/`:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Vite con HTTPS (mkcert, `certs/`) en `https://localhost:5173`; `/api` va por el proxy al contenedor `app`. |
| `npm run build` | Compila a `../backend/public/assets` y mueve `index.html` a `backend/resources/views/app.blade.php`. oxlint corre dentro: un error de lint rompe el build. |
| `npm run lint` | oxlint (`.oxlintrc.json`). |
| `npm test` | `vitest run` (una pasada); `npm run test:watch` en modo watch. |
| `npx vitest run <ruta>` / `-t "<nombre>"` | Un archivo / un test. |

## Vitest + Testing Library

- jsdom, `globals: true`, `setupFiles: src/setupTests.js` (jest-dom, `scrollTo` falso, guardia de red, `cleanup`). `testTimeout` 15 s por los chunks lazy.
- `@testing-library/react` + `@testing-library/user-event` (`const user = userEvent.setup()`).
- Tests **junto a su archivo** (`FormLogin.test.jsx`), títulos en español con `test()`.
- Consultas por rol y nombre accesible (`getByRole("button", { name: "Guardar" })`), no por clases ni `data-testid` salvo que no haya alternativa.

## Red: `mockFetch` / `mockRoutes` y la guardia

- `test/fetchGuard.js`: un `fetch` sin simular **hace fallar el test** (con método y URL). Se arregla simulando la ruta, nunca desactivando la guardia.
- `test/mockFetch.js`: `mockRoutes({ "POST /auth/login": ({ body, headers }) => ({ status, body }) })`, con segmentos `{id}`; las llamadas quedan registradas para comprobar el cuerpo enviado.
- Fixtures por dominio: `test/authBackend.js` (`serveAuth()`, `signIn()`, `resetAuth()` para `afterEach`). `signIn({ apiKey, token_can, remember, permissions, roles, is_owner })` y `sessionPayload({ token_can, apiKey, permissions, roles, is_owner })` aceptan el mapa de permisos (`{ "usuarios.usuario.show": true }`), roles e `is_owner`; sin ellos, sesión sin permisos. Cada módulo trae el suyo en `modules/<m>/test/<m>Backend.js` (`serveAcademico()`, datos `API_SECCIONES`...), con la **forma real** de las respuestas del backend (`{status, msg, data}`).
- Nada de mocks de RTK Query ni de "mock db": se prueba contra respuestas HTTP simuladas.

## Rutas

`test/renderRoute.jsx` monta el árbol real (`routes`) en un `createMemoryRouter` con los proveedores de la app:

```js
test("sin permiso, /gedure/usuarios lleva a no-perm", async () => {
  serveAuth();
  signIn({ permissions: {} }); // o { permissions: { "x.y.z": true } } / { is_owner: true }
  const { router } = renderRoute("/gedure/usuarios");
  await screen.findByRole("heading", { name: /no tienes permiso/i }, { timeout: 8000 });
  expect(router.state.location.pathname).toBe("/gedure/no-perm");
});
```

Componentes que usan `useNavigation` o loaders necesitan router de datos (`createMemoryRouter`), no `MemoryRouter`.

## Qué probar en un módulo

1. Reglas puras (`rules.js`, cálculos) en tests unitarios.
2. Cada pantalla: carga → datos, vacío, error con "Reintentar".
3. Cada mutation: cuerpo enviado, aviso con `msg`, 422 al campo, 403/422 de dominio deshace el optimista.
4. Permisos: lo que se oculta o deshabilita sin el permiso.
5. `apps/registry.test.js`: coherencia registro ↔ rutas.

## CI

Hoy no hay workflow de tests (solo la imagen al etiquetar). Propuesta de la fase 0: en cada PR a `next`, `npm ci`, `npx vitest run` y `npm run build`.
