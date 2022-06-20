import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tablesWallet";

export const createLoteDebts = createAsyncThunk(
  'requestUserWallet/loteDebt/crear',
  async ({submitData, handleClose}, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = 'v1/deuda/lote';

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, text: res.data.msg, variant: 'success' }));

      if (!submitData.create_more) {
        handleClose();
      }

      dispatch(refresh({ select: 'lotes_deudas' }));

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

export const reducersCreateLoteDebts = {
  [createLoteDebts.pending]: (state, action) => {
    state.createLoteDeuda.loading = true;
  },
  [createLoteDebts.rejected]: (state, action) => {
    state.createLoteDeuda.loading = false;
  },
  [createLoteDebts.fulfilled]: (state, action) => {
    state.createLoteDeuda.loading = false;
    state.createLoteDeuda.dataUserSelected = [];
  },
}