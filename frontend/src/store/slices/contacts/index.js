import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../notistack";

export const contactsData = createAsyncThunk(
  'contacts/preview',
  async (data, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/contacto';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, data, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: 'Mensaje enviado' }));

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

export const contactsSlices = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: {
    [contactsData.pending]: state => {
      state.loading = true;
    },
    [contactsData.rejected]: state => {
      state.loading = false;
    },
    [contactsData.fulfilled]: (state) => {
      state.loading = false;
    }
  }
});

export default contactsSlices.reducer;

//export const {  } = contactsSlices.actions;