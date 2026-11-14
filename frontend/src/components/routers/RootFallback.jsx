/**
 * Components
 */
import Fallback from "./Fallback";

/** Carga inicial: mientras bajan los chunks de la primera pantalla. */
export default function RootFallback() {
  return <Fallback loading />;
}
