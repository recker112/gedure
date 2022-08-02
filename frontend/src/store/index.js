import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";
import requestStatus from "./slices/requestStatus";
import requestStatusWallet from "./slices/requestStatusWallet";
import tables from "./slices/tables";
import tablesWallet from "./slices/tablesWallet";

export default configureStore({
  reducer: {
    configs,
    auth,
    notistack,
    contacts,
    requestStatus,
    requestStatusWallet,
    tables,
    tablesWallet,
  },
});