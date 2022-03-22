import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateAuth, updateUserData } from "../auth";
import { updateNotistack } from "../notistack";

export const loginData = createAsyncThunk(
  'login/auth',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/login';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, data, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));

      // NOTA(RECKER): Guardar access_key
			if (data.checkbox) {
				localStorage.setItem('access_key', JSON.stringify(res.data.access_key));
				sessionStorage.setItem('access_key', JSON.stringify(res.data.access_key));
			} else {
				sessionStorage.setItem('access_key', JSON.stringify(res.data.access_key));
			}

      // NOTA(RECKER): Guardar datos de usuario
      dispatch(updateUserData({ user: res.data.user, permissions: res.data.permissions }));

      // NOTA(RECKER): Actualizar auth
      dispatch(updateAuth(true));

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

const initialState = {
  loading: false,
};

export const LoginSlices = createSlice({
  name: "login",
  initialState,
  extraReducers: {
    [loginData.pending]: state => {
      state.loading = true;
    },
    [loginData.rejected]: state => {
      state.loading = false;
    },
    [loginData.fulfilled]: (state) => {
      state.loading = false;
    }
  }
});

export default LoginSlices.reducer;

//export const {  } = LoginSlices.actions;