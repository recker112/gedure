import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getNewsShow = createAsyncThunk(
  'requestStatus/news/show',
  async (slug, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { auth } = getState().auth;
    let url = '';

    if (auth) {
      url = `v1/posts/auth/${slug}`;
    }else {
      url = `v1/posts/${slug}`;
    }

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): Señal para cancelar petición
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

export const reducersNewsShow = {
  [getNewsShow.pending]: state => {
    state.newsShow.loading = true;
    state.newsShow.data = {};
  },
  [getNewsShow.rejected]: state => {
    state.newsShow.loading = false;
    state.newsShow.data = {};
  },
  [getNewsShow.fulfilled]: (state, action) => {
    const data = action.payload;

    state.newsShow.loading = false;
    state.newsShow.data = data;
  },
}