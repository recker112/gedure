import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateWallet } from "../../../auth";
import { updateNotistack } from "../../../notistack";
import { refresh } from "../../../tablesWallet";

export const paydebs = createAsyncThunk(
  'requestStatusWallet/deudas/pay',
  async ({ id }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/deuda/pay/${id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, {}, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'deudas' }));

      // Actualizar saldo
      dispatch(updateWallet(res.data.balance));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        if (status === 404) {
          data.msg = 'Deuda no encontrada';
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

export const reducersPaydebs = {
  [paydebs.pending]: (state, action) => {
    state.payDebts.loading = true;
  },
  [paydebs.rejected]: (state, action) => {
    state.payDebts.loading = false;
  },
  [paydebs.fulfilled]: (state, action) => {
    state.payDebts.loading = false;
    state.payDebts.data = {};
    state.payDebts.open = false;
  },
}