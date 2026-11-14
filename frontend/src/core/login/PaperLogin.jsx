/**
 * Components
 */
import HeaderLogin from "./HeaderLogin";
import FormLogin from "./FormLogin";
import useTitleHook from "../../hooks/utils/useTitleHook";

export default function PaperLogin() {
  useTitleHook("Entrar a Gedure");

  return (
    <div>
      <HeaderLogin
        primaryText="Entrar a Gedure"
        secondaryText="Plataforma de gestión escolar de La Candelaria."
      />
      <FormLogin />
    </div>
  );
}
