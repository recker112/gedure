import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tablesWallet";

export const destroyLoteDebts = createAsyncThunk(
  'requestStatusWallet/loteDebt/destroy',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/deuda/lote/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.delete(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'lotes_deudas' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'El lote de deuda ya no existe';
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

export const reducersDestroyLoteDebts = {
  [destroyLoteDebts.pending]: (state, action) => {
    state.deleteLoteDeuda.loading = true;
  },
  [destroyLoteDebts.rejected]: (state, action) => {
    state.deleteLoteDeuda.loading = false;
  },
  [destroyLoteDebts.fulfilled]: (state, action) => {
    state.deleteLoteDeuda.loading = false;
    state.deleteLoteDeuda.data = {};
    state.deleteLoteDeuda.open = false;
  },
}