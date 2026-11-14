/**
 * React
 */
import { useState } from "react";

/**
 * Components
 */
import useTitleHook from "../../hooks/utils/useTitleHook";
import PaperForgotPassword from "./PaperForgotPassword";
import PaperResetPassword from "./PaperResetPassword";

/**
 * Recuperar contraseña en dos pasos, en la misma ruta: pedir el código con
 * el usuario, cédula o correo y, después, código + contraseña nueva.
 */
export default function PaperForgot() {
  useTitleHook("Recuperar contraseña");

  // { login, msg } del envío; mientras sea null se muestra el primer paso.
  const [sent, setSent] = useState(null);

  // El `key` remonta el paso para que empiece limpio (y con el foco arriba).
  return (
    <div key={sent ? "reset" : "forgot"}>
      {sent ? (
        <PaperResetPassword login={sent.login} msg={sent.msg} onBack={() => setSent(null)} />
      ) : (
        <PaperForgotPassword onSent={setSent} />
      )}
    </div>
  );
}
