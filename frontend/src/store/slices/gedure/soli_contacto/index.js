import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const getDataSCT = createAsyncThunk(
  'gdSCTable/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().gdSCTable.tableData;
    let url = `v1/contacto?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

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

export const deleteSCT = createAsyncThunk(
  'gdSCTable/delete',
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
      dispatch(refreshSCT());

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


const initialState = {
  filterBox: false,
  filters: {},
  countFilters: 0,
  tableData: {
    loading: true,
    page: 0,
    data: [],
    pageSize: 5,
    search: "",
    totalRows: 0,
    pageCount: 0,
  },
  seeBox: {
    open: false,
    data: {},
  },
  deleteSC: {
    open: false,
    loading: false,
    data: {},
  },
};

export const gdSCTableSlices = createSlice({
  name: "gdSCTable",
  initialState,
  reducers: {
    setFilterBox: (state, action) => {
      state.filterBox = action.payload;
    },
    setFilters: (state, action) => {
      let data = action.payload;
      let count = 0;
      let keys = Object.keys(data);

      // NOTA(RECKER): Contador de filtros activos
      keys.map(key => {
        if (data[key] !== initialState.filters[key]) {
          count++;
        }
        return null;
      })

      state.filters = data;
      state.countFilters = count;
      state.tableData.loading = true;
    },
    setSeeBoxSCT: (state, action) => {
      const { open, data } = action.payload;
      let formData = {...data};
      
      if (formData.telefono) {
        formData.telefono = `${formData.telefono}`;
        formData.telefono = `+${formData.telefono.slice(0,2)} (${formData.telefono.slice(2,5)}) ${formData.telefono.slice(5,8)}-${formData.telefono.slice(8)}`;
      }

      (open !== undefined) && (state.seeBox.open = open);
      Object.keys(formData).length && (state.seeBox.data = formData);
    },
    setConfirmConfgsSCT: (state, action) => {
      const { open, loading, data, confirm } = action.payload;

      (open !== undefined) && (state[confirm].open = open);
      loading && (state[confirm].loading = loading);
      Object.keys(data).length && (state[confirm].data = data);
    },
    setSearchSCT: (state, action) => {
      state.tableData.search = action.payload;
      state.tableData.loading = true;
    },
    setConfigTableSCT: (state, action) => {
      const { pageIndex, pageSize } = action.payload;

      state.tableData.page = pageIndex;
      state.tableData.pageSize = pageSize;
      state.tableData.loading = true;
    },
    resetTableConfigSCT: state => {
      state.tableData = initialState.tableData;
    },
    refreshSCT: state => {
      state.tableData.loading = true;
    }
  },
  extraReducers: {
    [getDataSCT.pending]: state => {
      state.tableData.loading = true;
    },
    [getDataSCT.rejected]: (state, action) => {
      state.tableData.loading = false;
    },
    [getDataSCT.fulfilled]: (state, action) => {
      const { page, totalRows, data } = action.payload;

      state.tableData.loading = false;
      state.tableData.page = page;
      state.tableData.data = data;
      state.tableData.totalRows = totalRows;
      state.tableData.pageCount = Math.ceil(totalRows / state.tableData.pageSize);
    },
    [deleteSCT.pending]: state => {
      state.deleteSC.loading = true;
    },
    [deleteSCT.rejected]: (state, action) => {
      state.deleteSC.loading = false;
    },
    [deleteSCT.fulfilled]: (state, action) => {
      state.deleteSC.loading = false;
      state.deleteSC.open = false;
    }
  }
});

export default gdSCTableSlices.reducer;

export const { setFilterBoxSCT, setFiltersSCT, setSearchSCT, setConfigTableSCT, resetTableConfigSCT, setSeeBoxSCT, refreshSCT, setConfirmConfgsSCT } = gdSCTableSlices.actions;