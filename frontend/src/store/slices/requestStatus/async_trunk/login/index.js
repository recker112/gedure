import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateAuth, updateUserData } from "../../../auth";
import { updateNotistack } from "../../../notistack";

export const login = createAsyncThunk(
  'requestStatus/login',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/auth/login';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, data, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      // NOTA(RECKER): Guardar access_key
			if (data.checkbox) {
				localStorage.setItem('gd-access_key', JSON.stringify(res.data.access_key));
				sessionStorage.setItem('gd-access_key', JSON.stringify(res.data.access_key));
			} else {
				sessionStorage.setItem('gd-access_key', JSON.stringify(res.data.access_key));
			}

      // NOTA(RECKER): Guardar datos de usuario
      const { user, permissions, access_key, count_notify } = res.data;
      dispatch(updateUserData({ user, permissions, access_key, count_notify }));

      // NOTA(RECKER): Actualizar auth
      dispatch(updateAuth(true));

      // NOTA(RECKER): Global token
	    axios.defaults.headers.common['Authorization'] = `Bearer ${access_key}`;

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

export const reducersLogin = {
  [login.pending]: (state, action) => {
    state.login.loading = true;
  },
  [login.rejected]: (state, action) => {
    state.login.loading = false;
  },
  [login.fulfilled]: (state, action) => {
    state.login.loading = false;
  },
}