import { createSlice } from "@reduxjs/toolkit";
import { reducersBoletas } from "./async_trunk/boletas_admin/getBoletasTable";
import { reducersBankAccounts } from "./async_trunk/configuracion/TableBankAccounts";
import { reducersBankTransactions } from "./async_trunk/configuracion/TableBankTransactions";
import { reducersCursos } from "./async_trunk/configuracion/TableCursos";
import { reducersUsersDisabled } from "./async_trunk/configuracion/TableUsersDisabled";
import { reducersPosts } from "./async_trunk/publicaciones/getPosts";
import { reducersRegistros } from "./async_trunk/registros/getRegistros";
import { reducersSoliContacto } from "./async_trunk/soli_contacto/getSoliContacto";
import { reducersUsers } from "./async_trunk/users/getUsers";

const initialState = {
  registros: {
    filterBox: false,
    filters: {
      type: 'all'
    },
    countFilters: 0,
    tableData: {
      loading: true,
      page: 1,
      data: [],
      pageSize: 5,
      search: "",
      totalRows: 0,
      pageCount: 0,
    },
  },
  users: {
    filterBox: false,
    filters: {
      type: '',
      curso: '',
      seccion: '',
    },
    countFilters: 0,
    tableData: {
      loading: true,
      page: 1,
      data: [],
      pageSize: 5,
      search: "",
      totalRows: 0,
      pageCount: 0,
    },
  },
  posts: {
    filterBox: false,
    filters: {
      type: '',
    },
    countFilters: 0,
    tableData: {
      loading: true,
      page: 1,
      data: [],
      pageSize: 5,
      search: "",
      totalRows: 0,
      pageCount: 0,
    },
  },
  boletas: {
    filterBox: false,
    filters: {
      curso: '',
      seccion: '',
    },
    countFilters: 0,
    tableData: {
      loading: true,
      page: 1,
      data: [],
      pageSize: 5,
      search: "",
      totalRows: 0,
      pageCount: 0,
    },
  },
  soliContacto: {
    filterBox: false,
    filters: {},
    countFilters: 0,
    tableData: {
      loading: true,
      page: 1,
      data: [],
      pageSize: 5,
      search: "",
      totalRows: 0,
      pageCount: 0,
    },
  },
  cursos: {
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
  },
  bankAccounts: {
    filterBox: false,
    filters: {
      type: '',
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
  },
  bankTransactions: {
    filterBox: false,
    filters: {
      type: '',
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
  },
  usersDisabled: {
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
  },
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
      state[select].tableData.page = 1;
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
    ...reducersRegistros,
    ...reducersUsers,
    ...reducersPosts,
    ...reducersBoletas,
    ...reducersSoliContacto,
    ...reducersCursos,
    ...reducersBankAccounts,
    ...reducersBankTransactions,
    ...reducersUsersDisabled,
  }
});

export default tablesSlices.reducer;

export const { setFilterBox, setFilters, setSearch, setConfigTable, resetTableConfig, setRegBox, refresh } = tablesSlices.actions;