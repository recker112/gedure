import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUserSelected } from "..";
import { updateNotistack } from "../../../../notistack";

export const updateDataUPREN = createAsyncThunk(
  'gdUPREN/updateData',
  async ({ id }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/invitation/resend-email/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));

      // NOTA(RECKER): Update userSelected
      const { user, permissions } = res.data;
      dispatch(setUserSelected({user, permissions}));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'El usuario ya no existe';
        }

        // NOTA(RECKER): Respuesta del servidor
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

export const gdUPRENSlices = createSlice({
  name: "gdUPREN",
  initialState,
  reducers: {},
  extraReducers: {
    [updateDataUPREN.pending]: (state, action) => {
      state.loading = true;
    },
    [updateDataUPREN.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateDataUPREN.fulfilled]: (state, action) => {
      state.loading = false;
    },
  }
});

export default gdUPRENSlices.reducer;