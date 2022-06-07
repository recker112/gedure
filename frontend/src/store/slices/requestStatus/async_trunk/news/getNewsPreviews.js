import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getNewsPreviews = createAsyncThunk(
  'requestStatus/news/previews',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { auth } = getState().auth;
    const { search, data } = getState().requestStatus.newsPreview;
    const limit = 12;
    const offset = data.length;
    let url = '';

    if (auth) {
      url = `v1/posts/auth?offset=${offset}&limit=${limit}&search=${encodeURI(search)}`;
    }else {
      url = `v1/posts?offset=${offset}&limit=${limit}&search=${encodeURI(search)}`;
    }

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));

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