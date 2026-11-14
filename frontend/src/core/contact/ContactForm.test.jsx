import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm, { MAX_MESSAGE } from "./ContactForm";

describe("ContactForm", () => {
  test("cuenta los caracteres del mensaje", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByRole("textbox", { name: /Mensaje/ }), "Hola mundo");
    expect(screen.getByText(`10/${MAX_MESSAGE} caracteres`)).toBeInTheDocument();
  });

  test("al enviar un formulario válido avisa de que el envío aún no existe", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByRole("textbox", { name: /Nombre y apellido/ }), "Ana Pérez");
    await user.type(screen.getByRole("textbox", { name: /Correo electrónico/ }), "ana@example.com");
    await user.type(screen.getByRole("textbox", { name: /Asunto/ }), "Inscripciones");
    await user.type(screen.getByRole("textbox", { name: /Mensaje/ }), "Quisiera información sobre cupos.");
    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(await screen.findByRole("status")).toHaveTextContent(/próximamente/);
  });
});
