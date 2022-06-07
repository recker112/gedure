import { createSlice } from "@reduxjs/toolkit";
import { reducersRegistros } from "./async_trunk/registros/getRegistros";

const initialState = {
  registros: {
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
    },
  }
};

export const tablesSlices = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setFilterBox: (state, action) => {
      const { open, select } = action.payload;
      state[select].filterBox = open;
    },
    setFilters: (state, action) => {
      const { data, select } = action.payload;
      let count = 0;
      let keys = Object.keys(data);

      // NOTA(RECKER): Contador de filtros activos
      keys.map(key => {
        if (data[key] !== initialState[select].filters[key]) {
          count++;
        }
        return null;
      })

      state[select].filters = data;
      state[select].countFilters = count;
      state[select].tableData.loading = true;
    },
    setSearch: (state, action) => {
      const { search, select } = action.payload;
      state[select].tableData.search = search;
      state[select].tableData.loading = true;
    },
    setConfigTable: (state, action) => {
      const { pageIndex, pageSize, select } = action.payload;

      state[select].tableData.page = pageIndex;
      state[select].tableData.pageSize = pageSize;
      state[select].tableData.loading = true;
    },
    resetTableConfig: (state, action) => {
      const { select } = action.payload;

      state[select].tableData = initialState[select].tableData;
    },
    refresh: (state, action) => {
      const { select } = action.payload;

      state[select].tableData.loading = true;
    }
  },
  extraReducers: {
    ...reducersRegistros
  }
});

export default tablesSlices.reducer;

export const { setFilterBox, setFilters, setSearch, setConfigTable, resetTableConfig, setRegBox, refresh } = tablesSlices.actions;