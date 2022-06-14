import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tables";

export const deleteMassiveBoletas = createAsyncThunk(
  'requestStatus/boletas/delete/massive',
  async ({ lapso, ids }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/massive/boleta?ids=${encodeURI(JSON.stringify(ids))}&lapso=${lapso}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      dispatch(refresh({ select: 'boletas' }));

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

export const reducersDeleteMassiveBoletas = {
  [deleteMassiveBoletas.pending]: state => {
    state.deleteMassiveBoletas.loading = true;
  },
  [deleteMassiveBoletas.rejected]: (state, action) => {
    state.deleteMassiveBoletas.loading = false;
  },
  [deleteMassiveBoletas.fulfilled]: (state, action) => {
    state.deleteMassiveBoletas.loading = false;
    state.deleteMassiveBoletas.data = {};
    state.deleteMassiveBoletas.open = false;
  }
}