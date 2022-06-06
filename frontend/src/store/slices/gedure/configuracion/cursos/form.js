import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refreshCCT } from "./table";

export const createCursoConfigForm = createAsyncThunk(
  'gdConfigCForm/upload',
  async (submitData, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/curso';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refreshCCT());

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
  createCurso: {
    loading: false,
  }
};

export const gdConfigCFormSlice = createSlice({
  name: "gdConfigCForm",
  initialState,
  reducers: {},
  extraReducers: {
    [createCursoConfigForm.pending]: state => {
      state.createCurso.loading = true;
    },
    [createCursoConfigForm.rejected]: (state, action) => {
      state.createCurso.loading = false;
    },
    [createCursoConfigForm.fulfilled]: (state, action) => {
      state.createCurso.loading = false;
    },
  }
});

export default gdConfigCFormSlice.reducer;