import { useEffect } from "react";

import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import { resetNotistack } from "../store/slices/notistack";
import { logoutApp } from "../store/slices/auth";

export default function useNotifier({
  messageTo200 = true,
  message200 = false,
  messageTo400 = true,
  message400 = false,
  messageTo404 = true,
  message404 = 'Ruta URL no encontrada',
  messageTo422 = true,
  message422 = 'Error al verificar los datos',
} = {}) {
  const { enqueueSnackbar } = useSnackbar();

  const { notiText, notiStatus } = useSelector((state) => state.notistack);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notiStatus === 200 || notiStatus === 201) {
      messageTo200 &&
        enqueueSnackbar(message200 ? message200 : notiText, {
          variant: "success",
        });
    } else if (notiStatus === 400) {
      messageTo400 &&
        enqueueSnackbar(message400 ? message400 : notiText, {
          variant: "warning",
        });
    }else if (notiStatus === 401) {
      enqueueSnackbar("Sesión expirada", {
        variant: "info",
      });

      dispatch(logoutApp());
    } else if (notiStatus === 403) {
      enqueueSnackbar("No tienes permisos para esta acción", {
        variant: "error",
      });
    } else if (notiStatus === 404) {
      messageTo404 &&
        enqueueSnackbar(message404, {
          variant: "warning",
        });
    } else if (notiStatus === 422) {
      messageTo422 &&
        enqueueSnackbar(message422, {
          variant: "error",
        });
    }else if (notiStatus === 429) {
      enqueueSnackbar("Demasiadas peticiones", {
        variant: "info",
      });

      dispatch(logoutApp());
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
    message200,
    messageTo400,
    message400,
    messageTo404,
    message404,
    messageTo422,
    message422,
  ]);
}
