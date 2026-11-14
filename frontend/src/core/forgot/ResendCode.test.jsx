import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

import ResendCode from "./ResendCode";

describe("ResendCode", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  // La cuenta atrás encadena un setTimeout por render: se avanza segundo a segundo.
  const tick = async (ms) => {
    const steps = Math.max(1, Math.ceil(ms / 1000));
    for (let i = 0; i < steps; i++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(Math.min(ms, 1000));
      });
    }
  };

  test("espera 30 s antes de permitir el reenvío", async () => {
    const resend = vi.fn().mockResolvedValue({ data: { status: 200 } });
    render(<ResendCode resendCode={resend} />);

    expect(screen.getByText("Podrás pedir otro código en 30 s")).toBeInTheDocument();
    await tick(29000);
    expect(screen.getByText("Podrás pedir otro código en 1 s")).toBeInTheDocument();
    await tick(1000);

    fireEvent.click(screen.getByRole("button", { name: "Reenviar código" }));
    await tick(0);
    expect(resend).toHaveBeenCalledOnce();
    expect(screen.getByText("Podrás pedir otro código en 30 s")).toBeInTheDocument();
  });

  test("con 429 usa el retry_after del servidor", async () => {
    const resend = vi.fn().mockResolvedValue({ error: { status: 429, data: { status: 429, retry_after: 12 } } });
    render(<ResendCode resendCode={resend} secondsDefault={0} />);

    fireEvent.click(screen.getByRole("button", { name: "Reenviar código" }));
    await tick(0);

    expect(screen.getByText("Podrás pedir otro código en 12 s")).toBeInTheDocument();
  });
});
