# Estado y API (Redux Toolkit + RTK Query)

## Store (`src/store.js`)

| Clave | Tipo | Contenido |
|---|---|---|
| `userConfig` | slice | Preferencias (tema `light`/`dark`, variante). `localStorage`. |
| `auth` | slice | `auth`, `apiKey`, `token_can`, `user`, `permissions` (mapa), `roles`; fase 0 añade `isOwner`. |
| `baseApi` | RTK Query | **Una sola API** (`createApi` en `store/services/baseApi.js`, `reducerPath: "baseApi"`) con todos los `tagTypes`. Un único reducer y middleware. |

Un `listenerMiddleware` escucha `logoutApp` y hace `baseApi.util.resetApiState()`: al ser una sola API, **todo** su caché se descarta al cerrar sesión (incluidos los endpoints públicos, que simplemente se vuelven a pedir).

```js
// store.js (objetivo)
// reducer: { ..., [baseApi.reducerPath]: baseApi.reducer }
// middleware: .concat(baseApi.middleware)
```

El store se exporta como módulo para usarlo fuera de React (loaders).

### Slices

- Solo **estado global de verdad** (sesión, preferencias, presencia). El estado de una pantalla va en la pantalla; los datos del servidor, en RTK Query (nunca copiados a un slice).
- `logoutApp` devuelve el estado inicial con `apiKey: null` explícito (el inicial se leyó del storage al importar).
- Deuda conocida (también en BluLabel): `configReducer`/`authReducer` escriben en el storage dentro del reducer; lo idiomático sería el `listenerMiddleware`.

## `baseQuery` y errores (`store/services/ReduxDefault.js`)

- `baseUrl` relativa `/api/v1` (en jsdom se antepone el origen), `accept: application/json` y `Authorization: Bearer <apiKey>`.
- `handleQueryError(err, dispatch, setError?)`: sin conexión → aviso "offline"; 422 con `errors` y `setError` → cada mensaje a su campo (los de lista, `roles.0`, al campo de la lista) y aviso con `msg`; resto → `notifyHttpStatus` con `msg` (o `message` salvo en 404/405/500).
- `notifyHttpStatus`: **401 hace logout** (siempre); 403 avisa con `msg`; 429 solo avisa.
- `handleScreenQueryError`: para lo que carga una pantalla (no avisa de errores de conexión: la pantalla ya lo muestra).

## Patrón de una API de módulo

`store/services/baseApi.js` define la única `createApi` (con `baseQuery` de `ReduxDefault.js`, hoy solo `baseQuery` y los manejadores de errores) y **todos** los `tagTypes`. Cada módulo añade sus endpoints con `baseApi.injectEndpoints` en `modules/<modulo>/<modulo>Api.js`; un archivo por endpoint, como en `store/services/auth/`:

```js
// store/services/baseApi.js
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Periodo", "Lapso", "Seccion", "Pagos", "EstadoCuenta" /* ... */],
  endpoints: () => ({}),
});

// modules/academico/academicoApi.js
export const academicoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSecciones: getSecciones(builder),
    cerrarLapso: cerrarLapso(builder),
  }),
});
export const { useGetSeccionesQuery, useCerrarLapsoMutation } = academicoApi;

// modules/academico/api/queries/getSecciones.js
export const getSecciones = (builder) =>
  builder.query({
    query: ({ periodoId }) => `/academico/secciones?periodo_id=${periodoId}`,
    transformResponse: (res) => res.data,          // derivados costosos aquí, no en render
    providesTags: (result = []) => [...result.map(({ id }) => ({ type: "Seccion", id })), { type: "Seccion", id: "LIST" }],
  });

// modules/academico/api/mutations/cerrarLapso.js
export const cerrarLapso = (builder) =>
  builder.mutation({
    query: ({ id }) => ({ url: `/academico/lapsos/${id}/cerrar`, method: "POST" }),
    invalidatesTags: (_r, _e, { id }) => [{ type: "Lapso", id }],
    onQueryStarted: async ({ setError }, { queryFulfilled, dispatch }) => {
      try {
        const { data } = await queryFulfilled;
        notify.success(data.msg);
      } catch (err) {
        handleQueryError(err, dispatch, setError);
      }
    },
  });
```

**Migración:** `authApi` (hoy un `createApi` propio en `store/services/auth/AuthApi.js`, con `sessionScopedApis` en `store.js`) pasa a `baseApi.injectEndpoints`; se retira `sessionScopedApis`.

Reglas:

- **Los componentes solo usan hooks de RTK Query**; nada de `fetch` directo.
- Efectos (avisos, actualizar `auth`, invalidación cruzada) en `onQueryStarted`; errores siempre a `handleQueryError`.
- Cada componente llama a **sus** mutations (el botón "Cerrar lapso" usa `useCerrarLapsoMutation`); la página no reparte handlers por props. Las vistas puras reciben `readOnly`/`disabled`.
- Optimistas solo donde el usuario lo note (toggles, marcar leído): `updateQueryData` + `undo()` en el `catch`.
- **Invalidación entre módulos:** al compartir `baseApi`, los tags son comunes: basta que un endpoint de otro módulo los declare en `providesTags`/`invalidatesTags`. Ejemplo: `reportarPago` (módulo `pagos`) invalida `['Pagos', 'EstadoCuenta']` y se refrescan las pantallas de `finanzas` que los proveen. Nada de despachar `util.invalidateTags` a mano.
- Listas largas: `build.infiniteQuery` por cursor (como las notificaciones de BluLabel) o paginación en servidor; listas cortas (secciones de un año) se piden enteras y se filtran en el cliente.

## Persistencia

`components/utils/storage.js` (prefijo `gd.`): `readStorage`/`writeStorage(key, value, remember)` (sessionStorage siempre, localStorage si `remember`), `readLocal`/`writeLocal` para preferencias. El token sin "recordar" vive solo en `sessionStorage`.
