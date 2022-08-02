import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tablesWallet";

export const editLoteDebts = createAsyncThunk(
  'requestUserWallet/loteDebt/editar',
  async ({submitData, id}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/deuda/lote/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));
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

export const reducersEditLoteDebts = {
  [editLoteDebts.pending]: (state, action) => {
    state.editLoteDeuda.loading = true;
  },
  [editLoteDebts.rejected]: (state, action) => {
    state.editLoteDeuda.loading = false;
  },
  [editLoteDebts.fulfilled]: (state, action) => {
    state.editLoteDeuda.loading = false;
    state.editLoteDeuda.open = false;
    state.editLoteDeuda.dataSelected = [];
  },
}