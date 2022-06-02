import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const getDataPT = createAsyncThunk(
  'gdPTable/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { page, pageSize, search } = getState().gdPTable.tableData;
    let url = `v1/table-posts?page=${page}&per_page=${pageSize}&search=${encodeURI(search)}`;

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
};

export const gdPTableSlices = createSlice({
  name: "gdPTable",
  initialState,
  reducers: {
    setFilterBoxPT: (state, action) => {
      state.filterBox = action.payload;
    },
    setFiltersPT: (state, action) => {
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
    setSearchPT: (state, action) => {
      state.tableData.search = action.payload;
      state.tableData.loading = true;
    },
    setConfigTablePT: (state, action) => {
      const { pageIndex, pageSize } = action.payload;

      state.tableData.page = pageIndex;
      state.tableData.pageSize = pageSize;
      state.tableData.loading = true;
    },
    resetTableConfigPT: state => {
      state.tableData = initialState.tableData;
    },
    refreshPT: state => {
      state.tableData.loading = true;
    }
  },
  extraReducers: {
    [getDataPT.pending]: state => {
      state.tableData.loading = true;
    },
    [getDataPT.rejected]: (state, action) => {
      state.tableData.loading = false;
    },
    [getDataPT.fulfilled]: (state, action) => {
      const { page, totalRows, data } = action.payload;

      state.tableData.loading = false;
      state.tableData.page = page;
      state.tableData.data = data;
      state.tableData.totalRows = totalRows;
      state.tableData.pageCount = Math.ceil(totalRows / state.tableData.pageSize);
    }
  }
});

export default gdPTableSlices.reducer;

export const { setFilterBoxPT, setFiltersPT, setSearchPT, setConfigTablePT, resetTableConfigPT, setUserBoxPT, refreshPT } = gdPTableSlices.actions;