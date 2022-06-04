import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const getDataBT = createAsyncThunk(
  'gdBTable/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { curso, seccion } = getState().gdBTable.filters;
    const { page, pageSize, search } = getState().gdBTable.tableData;
    let url = `v1/boleta?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}&curso=${curso}&seccion=${seccion}`;

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


const initialState = {
  filterBox: false,
  filters: {
    curso: '',
    seccion: '',
  },
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
};

export const gdBTableSlices = createSlice({
  name: "gdBTable",
  initialState,
  reducers: {
    setFilterBoxBT: (state, action) => {
      state.filterBox = action.payload;
    },
    setFiltersBT: (state, action) => {
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
    setSearchBT: (state, action) => {
      state.tableData.search = action.payload;
      state.tableData.loading = true;
    },
    setConfigTableBT: (state, action) => {
      const { pageIndex, pageSize } = action.payload;

      state.tableData.page = pageIndex;
      state.tableData.pageSize = pageSize;
      state.tableData.loading = true;
    },
    resetTableConfigBT: state => {
      state.tableData = initialState.tableData;
    },
    refreshBT: state => {
      state.tableData.loading = true;
    }
  },
  extraReducers: {
    [getDataBT.pending]: state => {
      state.tableData.loading = true;
    },
    [getDataBT.rejected]: (state, action) => {
      state.tableData.loading = false;
    },
    [getDataBT.fulfilled]: (state, action) => {
      const { page, totalRows, data } = action.payload;

      state.tableData.loading = false;
      state.tableData.page = page;
      state.tableData.data = data;
      state.tableData.totalRows = totalRows;
      state.tableData.pageCount = Math.ceil(totalRows / state.tableData.pageSize);
    }
  }
});

export default gdBTableSlices.reducer;

export const { setFilterBoxBT, setFiltersBT, setSearchBT, setConfigTableBT, resetTableConfigBT, setUserBoxBT, refreshBT } = gdBTableSlices.actions;