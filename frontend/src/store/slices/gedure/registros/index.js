import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateNotistack } from "../../notistack";

export const getData = createAsyncThunk(
  'gd_registros/getData',
  async (id, { getState, signal, dispatch }) => {
    // NOTA(RECKER): Configurar petición a realizar
    const axios = window.axios;
    const { type } = getState().gdRegistros.filters;
    const { page, pageSize, search } = getState().gdRegistros.tableData;
    let url = `v1/logs?page=${page}&per_page=${pageSize}&type=${type}&search=${encodeURI(search)}`;

    // NOTA(RECKER): Enviar estado de la petición al notistack
    try {
      const res = await axios.get(url, {
        signal, // NOTA(RECKER): Señal para cancelar petición
      });

      //dispatch(updateNotistack({ status: res.status, variant: 'success' }));

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
    type: 'all'
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
  }
};

export const registrosSlices = createSlice({
  name: "registros",
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
        } else {
          count -= count > 0 ? -1 : 0;
        }
        return null;
      })

      state.filters = action.payload;
      state.countFilters = count;
      state.tableData.loading = true;
    },
    setSearch: (state, action) => {
      state.tableData.search = action.payload;
      state.tableData.loading = true;
    },
    setConfigTable: (state, action) => {
      const { pageIndex, pageSize } = action.payload;

      state.tableData.page = pageIndex;
      state.tableData.pageSize = pageSize;
      state.tableData.loading = true;
    },
    resetTableConfig: state => {
      state.tableData = initialState.tableData;
    }
  },
  extraReducers: {
    [getData.pending]: state => {
      state.tableData.loading = true;
    },
    [getData.rejected]: (state, action) => {
      state.tableData.loading = false;
    },
    [getData.fulfilled]: (state, action) => {
      const { page, totalRows, data } = action.payload;

      state.tableData.loading = false;
      state.tableData.page = page;
      state.tableData.data = data;
      state.tableData.totalRows = totalRows;
      state.tableData.pageCount = Math.ceil(totalRows / state.tableData.pageSize);
    }
  }
});

export default registrosSlices.reducer;

export const { setFilterBox, setFilters, setSearch, setConfigTable, resetTableConfig } = registrosSlices.actions;