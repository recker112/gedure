# UI: tema, carcasa del panel y formularios

La identidad visual es **propia de Gedure / La Candelaria**. De BluLabel se toma la mecánica (tema en Redux, paletas como datos, envoltorios de formulario), nunca su aspecto.

## Tema MUI

- Estado en Redux: `userConfig.theme` (`light`/`dark`) y la variante; se leen con `useThemeSelection()`.
- `hooks/theme/useThemeConfig.js` → `createAppTheme(variant, mode)`: paleta del tema + tipografía (**Nunito** en toda la web, cargada en `index.html` con pesos 400-800; la pila de respaldo es la del sistema; sin fuente aparte para títulos), `shape.borderRadius: 12`, botones redondeados sin mayúsculas, `MuiCard` `outlined`. Memoizado a propósito (identidad estable del tema). Sincroniza el modo entre pestañas con el evento `storage`.
- Paletas en `themes/` como **datos puros** (sin imports de MUI ni del navegador, imports con `.js`), porque las importa `vite.config.js` para el fondo inicial de `index.html` (sin destello en modo oscuro). Hoy un solo tema, `Candelaria` (azul institucional + dorado de acento), con `light` y `dark` completos; `themes.test.js` exige `main`, `dark`, `light` y `contrastText` en `primary`/`secondary`.
- Colores siempre por **clave de paleta** (`"primary.main"`, `"background.appbar"`), nunca hex en componentes.
- Cambiar de modo: `ThemeToggle` (`components/menu/`).

## Carcasa del panel (fase 0)

`components/ui/ContainerGedure.jsx` (equivalente al ContainerBluLabel de blulablel, con MUI `Container`), ruta layout bajo `AuthLayout`:

- **AppBar** (`PanelAppBar`): botón del menú, logo (`GedureLogo`), título del módulo actual (o "Gedure" en el inicio), `ThemeToggle` y menú de cuenta (`AccountMenu`: nombre, "Ver sitio web" → `/?sitio=1`, "Cerrar sesión" → `/auth/logout`). Aún no hay "Mi cuenta" (`core/account` es futuro).
- **Menú** (`PanelDrawer`): SIEMPRE un `Drawer` temporal, **cerrado por defecto en cualquier ancho** (no hay aside fijo en escritorio). Se abre con el botón del AppBar. Se construye desde `apps/registry.js` (`usePanelMenu`, `panelMenu.js`), filtrado con `useCanAccess`; cada módulo es un grupo con sus entradas (`menu` del `config.js`).
- **`<Container component="main" maxWidth="lg">`** con el `<Outlet />` (sin anchos en píxeles): las pantallas de los módulos no abren otro `<main>`.
- Sin breakpoints de layout ni props de layout hacia las pantallas: el menú es el mismo en todos los anchos.
- `PageHeader` (ya existe en `components/ui/`) para el título y la acción principal de cada pantalla.

## Estados de una pantalla

Toda pantalla con datos contempla: **cargando** (esqueleto con la forma final, no un spinner a pantalla completa), **error** (mensaje y "Reintentar" → `refetch`), **vacío** (texto que explica qué hacer) y **sin permiso** (oculto o deshabilitado con motivo).

## Componentes genéricos (`components/ui/`)

Portados de blulablel (misma API), sin estilos propios: usan el tema MUI. Dependen de `hooks/theme/useIsDesktop` (desde `md`), `hooks/theme/usePrefersReducedMotion` (preferencia del sistema; Slide de MUI no la respeta) y `components/menu/bottomSheet`.

- **`ResponsiveDialog`**: `Dialog` que en móvil sube desde abajo y en escritorio es el normal. Props: las de `Dialog` más `variant` (`"sheet"` por defecto: hoja inferior, máx. 90dvh, para diálogos cortos; `"fullScreen"`: pantalla completa, para formularios) e `isDesktop` (opcional, fuerza el modo). Con movimiento reducido la transición dura 0.
- **`ResponsivePanel`**: ficha o editor con formulario. Panel lateral derecho en escritorio (el listado sigue a la vista) y diálogo a pantalla completa en móvil. Props: `open`, `onClose`, `labelledBy` (id del título, nombre accesible), `width` (560). Usa `ResponsiveDialog` para elegir entre diálogo corto y panel: confirmaciones y avisos, diálogo; fichas y formularios largos, panel.
- **`ConfirmDialog`**: confirmar una acción difícil de deshacer (eliminar, cerrar lapso, descartar cambios). Props: `open`, `title`, `text`, `confirmLabel` ("Confirmar"), `color` ("primary"; `"error"` si destruye), `onConfirm`, `onClose`, `children`.
- **`EmptyState`**: lista o sección sin datos. Props: `icon`, `title`, `text`, `action`, `role` ("status"), `dense` (paneles estrechos).
- **`LoadError`**: una query falló sin datos que mostrar. Props: `title`, `text`, `onRetry` (normalmente `refetch`; sin él no hay botón), `dense`. Es un `role="alert"` sobre `EmptyState`.

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
