import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { describe, expect, test } from "vitest";

import { mockViewport } from "../../test/mockViewport";
import ResponsiveDialog from "./ResponsiveDialog";

const pintar = (ui) => render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);
const dialogo = () => screen.getByRole("dialog");

describe("ResponsiveDialog", () => {
  test("en móvil es hoja inferior (clase de hoja, sin pantalla completa)", () => {
    mockViewport("mobile");
    pintar(<ResponsiveDialog open isDesktop={false} aria-label="x">hola</ResponsiveDialog>);
    expect(dialogo().className).toContain("gd-dialog-sheet");
    expect(dialogo().className).not.toContain("MuiDialog-paperFullScreen");
  });

  test("en móvil con fullScreen sube a pantalla completa", () => {
    mockViewport("mobile");
    pintar(<ResponsiveDialog open isDesktop={false} variant="fullScreen" aria-label="x">hola</ResponsiveDialog>);
    expect(dialogo().className).toContain("MuiDialog-paperFullScreen");
    expect(dialogo().className).not.toContain("gd-dialog-sheet");
  });

  test("en escritorio es el diálogo normal", () => {
    mockViewport("desktop");
    pintar(<ResponsiveDialog open isDesktop aria-label="x">hola</ResponsiveDialog>);
    expect(dialogo().className).not.toContain("gd-dialog-sheet");
    expect(dialogo().className).not.toContain("MuiDialog-paperFullScreen");
  });

  // Slide pone su `transition` en el contenedor del papel: con el movimiento
  // reducido del sistema dura 0 ms.
  test.each([
    [false, "transform 225ms"],
    [true, "transform 0ms"],
  ])("con reduceMotion=%s la hoja entra con %s", (reduceMotion, transition) => {
    mockViewport("mobile", { reduceMotion });
    pintar(<ResponsiveDialog open isDesktop={false} aria-label="x">hola</ResponsiveDialog>);
    expect(dialogo().parentElement.style.transition).toContain(transition);
  });
});
