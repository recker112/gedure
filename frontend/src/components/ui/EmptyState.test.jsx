import { fireEvent, render, screen } from "@testing-library/react";
import InboxIcon from "@mui/icons-material/Inbox";
import { describe, expect, test, vi } from "vitest";

import EmptyState from "./EmptyState";
import LoadError from "./LoadError";

describe("EmptyState", () => {
  test("es un status con título, texto y acción", () => {
    render(<EmptyState icon={InboxIcon} title="Nada aún" text="Explicación" action={<button>Crear</button>} />);
    expect(screen.getByRole("status")).toHaveTextContent("Nada aún");
    expect(screen.getByText("Explicación")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument();
  });
});

describe("LoadError", () => {
  test("es un alert y Reintentar llama a onRetry", () => {
    const onRetry = vi.fn();
    render(<LoadError onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toHaveTextContent("No se pudo cargar");
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test("sin onRetry no hay botón", () => {
    render(<LoadError />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
