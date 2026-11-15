/**
 * React
 */
import { forwardRef } from "react";

/**
 * MUI
 */
import { Dialog, Slide } from "@mui/material";

/**
 * Components
 */
import { bottomSheetPaperSx } from "../menu/bottomSheet";
import { useIsDesktop } from "../../hooks/theme/useIsDesktop";
import { usePrefersReducedMotion } from "../../hooks/theme/usePrefersReducedMotion";

/**
 * Transición de entrada desde abajo. Fuera del render y con forwardRef para
 * que MUI reciba siempre el mismo componente (identidad semántica: si cambiara
 * en cada render, el diálogo se remontaría y reiniciaría la animación).
 */
const SlideUp = forwardRef(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * `Dialog` que en móvil entra deslizándose desde abajo; en escritorio es el
 * `Dialog` normal (Fade). `variant` solo cuenta en móvil:
 * - "sheet" (por defecto): hoja inferior anclada abajo, esquinas superiores
 *   redondeadas, alto máximo 90dvh y safe area inferior. Para diálogos cortos
 *   (confirmaciones).
 * - "fullScreen": pantalla completa que sube desde abajo. Para diálogos largos
 *   o con formulario (invitar, ficha de usuario).
 * `isDesktop` es opcional: por defecto sale de `useIsDesktop()` (sirve para forzar el modo).
 * MUI no respeta `prefers-reduced-motion` en Slide, así que con el movimiento
 * reducido (`usePrefersReducedMotion`) la
 * transición dura 0.
 */
export default function ResponsiveDialog({ isDesktop: isDesktopProp, variant = "sheet", slotProps, slots, sx, ...props }) {
  const detected = useIsDesktop();
  const isDesktop = isDesktopProp ?? detected;
  const reduceMotion = usePrefersReducedMotion();
  const transitionDuration = reduceMotion ? 0 : undefined;

  if (isDesktop) {
    return <Dialog transitionDuration={transitionDuration} slots={slots} slotProps={slotProps} sx={sx} {...props} />;
  }

  const sheet = variant === "sheet";
  const { paper, ...restSlotProps } = slotProps ?? {};
  const paperSx = sheet
    ? [
        bottomSheetPaperSx,
        { m: 0, width: "100%", maxWidth: "100%", maxHeight: "90dvh", pb: "env(safe-area-inset-bottom)" },
      ]
    : [];

  return (
    <Dialog
      {...props}
      fullScreen={!sheet}
      transitionDuration={transitionDuration}
      slots={{ ...slots, transition: SlideUp }}
      slotProps={{
        ...restSlotProps,
        paper: { ...paper, className: sheet ? `gd-dialog-sheet ${paper?.className ?? ""}`.trim() : paper?.className, sx: [...paperSx, ...(Array.isArray(paper?.sx) ? paper.sx : [paper?.sx])] },
      }}
      sx={[sheet && { "& .MuiDialog-container": { alignItems: "flex-end" } }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}
