/**
 * Modules
 */
import { moduleUrl } from "../../apps/moduleUrl";

/**
 * Menú del panel a partir de las configs del registro, filtrado con la MISMA
 * regla que las rutas (`can` = useCanAccess()), así nunca se ve un enlace que
 * lleva a /gedure/no-perm. Función pura: se prueba con configs de ejemplo.
 *
 * - Un módulo sale si `can(módulo)` y le queda al menos una entrada visible
 *   (o no declara `menu`: entonces es un único enlace a `/gedure/<key>`).
 * - Una entrada sale si `can(entrada)`; un grupo, si le queda alguna hija.
 * - Un módulo `disabled` sale (si `can(módulo)`) sin entradas, como "Próximamente".
 *
 * Devuelve `[{ key, title, icon, url, disabled, entries: [{ title, icon, url, children? }] }]`.
 */
export function buildPanelMenu(configs, can) {
  return configs.flatMap((config) => {
    if (!can(config)) return [];

    const base = { key: config.key, title: config.title, icon: config.icon, url: moduleUrl(config.key) };
    if (config.disabled) return [{ ...base, disabled: true, entries: [] }];

    if (!config.menu) return [{ ...base, disabled: false, entries: [{ title: config.title, icon: config.icon, url: base.url }] }];

    const entries = visibleEntries(config.key, config.menu, can);
    return entries.length > 0 ? [{ ...base, disabled: false, entries }] : [];
  });
}

function visibleEntries(key, entries, can, parents = []) {
  return entries.flatMap((entry) => {
    if (!can(entry)) return [];

    if (entry.children) {
      const children = visibleEntries(key, entry.children, can, [...parents, entry]);
      return children.length > 0 ? [{ title: entry.title, icon: entry.icon, url: moduleUrl(key, entry, parents), children }] : [];
    }

    return [{ title: entry.title, icon: entry.icon, url: moduleUrl(key, entry, parents) }];
  });
}
