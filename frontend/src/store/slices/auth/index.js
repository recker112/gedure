import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../notistack";

export const relogin = createAsyncThunk(
  'auth/relogin',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/relogin';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
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

const initialState = {
  auth: false,
  relogin: true,
  access_key: '',
  user: {
		personal_data: {},
		wallet: {}
	},
	permissions: {
    sin_asignar: {},
    administrar: {},
    administrar_transac: {},
    gedure: {},
  }
};

export const AuthsSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateRelogin: (state, action) => {
      state.relogin = action.payload;
    },
    updateUserData: (state, action) => {
      const { user, permissions, access_key } = action.payload;
      state.user = user;
      state.permissions = permissions;
      state.access_key = access_key;
    },
    logoutApp: (state) => {
      state.auth = false;
      state.access_key = '';
      state.user = {};
      state.permissions = {};
      sessionStorage.removeItem('gd-access_key');
			localStorage.removeItem('gd-access_key');
    }
  },
  extraReducers: {
    [relogin.rejected]: state => {
      state.relogin = false;
      sessionStorage.removeItem('gd-access_key');
			localStorage.removeItem('gd-access_key');
    },
    [relogin.fulfilled]: (state, action) => {
      const { user, permissions, access_key } = action.payload;
      state.auth = true;
      state.relogin = false;
      state.access_key = access_key;
      state.user = user;
      state.permissions = permissions;
    }
  }
});

export default AuthsSlices.reducer;

export const { updateAuth, updateUserData, updateRelogin, logoutApp } = AuthsSlices.actions;