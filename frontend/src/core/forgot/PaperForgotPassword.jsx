/**
 * Components
 */
import HeaderLogin from "../login/HeaderLogin";
import FormForgotPassword from "./FormForgotPassword";

export default function PaperForgotPassword({ onSent }) {
  return (
    <>
      <HeaderLogin
        primaryText="Recuperar contraseña"
        secondaryText="Escribe tu usuario, cédula o correo y te enviaremos un código de seguridad al correo de la cuenta."
      />
      <FormForgotPassword onSent={onSent} />
    </>
  );
}
