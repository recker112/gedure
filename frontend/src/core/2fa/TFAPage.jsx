/**
 * Components
 */
import PaperTFA from "./PaperTFA";
import useTitleHook from "../../hooks/utils/useTitleHook";

export default function TFAPage() {
  useTitleHook("Verificación en dos pasos");

  return <PaperTFA />;
}
