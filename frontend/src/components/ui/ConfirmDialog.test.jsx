import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { describe, expect, test, vi } from "vitest";

import { mockViewport } from "../../test/mockViewport";
import ConfirmDialog from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  test("muestra título y texto, y llama a onConfirm / onClose", () => {
    mockViewport("desktop");
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    render(
      <ThemeProvider theme={createTheme()}>
        <ConfirmDialog open title="¿Eliminar?" text="No se deshace." confirmLabel="Eliminar" onConfirm={onConfirm} onClose={onClose} />
      </ThemeProvider>,
    );
    expect(screen.getByRole("dialog", { name: "¿Eliminar?" })).toBeInTheDocument();
    expect(screen.getByText("No se deshace.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
