/**
 * React
 */
import { useEffect, useState } from "react";

/**
 * MUI
 */
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

/**
 * Enlace "Reenviar código" con cuenta atrás (30 s por defecto, algo más que
 * el enfriamiento de 25 s del servidor). `resendCode` puede devolver el
 * resultado de la mutación: si es un 429 con `retry_after`, la espera pasa a
 * ser la que dice el servidor.
 */
export default function ResendCode({ resendCode, secondsDefault = 30, disabled = false }) {
  const [seconds, setSeconds] = useState(secondsDefault);
  const [sending, setSending] = useState(false);

  // Cuenta atrás de un segundo en un segundo; se detiene sola al llegar a 0.
  useEffect(() => {
    if (seconds <= 0) return;

    const timeout = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [seconds]);

  const canResend = seconds <= 0 && !sending && !disabled;

  const handleClick = async () => {
    setSending(true);
    setSeconds(secondsDefault);
    try {
      const result = await resendCode?.();
      const retryAfter = Number(result?.error?.data?.retry_after);
      if (result?.error?.status === 429 && retryAfter > 0) setSeconds(Math.ceil(retryAfter));
    } finally {
      setSending(false);
    }
  };

  if (seconds > 0) {
    return (
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
        Podrás pedir otro código en {seconds} s
      </Typography>
    );
  }

  return (
    <Link
      component="button"
      type="button"
      variant="body2"
      onClick={handleClick}
      disabled={!canResend}
      sx={{ alignSelf: "center" }}
    >
      Reenviar código
    </Link>
  );
}
