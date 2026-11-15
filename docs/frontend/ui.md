# UI: tema, carcasa del panel y formularios

La identidad visual es **propia de Gedure / La Candelaria**. De BluLabel se toma la mecánica (tema en Redux, paletas como datos, envoltorios de formulario), nunca su aspecto.

## Tema MUI

- Estado en Redux: `userConfig.theme` (`light`/`dark`) y la variante; se leen con `useThemeSelection()`.
- `hooks/theme/useThemeConfig.js` → `createAppTheme(variant, mode)`: paleta del tema + tipografía (títulos en **Lora**, cuerpo en la fuente del sistema), `shape.borderRadius: 12`, botones redondeados sin mayúsculas, `MuiCard` `outlined`. Memoizado a propósito (identidad estable del tema). Sincroniza el modo entre pestañas con el evento `storage`.
- Paletas en `themes/` como **datos puros** (sin imports de MUI ni del navegador, imports con `.js`), porque las importa `vite.config.js` para el fondo inicial de `index.html` (sin destello en modo oscuro). Hoy un solo tema, `Candelaria` (azul institucional + dorado de acento), con `light` y `dark` completos; `themes.test.js` exige `main`, `dark`, `light` y `contrastText` en `primary`/`secondary`.
- Colores siempre por **clave de paleta** (`"primary.main"`, `"background.appbar"`), nunca hex en componentes.
- Cambiar de modo: `ThemeToggle` (`components/menu/`).

## Carcasa del panel (fase 0)

`core/panel/PanelLayout.jsx`, ruta layout bajo `AuthLayout`:

- **AppBar**: logo (`GedureLogo`), nombre del colegio o del módulo actual, `ThemeToggle`, menú de cuenta (nombre, "Mi cuenta", "Ver sitio web" → `/?sitio=1`, "Cerrar sesión" → `/auth/logout`).
- **Menú lateral** construido desde `modules/registry.js`, filtrado con `useCanAccess` (fijo en escritorio, cajón en móvil). Cada módulo es un grupo con sus entradas (`menu` del `config.js`).
- **`<main>`** con el `<Outlet />`: las pantallas de los módulos no abren otro `<main>`.
- Un único breakpoint compartido (`useIsDesktop()`), sin pasar props de layout a las pantallas.
- `PageHeader` (ya existe en `components/ui/`) para el título y la acción principal de cada pantalla.

## Estados de una pantalla

Toda pantalla con datos contempla: **cargando** (esqueleto con la forma final, no un spinner a pantalla completa), **error** (mensaje y "Reintentar" → `refetch`), **vacío** (texto que explica qué hacer) y **sin permiso** (oculto o deshabilitado con motivo).

## Formularios (`components/form/`)

- Envoltorios de react-hook-form con `useFormContext`, dentro de un `FormProvider`: `InputHook`, `InputPasswordHook`, `OTPHook`, checkbox.
- Reglas en `components/form/rules.js` (genéricas) o en el módulo (`modules/<m>/rules.js`), **iguales a las del backend** (p. ej. nota 1–20, literal A–E, cédula).
- Los 422 del backend se pegan al campo con `setError` vía `handleQueryError(err, dispatch, setError)`.
- Solo filtros, búsquedas y toggles de vista llevan estado a mano.
- Componentes nuevos previsibles: selector de lapso/sección, tabla de carga de notas (teclado primero: Tab/Enter avanzan de fila), subida de archivos (importación, estados de cuenta).

## Avisos

`notify.success/error/warning/info` (`components/notify/notify.jsx`), llamable fuera de React. El texto es el `msg` del backend.

## Accesibilidad y textos

- Textos en español, tuteo, frases cortas ("Lapso cerrado", "No tienes permiso para…").
- `SkipLink` y landmarks (`nav`, `main`, `contentinfo`) ya existen en la web pública; el panel los mantiene.
- Iconos con `aria-label` cuando no hay texto; tablas con encabezados reales.
- Animaciones en CSS (`scss/main.scss`) y desactivadas con `prefers-reduced-motion`.
