import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const getData = createAsyncThunk(
  'gdUSelected/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/user/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));

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
  loading: true,
  userSelected: {
    alumno: {},
    personal_data: {},
  },
  permissions: {
    sin_asignar: {},
    administrar: {},
    administrar_transac: {},
    gedure: {},
  }
};

export const gdUSelectedSlices = createSlice({
  name: "gdUSelected",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.loading = true;
      state.userSelected = {...initialState.userSelected};
    }
  },
  extraReducers: {
    [getData.pending]: state => {
      state.loading = true;
    },
    [getData.rejected]: (state, action) => {
      state.loading = false;
    },
    [getData.fulfilled]: (state, action) => {
      const { user, permissions } = action.payload;

      state.loading = false;
      state.userSelected = user;
      state.permissions = permissions;
    },
  }
});

export default gdUSelectedSlices.reducer;

export const { reset } = gdUSelectedSlices.actions;