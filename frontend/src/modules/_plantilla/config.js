/**
 * PLANTILLA DE MÓDULO — NO REGISTRADA.
 *
 * Copia esta carpeta a `modules/<key>/` para empezar un módulo nuevo y sigue
 * docs/frontend/modulos.md ("Añadir un módulo"). Mientras nadie la importe
 * (apps/registry.js y apps/routes.js) no entra en el bundle ni en el menú.
 *
 * Este archivo son solo METADATOS: título, icono, protección y menú. Nunca
 * importes pantallas aquí: el layout del panel importa el registro, y el
 * registro importa este archivo.
 */

/**
 * MUI
 */
// Los iconos se pasan como componente (sin JSX: esto es un .js).
import WidgetsIcon from "@mui/icons-material/Widgets";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import BuildIcon from "@mui/icons-material/Build";

const plantilla = {
  // 1. Clave: segmento de URL (`/gedure/plantilla`) y clave en el registro.
  //    Minúsculas, sin barras, única. Es también el prefijo de sus permisos
  //    en el backend (`plantilla.recurso.accion`).
  key: "plantilla",

  // 2. Lo que se ve en el menú del panel.
  title: "Plantilla",
  icon: WidgetsIcon,
  // `disabled: true` lo muestra como "Próximamente" y sin rutas (no va en
  // apps/routes.js). Útil para anunciar una fase.
  // disabled: true,

  // 3. Protección de TODO el módulo (opcional). `permission`: string o array
  //    (basta uno); `allPermissions`: hacen falta todos. El owner pasa
  //    siempre. Sin ninguno, basta la sesión completa. Nunca arrays vacíos.
  //    No hay `<modulo>.access`: se usa el permiso de sus pantallas.
  permission: ["plantilla.elemento.show", "plantilla.ajuste.show"],

  // 4. Menú, en este orden. La URL la deriva moduleUrl(): no escribas `to`.
  //    Cada entrada con permiso propio: moduleRoute envuelve su ruta en otro
  //    AuthProtect y el menú la oculta a quien no lo tiene.
  menu: [
    // `/gedure/plantilla` (hija `index: true` de ./routes.js).
    { title: "Inicio", icon: HomeIcon, index: true, permission: "plantilla.elemento.show" },
    // `/gedure/plantilla/elementos`: `path` IGUAL al de su hija en ./routes.js.
    { title: "Elementos", icon: ListIcon, path: "elementos", permission: "plantilla.elemento.show" },
    // Grupo: `path` común + `children` (nunca `index` en el grupo). En
    // ./routes.js le corresponde una hija con ese `path` y sus `children`.
    {
      title: "Ajustes",
      icon: SettingsIcon,
      path: "ajustes",
      permission: "plantilla.ajuste.show",
      children: [
        // `/gedure/plantilla/ajustes`
        { title: "General", icon: TuneIcon, index: true },
        // `/gedure/plantilla/ajustes/avanzado`, con su propio guard.
        {
          title: "Avanzado",
          icon: BuildIcon,
          path: "avanzado",
          allPermissions: ["plantilla.ajuste.show", "plantilla.ajuste.update"],
        },
      ],
    },
  ],
};

export default plantilla;
