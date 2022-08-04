import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../notistack";


export const relogin = createAsyncThunk(
  'auth/relogin',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/auth/relogin';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal,
        headers: {
          Authorization: `Bearer ${data}`
        }
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));
      res.data.access_key = data;

      // NOTA(RECKER): Global token
      axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        // NOTA(RECKER): Respuesta del servidor
        const { data, status } = error.response;
        dispatch(updateNotistack({ status: status, text: data.msg }));
      } else {
        // NOTA(RECKER): Sin respuesta por parte del servidor
        dispatch(updateNotistack({ status: 'offline', }));
      }
      throw error;
    }
  }
);
