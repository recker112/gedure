import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../../../notistack";
import { refresh } from "../../../../tables";

export const editBankAccount = createAsyncThunk(
  'requestStatus/createBankAccount',
  async ({ submitData, setError }, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    let url = `v1/bank-account/${submitData.id}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.post(url, submitData, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      dispatch(updateNotistack({ status: res.status, variant: 'success', text: res.data.msg }));
      // NOTA(RECKER): Recargar datos de la tabla
      dispatch(refresh({ select: 'bankAccounts' }));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTA(RECKER): No hacer nada al cancelar el AJAX
      } else if (error.response) {
        let { data, status } = error.response;

        // NOTA(RECKER): Setear errores en inputs
        if (status === 422 && Boolean(data.errors)) {
          for (let key in data.errors) {
						setError && setError(key, {
							type: 'fetchRequest',
							message: 'Error: '+data.errors[key][0],
						});
					}
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

export const reducersEditBankAccount = {
  [editBankAccount.pending]: (state, action) => {
    state.editBankAccount.loading = true;
  },
  [editBankAccount.rejected]: (state, action) => {
    state.editBankAccount.loading = false;
  },
  [editBankAccount.fulfilled]: (state, action) => {
    state.editBankAccount.loading = false;
    state.editBankAccount.open = false;
  },
}