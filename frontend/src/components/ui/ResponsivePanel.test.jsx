import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { describe, expect, test, vi } from "vitest";

import { mockViewport } from "../../test/mockViewport";
import ResponsivePanel from "./ResponsivePanel";

const pintar = (props) =>
  render(
    <ThemeProvider theme={createTheme()}>
      <ResponsivePanel labelledBy="t" {...props}>
        <h2 id="t">Ficha</h2>
      </ResponsivePanel>
    </ThemeProvider>,
  );

describe("ResponsivePanel", () => {
  test.each(["desktop", "mobile"])("en %s muestra un diálogo con nombre accesible", (kind) => {
    mockViewport(kind);
    pintar({ open: true, onClose: () => {} });
    expect(screen.getByRole("dialog", { name: "Ficha" })).toBeInTheDocument();
  });

  test.each(["desktop", "mobile"])("en %s no pinta nada si está cerrado", (kind) => {
    mockViewport(kind);
    pintar({ open: false, onClose: () => {} });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test.each(["desktop", "mobile"])("en %s Escape llama a onClose", (kind) => {
    mockViewport(kind);
    const onClose = vi.fn();
    pintar({ open: true, onClose });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
