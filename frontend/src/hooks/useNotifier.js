import { useEffect } from "react";

import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import { resetNotistack } from "../store/slices/notistack";

export default function useNotifier({
  messageTo200 = true,
  messageTo404 = true,
  messageTo422 = true,
} = {}) {
  const { enqueueSnackbar } = useSnackbar();

  const { notiText, notiStatus } = useSelector((state) => state.notistack);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notiStatus === 200) {
      messageTo200 &&
        enqueueSnackbar(notiText, {
          variant: "success",
        });
    } else if (notiStatus === 401) {
      enqueueSnackbar("Sesión expirada", {
        variant: "info",
      });

      //dispatch(logoutApp());
    } else if (notiStatus === 403) {
      enqueueSnackbar("No tienes permisos para esta acción", {
        variant: "error",
      });
    } else if (notiStatus === 404) {
      messageTo404 &&
        enqueueSnackbar("Ruta URL no encontrada", {
          variant: "warning",
        });
    } else if (notiStatus === 422) {
      messageTo422 &&
        enqueueSnackbar("Error al verificar los datos", {
          variant: "error",
        });
    } else if (notiStatus === 500) {
      enqueueSnackbar("No se ha podido conectar con la base de datos", {
        variant: "error",
      });
    } else if (notiStatus === "offline") {
      enqueueSnackbar("Imposible conectarse con el servidor", {
        variant: "error",
      });
    }

    return () => {
      dispatch(resetNotistack());
    };
  }, [
    notiText,
    notiStatus,
    dispatch,
    enqueueSnackbar,
    messageTo200,
    messageTo404,
    messageTo422,
  ]);
}
