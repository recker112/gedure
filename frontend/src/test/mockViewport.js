/**
 * jsdom no implementa `matchMedia`: simula un viewport de escritorio (desde
 * `md`, 900px) o de móvil para `useMediaQuery`. Solo entiende `min-width` y,
 * con `{ reduceMotion: true }`, `prefers-reduced-motion: reduce`.
 * Devuelve `setViewport(kind)`, que cambia el ancho y avisa a las listas de
 * medios registradas (como al redimensionar).
 */
export function mockViewport(kind, { reduceMotion = false } = {}) {
  const widthOf = (k) => (k === "desktop" ? 1200 : 400);
  let width = widthOf(kind);
  const lists = new Set();

  const evaluate = (query) => {
    if (query.includes("prefers-reduced-motion")) return reduceMotion;
    const min = /min-width:\s*(\d+(?:\.\d+)?)px/.exec(query);
    return min ? width >= Number(min[1]) : false;
  };

  window.matchMedia = (query) => {
    const listeners = new Set();
    const list = {
      get matches() {
        return evaluate(query);
      },
      media: query,
      addEventListener: (_type, fn) => listeners.add(fn),
      removeEventListener: (_type, fn) => listeners.delete(fn),
      addListener: (fn) => listeners.add(fn),
      removeListener: (fn) => listeners.delete(fn),
      _emit: () => listeners.forEach((fn) => fn({ matches: evaluate(query), media: query })),
    };
    lists.add(list);
    return list;
  };

  return {
    setViewport(next) {
      width = widthOf(next);
      lists.forEach((list) => list._emit());
    },
  };
}
