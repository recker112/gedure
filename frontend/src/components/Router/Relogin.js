import { useEffect } from "react";

// Components
import Loader from "./Loader";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { relogin, updateRelogin } from "../../store/slices/auth";

export default function Relogin({ children }) {
  const loading = useSelector(state => state.auth.relogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = async () => {
      // AccessKey
      const keyL = JSON.parse(localStorage.getItem('gd-access_key'));
      const keyS = JSON.parse(sessionStorage.getItem('gd-access_key'));
      const key = keyL ? keyL : keyS;

      if (key) {
        await dispatch(relogin(key));
      }
      
      await dispatch(updateRelogin(false));
    };

    if (loading) {
      query();
    }
  }, [loading, dispatch]);

  // NOTA(RECKER): Esperar a que termine la query
  if (loading) {
    return <Loader />;
  }

  // NOTA(RECKER): Regresar ruta solicitada
  return children;
}
