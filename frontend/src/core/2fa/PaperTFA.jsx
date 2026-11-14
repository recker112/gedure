/**
 * Redux
 */
import { useSelector } from "react-redux";

/**
 * Components
 */
import HeaderLogin from "../login/HeaderLogin";
import FormTFA from "./FormTFA";

export default function PaperTFA() {
  const email = useSelector((state) => state.auth.user?.email);

  return (
    <div>
      <HeaderLogin
        primaryText="Verificación en dos pasos"
        secondaryText={
          email
            ? `Hemos enviado un código de verificación de 6 caracteres a ${email}.`
            : "Hemos enviado un código de verificación de 6 caracteres a tu correo."
        }
      />
      <FormTFA />
    </div>
  );
}
