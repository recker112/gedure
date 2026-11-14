/**
 * MUI
 */
import Alert from "@mui/material/Alert";

/**
 * Components
 */
import HeaderLogin from "../login/HeaderLogin";
import FormChangePassword from "./FormChangePassword";

const NEUTRAL_MSG = "Si los datos corresponden a una cuenta, recibirás un código de seguridad en su correo";

export default function PaperResetPassword({ login, msg, onBack }) {
  return (
    <>
      <HeaderLogin
        primaryText="Restablecer contraseña"
        secondaryText="Escribe el código de seguridad y elige una contraseña nueva."
      />
      <Alert severity="info" role="status" sx={{ mt: 3 }}>
        {msg || NEUTRAL_MSG}.
      </Alert>
      <FormChangePassword login={login} onBack={onBack} />
    </>
  );
}
