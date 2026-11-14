/**
 * Adapta un `import()` de página al formato que espera `route.lazy`, que
 * devuelve `{ Component }` y no un element.
 *
 * A diferencia de React.lazy, el router resuelve estos módulos durante la
 * fase de matching (antes de renderizar), así que no hace falta Suspense: la
 * pantalla actual se queda mientras baja el chunk (ver NavigationProgress).
 */
export default function lazyPage(factory) {
  return () => factory().then((mod) => ({ Component: mod.default }));
}
