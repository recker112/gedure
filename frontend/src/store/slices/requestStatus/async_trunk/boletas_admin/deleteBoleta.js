import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";

export const deleteBoleta = createAsyncThunk(
  'requestStatus/boletas/delete',
  async ({ submitData, refresh }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/boleta/${submitData.id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      refresh();

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'La boleta ya no existe';
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

export const reducersDeleteBoleta = {
  [deleteBoleta.pending]: state => {
    state.deleteBoleta.loading = true;
  },
  [deleteBoleta.rejected]: (state, action) => {
    state.deleteBoleta.loading = false;
  },
  [deleteBoleta.fulfilled]: (state, action) => {
    state.deleteBoleta.loading = false;
    state.deleteBoleta.data = {};
    state.deleteBoleta.open = false;
  }
}