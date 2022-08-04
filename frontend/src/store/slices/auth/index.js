import { createSlice } from "@reduxjs/toolkit";
import { getNotify } from "./getNotifys";
import { logout } from "./logout";
import { relogin } from "./relogin";

const initialState = {
  auth: false,
  relogin: true,
  notify: {
    count: 0,
    loading: true,
    finish: false,
    data: [],
  },
  access_key: '',
  user: {
    alumno: {
      curso: {}
    },
		personal_data: {},
		wallet: {}
	},
	permissions: {
    sin_asignar: {},
    administrar: {},
    administrar_transac: {},
    gedure: {},
  }
};

export const AuthsSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      state.auth = action.payload;
    },
    updateRelogin: (state, action) => {
      state.relogin = action.payload;
    },
    updateUserData: (state, action) => {
      const { user, permissions, access_key, count_notify } = action.payload;
      state.user = user;
      count_notify && (state.notify.count = count_notify);
      permissions && (state.permissions = {...initialState.permissions,...permissions});
      access_key && (state.access_key = access_key);
    },
    countNotify: (state, action) => {
      const count = action.payload;
      state.notify.count = count;
    },
    resetNotify: (state, action) => {
      state.notify = {...initialState.notify};
    },
    updateWallet: (state, action) => {
      const balance = action.payload;
      
      state.user.wallet.balance = balance;
    },
    logoutApp: () => {
      sessionStorage.removeItem('gd-access_key');
			localStorage.removeItem('gd-access_key');
      return {...initialState, relogin: false};
    }
  },
  extraReducers: {
    [relogin.rejected]: state => {
      state.relogin = false;
      sessionStorage.removeItem('gd-access_key');
			localStorage.removeItem('gd-access_key');
    },
    [relogin.fulfilled]: (state, action) => {
      const { user, permissions, access_key, count_notify } = action.payload;
      state.auth = true;
      state.relogin = false;
      state.access_key = access_key;
      state.user = user;
      state.permissions = {...initialState.permissions,...permissions};
      state.notify.count = count_notify;
    },
    [logout.rejected]: () => {
      sessionStorage.removeItem('gd-access_key');
			localStorage.removeItem('gd-access_key');
      return {...initialState, relogin: false};
    },
    [logout.fulfilled]: () => {
      sessionStorage.removeItem('gd-access_key');
			localStorage.removeItem('gd-access_key');
      return {...initialState, relogin: false};
    },
    [getNotify.fulfilled]: (state, action) => {
      const { data, finish } = action.payload;

      state.notify.loading = false;
      state.notify.data = [...state.notify.data, ...data];
      state.notify.finish = finish;
      state.notify.count = 0;
    },
    [getNotify.pending]: (state, action) => {
      const arg = action.meta.arg;
      
      state.notify.loading = arg?.type === 'more' ? false : true;
    },
    [getNotify.rejected]: (state, action) => {
      state.notify.loading = false;
      state.notify.data = [];
    },
  }
});

export default AuthsSlices.reducer;

export const { updateAuth, updateUserData, updateRelogin, logoutApp, countNotify, updateWallet, resetNotify } = AuthsSlices.actions;