import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tables";

export const deleteSoliContacto = createAsyncThunk(
  'requestUser/soliContacto/delete',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/contacto/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'soliContacto' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'La solicitud ya no existe';
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

export const reducersDeleteSoliContacto = {
  [deleteSoliContacto.pending]: (state, action) => {
    state.deleteSoliContacto.loading = true;
  },
  [deleteSoliContacto.rejected]: (state, action) => {
    state.deleteSoliContacto.loading = false;
  },
  [deleteSoliContacto.fulfilled]: (state, action) => {
    state.deleteSoliContacto.loading = false;
    state.deleteSoliContacto.data = {};
    state.deleteSoliContacto.open = false;
  },
}